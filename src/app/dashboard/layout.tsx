// app/dashboard/layout.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) redirect('/login');

    const [pendingTasks, unpaidBills] = await Promise.all([
        getPendingTasksCount(session.user.id),
        getUnpaidBillsCount(session.user.id),
    ]);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar pendingTasks={pendingTasks} unpaidBills={unpaidBills} />

            <div className="flex-1 flex flex-col">
                <div className="bg-yellow-50 border-b border-yellow-200 p-3 text-sm text-yellow-800">
                    Periode KRS dibuka s/d 20 Sep 2025. Pastikan tidak ada bentrok jadwal.
                </div>

                <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}

async function getPendingTasksCount(_userId: string) {
    return 2;
}
async function getUnpaidBillsCount(_userId: string) {
    return 1;
}
