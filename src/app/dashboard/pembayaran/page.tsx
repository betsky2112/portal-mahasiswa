import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { formatIDR } from '@/lib/format';

export default async function PaymentHistoryPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) redirect('/login');

    const rows = await prisma.payment.findMany({
        where: { bill: { studentId: session.user.id } },
        orderBy: [{ createdAt: 'desc' }],
        select: {
            orderId: true,
            amount: true,
            status: true,
            createdAt: true,
            bill: { select: { id: true, name: true } },
        },
        take: 50,
    });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text">Riwayat Pembayaran</h1>
            <section className="rounded-2xl border border-gray-200 bg-white overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-bg text-text/70">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Tanggal</th>
                            <th className="px-4 py-3 text-left font-medium">Order</th>
                            <th className="px-4 py-3 text-left font-medium">Tagihan</th>
                            <th className="px-4 py-3 text-left font-medium">Jumlah</th>
                            <th className="px-4 py-3 text-left font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-text/60">
                                    Belum ada pembayaran.
                                </td>
                            </tr>
                        ) : (
                            rows.map((p) => (
                                <tr key={p.orderId}>
                                    <td className="px-4 py-3">
                                        {new Intl.DateTimeFormat('id-ID', {
                                            dateStyle: 'medium',
                                            timeStyle: 'short',
                                        }).format(p.createdAt)}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-text">{p.orderId}</td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-text">{p.bill.name}</div>
                                        <div className="text-xs text-text/60">{p.bill.id}</div>
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-text">
                                        {formatIDR(p.amount)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={
                                                p.status === 'PAID'
                                                    ? 'rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary'
                                                    : p.status === 'PENDING'
                                                    ? 'rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary'
                                                    : 'rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent'
                                            }
                                        >
                                            {p.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
