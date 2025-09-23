export default function TransactionStatus({ status }: Pick<TicketPurchase, 'status'>) {
    const statusStyles: Record<string, string> = {
        refunded: "bg-gray-100 text-primary",
        completed: "bg-green-100 text-green-600",
        failed: "bg-red-50 text-red-600",
        pending: "bg-yellow-100 text-yellow-600",
    };

    const classes = statusStyles[status] ?? "bg-gray-50 text-gray-500";

    return (
        <span className="text-sm font-light uppercase tracking-tight">
            <span className={`px-2 py-1 rounded ${classes}`}>
                {status}
            </span>
        </span>
    );
}