import prisma from '@/lib/prisma';
import { formatIDR } from '@/lib/format';
import BillsTable from '@/components/billing/BillsTable';
import BillFilters from '@/components/billing/BillFilters';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';

export default async function BillsPage({
    searchParams,
}: {
    searchParams?: { q?: string; status?: string; page?: string };
}) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) redirect('/login');

    const q = (searchParams?.q ?? '').trim();
    const status = (searchParams?.status ?? 'all') as 'all' | 'unpaid' | 'paid' | 'overdue';
    const page = Math.max(1, Number(searchParams?.page ?? 1));
    const perPage = 8;

    const where: Prisma.BillWhereInput = {
        studentId: session.user.id,
        ...(q
            ? {
                  OR: [
                      { id: { contains: q, mode: 'insensitive' } },
                      { name: { contains: q, mode: 'insensitive' } },
                  ],
              }
            : {}),
        ...(status === 'all'
            ? {}
            : {
                  status: status === 'unpaid' ? 'UNPAID' : status === 'paid' ? 'PAID' : 'OVERDUE',
              }),
    } as const;

    const [total, rows] = await Promise.all([
        prisma.bill.count({ where }),
        prisma.bill.findMany({
            where,
            orderBy: [{ dueDate: 'asc' }],
            take: perPage,
            skip: (page - 1) * perPage,
            select: { id: true, name: true, dueDate: true, amount: true, status: true },
        }),
    ]);

    const tunggakan = rows.filter((r) => r.status !== 'PAID').reduce((a, b) => a + b.amount, 0);

    return (
        <div className="space-y-6">
            <header className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text">Tagihan</h1>
                    <p className="text-sm text-text/60">
                        Kelola dan bayar tagihan kuliah/administrasi. Total item: {total}.
                    </p>
                </div>
                <div className="rounded-lg bg-secondary/10 px-3 py-2 text-sm text-secondary font-medium">
                    Est. Tunggakan: {formatIDR(tunggakan)}
                </div>
            </header>

            <BillFilters current={{ q, status }} />
            <BillsTable
                data={rows.map((r) => ({
                    id: r.id,
                    name: r.name,
                    dueDate: r.dueDate.toISOString(),
                    amount: r.amount,
                    status:
                        r.status === 'PAID'
                            ? 'paid'
                            : r.status === 'OVERDUE'
                            ? 'overdue'
                            : 'unpaid',
                }))}
                total={total}
                page={page}
                perPage={perPage}
            />
        </div>
    );
}
