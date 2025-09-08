import HeroCards from '@/components/dashboard/HeroCards';
import ScheduleToday from '@/components/dashboard/ScheduleToday';

export default async function DashboardHome() {
    const summary = await getAcademicSummary();
    const bills = await getActiveBills();
    const schedule = await getTodaySchedule();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-text">Dashboard</h1>
            <HeroCards
                gpa={summary.gpa}
                ipSemester={summary.ipSemester}
                sksTaken={summary.sksTaken}
                sksMax={summary.sksMax}
                billsTotal={bills.total}
                billsCount={bills.count}
            />
            <ScheduleToday items={schedule} />
        </div>
    );
}

async function getAcademicSummary() {
    return { gpa: 3.47, ipSemester: 3.52, sksTaken: 88, sksMax: 144 };
}
async function getActiveBills() {
    return { total: 2150000, count: 2 };
}
async function getTodaySchedule() {
    return [
        {
            id: 'MK001',
            name: 'Struktur Data',
            time: '08:00–09:40',
            room: 'D201',
            lecturer: 'D. Siregar, M.Kom',
        },
        {
            id: 'MK147',
            name: 'Basis Data Lanjut',
            time: '10:00–11:40',
            room: 'Lab DB-2',
            lecturer: 'R. Hutabarat, S.Kom',
        },
    ];
}
