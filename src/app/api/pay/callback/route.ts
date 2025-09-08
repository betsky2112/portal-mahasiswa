import { NextResponse } from 'next/server';
import { env, assertEnv } from '@/lib/env';
import { sha512 } from '@/lib/crypto';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        assertEnv();
        const body = await req.json();

        const order_id = String(body.order_id ?? '');
        const status_code = String(body.status_code ?? '');
        const gross_amount = String(body.gross_amount ?? '');
        const signature_key = String(body.signature_key ?? '');
        const trxStatus = String(body.transaction_status ?? '');

        const expected = sha512(order_id + status_code + gross_amount + env.MIDTRANS_SERVER_KEY);
        if (expected !== signature_key) {
            console.warn('Invalid signature:', { order_id });
            return NextResponse.json({ ok: false }, { status: 401 });
        }

        const payment = await prisma.payment.findUnique({ where: { orderId: order_id } });
        if (!payment) {
            console.warn('Payment not found for order:', order_id);
            return NextResponse.json({ ok: false }, { status: 404 });
        }

        const isPaid = trxStatus === 'settlement' || trxStatus === 'capture';
        const isExpired = trxStatus === 'expire';
        const isCancelled = trxStatus === 'cancel';
        const isFailed = trxStatus === 'deny';

        const newPayStatus = isPaid
            ? 'PAID'
            : isExpired
            ? 'EXPIRED'
            : isCancelled
            ? 'CANCELLED'
            : isFailed
            ? 'FAILED'
            : 'PENDING';

        await prisma.payment.update({
            where: { orderId: order_id },
            data: { status: newPayStatus, raw: body },
        });

        if (isPaid) {
            await prisma.bill.update({
                where: { id: payment.billId },
                data: { status: 'PAID' },
            });
        } else if (isExpired || isCancelled) {
            await prisma.bill.update({
                where: { id: payment.billId },
                data: { status: 'OVERDUE' },
            });
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
