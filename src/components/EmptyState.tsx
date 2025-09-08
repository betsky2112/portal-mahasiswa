export default function EmptyState({
    title,
    description,
    action,
}: {
    title: string;
    description: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="rounded-lg border border-dashed p-8 text-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-600 mt-1">{description}</p>
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
