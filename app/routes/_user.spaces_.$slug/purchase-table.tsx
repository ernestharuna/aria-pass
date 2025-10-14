import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table";
import FormatPrice from "~/components/utility/format-price";
import TransactionStatus from "~/components/utility/transaction-status";

export default function PurchasesTable({ event }: { event: OrganiserEvent }) {
    function getPurchases(args: Ticket[]): TicketPurchase[] {
        return args.flatMap(ticket =>
            (ticket.purchases ?? []).map(item => ({
                ...item,
                ticket: {
                    id: ticket.id,
                    eventId: ticket.eventId,
                    name: ticket.name,
                    description: ticket.description,
                    price: ticket.price,
                    theme: ticket.theme,
                    quantityAvailable: ticket.quantityAvailable,
                    ticketPurchases: ticket.ticketPurchases,
                },
            }))
        );
    }

    function sumPrices(purchases: TicketPurchase[]) {
        return purchases.reduce((total, item) => {
            const amount = parseFloat(item.amount) || 0;
            return total + amount;
        }, 0);
    }

    const PURCHASES = getPurchases(event.tickets);
    const SUM_AMOUNT = sumPrices(PURCHASES);

    return (
        <div>
            <Table>
                <TableCaption>Ticket Purchases</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Ticket Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {PURCHASES.length ? (
                        PURCHASES.map((purchase) => (
                            <TableRow key={purchase.id}>
                                <TableCell className="py-3">{purchase.user.email}</TableCell>
                                <TableCell className="py-3">{purchase.user.name}</TableCell>
                                <TableCell className="font-mono">{purchase.code}</TableCell>
                                <TableCell className="py-3">
                                    <span
                                        style={{ background: purchase.ticket.theme }}
                                        className="font-semibold px-2 py-1 rounded text-white text-sm"
                                    >
                                        {purchase.ticket.name}
                                    </span>
                                </TableCell>
                                <TableCell className="py-3">
                                    <TransactionStatus status={purchase.status} />
                                </TableCell>
                                <TableCell className="py-3 text-right">
                                    <FormatPrice price={purchase.amount} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-400 py-3">
                                No recorded sales yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Total Revenue</TableCell>
                        <TableCell className="text-right">
                            {parseInt(SUM_AMOUNT as any) === 0
                                ? (<>₦0</>)
                                : (<>₦{parseInt(SUM_AMOUNT as any).toLocaleString()}</>)
                            }
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
