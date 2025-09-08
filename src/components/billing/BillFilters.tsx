'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function BillFilters({
    current,
}: {
    current: { q: string; status: 'all' | 'unpaid' | 'paid' | 'overdue' };
}) {
    const router = useRouter();
    const params = useSearchParams();

    const [q, setQ] = useState(current.q);
    const [status, setStatus] = useState(current.status);

    useEffect(() => setQ(current.q), [current.q]);
    useEffect(() => setStatus(current.status), [current.status]);

    const apply = (next?: Partial<{ q: string; status: string; page: number }>) => {
        const p = new URLSearchParams(params.toString());
        if (next?.q !== undefined) p.set('q', next.q);
        if (next?.status !== undefined) p.set('status', next.status);
        p.set('page', String(1));
        router.push(`?${p.toString()}`);
    };

    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Cari tagihan (ID / nama)..."
                    className="w-64 rounded-lg border border-gray-200 bg-bg px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <button
                    onClick={() => apply({ q })}
                    className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:brightness-95"
                >
                    Cari
                </button>
                <button
                    onClick={() => {
                        setQ('');
                        setStatus('all');
                        apply({ q: '', status: 'all' });
                    }}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-text hover:bg-primary/10 hover:text-primary"
                >
                    Reset
                </button>
            </div>

            <div className="flex items-center gap-1">
                {(
                    [
                        { key: 'all', label: 'Semua' },
                        { key: 'unpaid', label: 'Belum Lunas' },
                        { key: 'overdue', label: 'Terlambat' },
                        { key: 'paid', label: 'Lunas' },
                    ] as const
                ).map((opt) => (
                    <button
                        key={opt.key}
                        onClick={() => {
                            setStatus(opt.key);
                            apply({ status: opt.key });
                        }}
                        className={clsx(
                            'rounded-full px-3 py-1.5 text-sm',
                            status === opt.key
                                ? 'bg-secondary text-white'
                                : 'bg-secondary/10 text-secondary hover:bg-secondary/20',
                        )}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
