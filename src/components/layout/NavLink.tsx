'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import clsx from 'clsx';

export default function NavLink({
    href,
    children,
    badge,
}: {
    href: string;
    children: ReactNode;
    badge?: number;
}) {
    const pathName = usePathname();
    const active = pathName === href || pathName.startsWith(href + '/');

    return (
        <Link
            href={href}
            className={clsx(
                'group relative flex items-center justify-between rounded-lg px-4 py-2 text-sm transition font-medium',
                active
                    ? 'bg-primary text-white'
                    : 'text-text hover:bg-primary/10 hover:text-primary',
            )}
        >
            <span>{children}</span>

            {typeof badge === 'number' && badge > 0 && (
                <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-secondary px-2 text-[11px] font-semibold text-white">
                    {badge}
                </span>
            )}
        </Link>
    );
}
