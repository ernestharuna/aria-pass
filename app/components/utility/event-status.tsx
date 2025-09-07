export default function EventStatus({ status }: Pick<OrganiserEvent, 'status'>) {
    const statusStyles: Record<string, string> = {
        draft: "bg-gray-100 text-primary",
        published: "bg-green-100 text-green-600",
        cancelled: "bg-red-50 text-red-600",
        completed: "bg-indigo-100 text-indigo-600",
        suspended: "bg-yellow-100 text-yellow-600",
    };

    const classes = statusStyles[status] ?? "bg-gray-50 text-gray-500";

    return (
        <span className="text-xs font-semibold capitalize tracking-tight">
            <span className={`px-2 py-1 rounded-md ${classes}`}>
                {status}
            </span>
        </span>
    );
}