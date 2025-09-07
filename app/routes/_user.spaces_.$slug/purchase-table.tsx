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

export default function PurchasesTable({ event }: { event: OrganiserEvent }) {
    function getPurchases(args: Ticket[]): TicketPurchase[] {
        const PURCHASES: TicketPurchase[] = [];
        args.forEach(ticket => {
            ticket.purchases.forEach(item => {
                PURCHASES.push(item)
            })
        });
        return PURCHASES;
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
                <TableCaption>A list of ticket purchases.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {PURCHASES.length ? (
                        PURCHASES.map((purchase) => (
                            <TableRow key={purchase.id}>
                                <TableCell>{purchase.user.email}</TableCell>
                                <TableCell>{purchase.user.name}</TableCell>
                                <TableCell className="font-mono">{purchase.code}</TableCell>
                                <TableCell>
                                    <div className="rounded bg-gray-100 text-primary font-mono text-sm w-fit px-2 uppercase">
                                        {purchase.status}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <FormatPrice price={purchase.amount} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-400">
                                No recorded sales yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>Total Revenue</TableCell>
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
