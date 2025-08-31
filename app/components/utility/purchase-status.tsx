export default function PurchaseStatus({ status }: Pick<TicketPurchase, 'status'>) {
    const statusStyles: Record<string, string> = {
        refunded: "bg-gray-100 text-primary",
        completed: "bg-green-100 text-green-600",
        failed: "bg-red-50 text-red-600",
        pending: "bg-yellow-100 text-yellow-600",
    };

    const classes = statusStyles[status] ?? "bg-gray-50 text-gray-500";

    return (
        <span className="inline-block text-xs font-semibold capitalize tracking-tight">
            <span className={`px-2 py-1 rounded-md ${classes}`}>
                {status}
            </span>
        </span>
    );
}