import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import AnnouncementBar from '@/components/layout/AnnouncementBar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) redirect('/login');

    const [pendingTasks, unpaidBills] = await Promise.all([
        getPendingTasksCount(),
        getUnpaidBillsCount(),
    ]);

    return (
        <div className="flex h-screen bg-bg text-text">
            <Sidebar pendingTasks={pendingTasks} unpaidBills={unpaidBills} />
            <div className="flex-1 flex flex-col">
                <AnnouncementBar />
                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-7xl p-6">
                        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

async function getPendingTasksCount() {
    return 2;
}
async function getUnpaidBillsCount() {
    return 1;
}
