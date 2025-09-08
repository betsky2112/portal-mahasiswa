import BillsTable from '@/components/billing/BillsTable';
import BillFilters from '@/components/billing/BillFilters';
import { formatIDR } from '@/lib/format';

export default async function BillsPage({
    searchParams,
}: {
    searchParams?: { q?: string; status?: string; page?: string };
}) {
    const q = (searchParams?.q ?? '').trim();
    const status = (searchParams?.status ?? 'all') as 'all' | 'unpaid' | 'paid' | 'overdue';
    const page = Number(searchParams?.page ?? 1);

    const { rows, total, perPage } = await getBills({ q, status, page });

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
                    Est. Tunggakan:{' '}
                    {formatIDR(
                        rows.filter((r) => r.status !== 'paid').reduce((a, b) => a + b.amount, 0),
                    )}
                </div>
            </header>

            <BillFilters current={{ q, status }} />

            <BillsTable data={rows} total={total} page={page} perPage={perPage} />
        </div>
    );
}

async function getBills({
    q,
    status,
    page,
}: {
    q: string;
    status: 'all' | 'unpaid' | 'paid' | 'overdue';
    page: number;
}) {
    const perPage = 8;
    const ALL = [
        {
            id: 'INV-2025-001',
            name: 'SPP Ganjil 2025',
            dueDate: '2025-09-25',
            amount: 1500000,
            status: 'unpaid' as const,
        },
        {
            id: 'INV-2025-002',
            name: 'Laboratorium',
            dueDate: '2025-09-18',
            amount: 350000,
            status: 'overdue' as const,
        },
        {
            id: 'INV-2025-003',
            name: 'Perpustakaan',
            dueDate: '2025-10-10',
            amount: 300000,
            status: 'unpaid' as const,
        },
        {
            id: 'INV-2025-004',
            name: 'Almamater',
            dueDate: '2025-08-10',
            amount: 0,
            status: 'paid' as const,
        },
    ];
    let rows = ALL.filter(
        (r) =>
            (q
                ? r.id.toLowerCase().includes(q.toLowerCase()) ||
                  r.name.toLowerCase().includes(q.toLowerCase())
                : true) && (status === 'all' ? true : r.status === status),
    );
    const total = rows.length;
    rows = rows.slice((page - 1) * perPage, page * perPage);
    return { rows, total, perPage };
}
