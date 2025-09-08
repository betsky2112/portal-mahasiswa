import NavLink from './NavLink';
import LogoutButton from '@/components/auth/LogoutButton';

export default function Sidebar({
    pendingTasks = 0,
    unpaidBills = 0,
}: {
    pendingTasks?: number;
    unpaidBills?: number;
}) {
    return (
        <aside className="relative z-10 w-72 shrink-0 border-r border-gray-200 bg-bg text-text">
            <div className="px-5 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-primary">Portal Mahasiswa</h2>
                {/* <p className="text-xs text-gray-500">Fresh & Modern</p> */}
            </div>

            <nav className="p-3 space-y-1">
                <NavLink href="/dashboard">Profil</NavLink>
                <NavLink href="/dashboard/jadwal">Jadwal Kuliah</NavLink>
                <NavLink href="/dashboard/nilai">Daftar Nilai</NavLink>
                <NavLink href="/dashboard/registrasi">Registrasi Mata Kuliah</NavLink>
                <NavLink href="/dashboard/kalender">Kalender Akademik</NavLink>
                <NavLink href="/dashboard/tugas" badge={pendingTasks}>
                    Tugas
                </NavLink>
                <NavLink href="/dashboard/tagihan" badge={unpaidBills}>
                    Tagihan
                </NavLink>
            </nav>

            <div className="mt-auto p-4 border-t border-gray-200">
                <LogoutButton />
            </div>
        </aside>
    );
}
