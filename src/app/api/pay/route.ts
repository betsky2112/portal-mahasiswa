import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { env, assertEnv } from '@/lib/env';

export async function POST(req: Request) {
    try {
        assertEnv();
        const session = await getServerSession(authOptions);
        if (!session?.user?.id)
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { billId } = (await req.json()) as { billId?: string };
        if (!billId) return NextResponse.json({ error: 'billId required' }, { status: 400 });

        const bill = await prisma.bill.findFirst({
            where: { id: billId, studentId: session.user.id },
        });
        if (!bill) return NextResponse.json({ error: 'Bill not found' }, { status: 404 });
        if (bill.status === 'PAID')
            return NextResponse.json({ error: 'Bill already paid' }, { status: 400 });

        const orderId = `INV-${bill.id}-${Date.now()}`;

        const payload = {
            transaction_details: {
                order_id: orderId,
                gross_amount: bill.amount,
            },
            item_details: [{ id: bill.id, price: bill.amount, quantity: 1, name: bill.name }],
            callbacks: {
                finish: `${env.APP_URL}/dashboard/tagihan/${bill.id}`,
            },
            customer_details: {
                // Optional: isi dari profil user kamu
                first_name: session.user.name ?? 'Mahasiswa',
                email: session.user.email,
            },
            credit_card: { secure: true },
        };

        const res = await fetch(`${env.MIDTRANS_BASE_URL}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization:
                    'Basic ' + Buffer.from(env.MIDTRANS_SERVER_KEY + ':').toString('base64'),
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const e = await res.text();
            console.error('Midtrans error:', e);
            return NextResponse.json({ error: 'Gateway error' }, { status: 502 });
        }

        const data = (await res.json()) as { token: string; redirect_url: string };

        await prisma.payment.create({
            data: {
                billId: bill.id,
                orderId,
                amount: bill.amount,
                status: 'PENDING',
                raw: data,
            },
        });

        return NextResponse.json({ redirect_url: data.redirect_url, order_id: orderId });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
    }
}
