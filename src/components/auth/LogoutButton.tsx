'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full rounded-xl bg-neutral-900 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800 transition shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
        >
            Logout
        </button>
    );
}
