export default function EmptyState({
    title,
    description,
    action,
}: {
    title: string;
    description: string;
    action?: React.ReactNode | null;
}) {
    return (
        <div className="px-6 py-10 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                ✨
            </div>
            <h3 className="text-base font-semibold text-text">{title}</h3>
            <p className="mt-1 text-sm text-text/60">{description}</p>
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
