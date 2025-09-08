import { formatIDR } from '@/lib/format';

export default function HeroCards({
    gpa,
    ipSemester,
    sksTaken,
    sksMax,
    billsTotal,
    billsCount,
}: {
    gpa: number;
    ipSemester: number;
    sksTaken: number;
    sksMax: number;
    billsTotal: number;
    billsCount: number;
}) {
    const progress = Math.min(100, Math.round((sksTaken / sksMax) * 100));

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card>
                <CardIcon className="bg-primary/10 text-primary">🎓</CardIcon>
                <Metric title="IPK">{gpa.toFixed(2)}</Metric>
                <Subtle>Target 3.50+</Subtle>
            </Card>

            <Card>
                <CardIcon className="bg-primary/10 text-primary">📈</CardIcon>
                <Metric title="IP Semester Ini">{ipSemester.toFixed(2)}</Metric>
                <Subtle>Update terakhir 7 hari lalu</Subtle>
            </Card>

            <Card>
                <CardIcon className="bg-secondary/10 text-secondary">📚</CardIcon>
                <Metric title="SKS Diambil">
                    {sksTaken} <span className="text-text/60">/ {sksMax}</span>
                </Metric>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-primary/10">
                    <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${progress}%` }}
                        aria-label={`Progress SKS ${progress}%`}
                    />
                </div>
            </Card>

            <Card>
                <CardIcon className="bg-accent/10 text-accent">💳</CardIcon>
                <Metric title="Tagihan Aktif">{formatIDR(billsTotal)}</Metric>
                <Subtle>{billsCount} tagihan belum lunas</Subtle>
            </Card>
        </div>
    );
}

function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">{children}</div>
    );
}

function CardIcon({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${className}`}
        >
            <span className="text-lg">{children}</span>
        </div>
    );
}

function Metric({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <div className="text-xs uppercase tracking-wide text-text/60">{title}</div>
            <div className="text-2xl font-bold text-text">{children}</div>
        </div>
    );
}

function Subtle({ children }: { children: React.ReactNode }) {
    return <div className="mt-1 text-xs text-text/60">{children}</div>;
}
