import NavLink from './NavLink';

export default function Sidebar({
    pendingTasks = 0,
    unpaidBills = 0,
}: {
    pendingTasks?: number;
    unpaidBills?: number;
}) {
    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Portal Mahasiswa</h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
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
        </aside>
    );
}
