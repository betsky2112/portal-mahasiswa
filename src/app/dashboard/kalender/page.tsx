// app/dashboard/kalender/page.tsx

import prisma from '@/lib/prisma';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function KalenderPage() {
    const events = await prisma.academicEvent.findMany({
        orderBy: { date: 'asc' },
    });

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Kalender Akademik</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <Calendar mode="single" className="rounded-md border" />
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Jadwal Penting</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {events.map((event) => (
                                    <li key={event.id} className="border-l-4 border-slate-600 pl-4">
                                        <p className="font-semibold">{event.title}</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(event.date).toLocaleDateString('id-ID', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
