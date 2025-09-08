import EmptyState from '@/components/ui/EmptyState';

export default function ScheduleToday({
    items,
}: {
    items: Array<{ id: string; name: string; time: string; room: string; lecturer: string }>;
}) {
    return (
        <section className="rounded-2xl border border-gray-200 bg-white">
            <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                <h2 className="text-base font-semibold text-text">Jadwal Hari Ini</h2>
                <span className="text-xs text-text/60">
                    {new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date())}
                </span>
            </header>

            {items.length === 0 ? (
                <EmptyState
                    title="Tidak ada jadwal hari ini"
                    description="Rehat sebentar—tetap pantau pengumuman KRS ya."
                    action={null}
                />
            ) : (
                <ul className="divide-y divide-gray-200">
                    {items.map((it) => (
                        <li key={it.id} className="flex items-center justify-between px-4 py-3">
                            <div>
                                <div className="font-medium text-text">{it.name}</div>
                                <div className="text-sm text-text/70">{it.lecturer}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-medium text-primary">{it.time}</div>
                                <div className="text-xs text-text/60">{it.room}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
