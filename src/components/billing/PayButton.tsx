'use client';

import { useState } from 'react';

export default function PayButton({ billId }: { billId: string }) {
    const [loading, setLoading] = useState(false);

    const pay = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ billId }),
            });
            const data = await res.json();
            if (!res.ok || !data?.redirect_url) {
                alert(data?.error || 'Gagal membuat transaksi.');
                return;
            }
            window.location.href = data.redirect_url;
        } catch (e) {
            console.error(e);
            alert('Gagal memproses pembayaran.');
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
