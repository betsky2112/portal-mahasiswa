'use client';

import { useState } from 'react';
import { formatIDR } from '@/lib/format';

export default function PayButton({ billId, amount }: { billId: string; amount: number }) {
    const [loading, setLoading] = useState(false);

    const pay = async () => {
        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 900));
            alert(
                `Invoice ${billId} siap dibayar: ${formatIDR(
                    amount,
                )}.\n(Integrasikan ke gateway pembayaran di langkah berikutnya)`,
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={pay}
            disabled={loading}
            className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:brightness-95 disabled:opacity-60"
        >
            {loading ? 'Memproses...' : 'Bayar'}
        </button>
    );
}
