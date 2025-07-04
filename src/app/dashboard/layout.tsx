import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from '@/components/auth/LogoutButton';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Portal Mahasiswa</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
                        Profil
                    </Link>
                    <Link
                        href="/dashboard/jadwal"
                        className="block px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Jadwal Kuliah
                    </Link>
                    <Link
                        href="/dashboard/nilai"
                        className="block px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Daftar Nilai
                    </Link>
                    <Link
                        href="/dashboard/registrasi"
                        className="block px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Registrasi Mata Kuliah
                    </Link>
                    <Link
                        href="/dashboard/kalender"
                        className="block px-4 py-2 rounded hover:bg-gray-700"
                    >
                        Kalender Akademik
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <LogoutButton />
                </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
    );
}
