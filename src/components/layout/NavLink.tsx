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
                'group flex items center justify-between px-4 py-2 rounded transition',
                active ? 'bg-gray-700 text-white' : 'text-gray-200 hover:bg-grey-700',
            )}
        >
            <span className="truncate">{children}</span>
            {typeof badge === 'number' && badge > 0 && (
                <span className="ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gray-600 px-2 text-xs">
                    {badge}
                </span>
            )}
        </Link>
    );
}
