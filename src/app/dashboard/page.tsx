// app/dashboard/page.tsx

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/auth/LogoutButton';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="p-10 bg-white rounded-lg shadow-xl text-center">
                <h1 className="text-3xl font-bold text-gray-800">Selamat Datang di Dashboard!</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Anda login sebagai:{' '}
                    <span className="font-semibold">
                        {session.user?.name || session.user?.email}
                    </span>
                </p>
                <div className="mt-6">
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}
