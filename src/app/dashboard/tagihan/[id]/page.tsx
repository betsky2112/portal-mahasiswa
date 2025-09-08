import PayButton from '@/components/billing/PayButton';
import { formatIDR } from '@/lib/format';

export default async function BillDetail({ params }: { params: { id: string } }) {
    const bill = await getBill(params.id);
    if (!bill) return <div className="text-text/60">Tagihan tidak ditemukan.</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text">Detail Tagihan</h1>
            <section className="rounded-2xl border border-gray-200 bg-white p-4">
                <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Item label="ID">{bill.id}</Item>
                    <Item label="Nama">{bill.name}</Item>
                    <Item label="Jatuh Tempo">
                        {new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(
                            new Date(bill.dueDate),
                        )}
                    </Item>
                    <Item label="Jumlah">{formatIDR(bill.amount)}</Item>
                    <Item label="Status">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {bill.status === 'paid'
                                ? 'Lunas'
                                : bill.status === 'overdue'
                                ? 'Terlambat'
                                : 'Belum Lunas'}
                        </span>
                    </Item>
                </dl>
                {bill.status !== 'paid' && (
                    <div className="mt-6">
                        <PayButton billId={bill.id} amount={bill.amount} />
                    </div>
                )}
            </section>
        </div>
    );
}

function Item({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <div className="text-xs uppercase tracking-wide text-text/60">{label}</div>
            <div className="text-base font-medium text-text">{children}</div>
        </div>
    );
}

type BillStatus = 'paid' | 'unpaid' | 'overdue';

async function getBill(id: string) {
    const seed = [
        {
            id: 'INV-2025-001',
            name: 'SPP Ganjil 2025',
            dueDate: '2025-09-25',
            amount: 1500000,
            status: 'unpaid' as BillStatus,
        },
        {
            id: 'INV-2025-004',
            name: 'Almamater',
            dueDate: '2025-08-10',
            amount: 0,
            status: 'paid' as BillStatus,
        },
    ];
    return seed.find((b) => b.id === id) ?? null;
}
