export default function TransactionStatus({ status }: Pick<TicketPurchase, 'status'>) {
    const statusStyles: Record<string, string> = {
        refunded: "bg-gray-500 text-primary",
        completed: "bg-green-500 text-green-600",
        failed: "bg-red-50 text-red-600",
        pending: "bg-yellow-500 text-yellow-600",
    };

    const classes = statusStyles[status] ?? "bg-gray-50 text-gray-500";

    return (
        <div className="capitalize flex items-center gap-1 tracking-tight">
            <span>
                {status}
            </span>
            <div className={`size-2.5 rounded-full ${classes}`} />
        </div>
    );
}