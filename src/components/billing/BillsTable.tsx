import PayButton from './PayButton';
import { formatIDR } from '@/lib/format';
import Link from 'next/link';

type Bill = {
    id: string;
    name: string;
    dueDate: string;
    amount: number;
    status: 'unpaid' | 'paid' | 'overdue';
};

export default function BillsTable({
    data,
    total,
    page,
    perPage,
}: {
    data: Bill[];
    total: number;
    page: number;
    perPage: number;
}) {
    const totalPages = Math.max(1, Math.ceil(total / perPage));

    return (
        <section className="rounded-2xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-bg text-text/70">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Tagihan</th>
                            <th className="px-4 py-3 text-left font-medium">Jatuh Tempo</th>
                            <th className="px-4 py-3 text-left font-medium">Jumlah</th>
                            <th className="px-4 py-3 text-left font-medium">Status</th>
                            <th className="px-4 py-3 text-right font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-text/60">
                                    Tidak ada data tagihan untuk filter saat ini.
                                </td>
                            </tr>
                        ) : (
                            data.map((b) => (
                                <tr key={b.id} className="hover:bg-bg">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-text">{b.name}</div>
                                        <div className="text-xs text-text/60">{b.id}</div>
                                    </td>
                                    <td className="px-4 py-3 text-text/80">
                                        {new Intl.DateTimeFormat('id-ID', {
                                            dateStyle: 'medium',
                                        }).format(new Date(b.dueDate))}
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-text">
                                        {formatIDR(b.amount)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <StatusChip status={b.status} />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        {b.status === 'paid' ? (
                                            <Link
                                                href={`/dashboard/tagihan/${b.id}`}
                                                className="rounded-lg px-3 py-1.5 text-sm text-primary hover:bg-primary/10"
                                            >
                                                Detail
                                            </Link>
                                        ) : (
                                            <PayButton billId={b.id} />
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm">
                <div className="text-text/60">
                    Halaman <span className="font-medium text-text">{page}</span> dari{' '}
                    <span className="font-medium text-text">{totalPages}</span>
                </div>
                <div className="flex items-center gap-2">
                    <PageLink page={page - 1} disabled={page <= 1}>
                        Sebelumnya
                    </PageLink>
                    <PageLink page={page + 1} disabled={page >= totalPages}>
                        Berikutnya
                    </PageLink>
                </div>
            </div>
        </section>
    );
}

function StatusChip({ status }: { status: Bill['status'] }) {
    if (status === 'paid')
        return (
            <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                Lunas
            </span>
        );
    if (status === 'overdue')
        return (
            <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                Terlambat
            </span>
        );
    return (
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            Belum Lunas
        </span>
    );
}

function PageLink({
    page,
    disabled,
    children,
}: {
    page: number;
    disabled?: boolean;
    children: React.ReactNode;
}) {
    const p = new URLSearchParams();
    p.set('page', String(Math.max(1, page)));
    const href = `?${p.toString()}`;

    if (disabled) {
        return (
            <span className="cursor-not-allowed rounded-lg bg-gray-100 px-3 py-1.5 text-text/40">
                {children}
            </span>
        );
    }

    return (
        <Link
            href={href}
            className="rounded-lg bg-primary px-3 py-1.5 text-white hover:brightness-95"
        >
            {children}
        </Link>
    );
}
