import { EllipsisVertical } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
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
                        <TableHead>Name</TableHead>
                        <TableHead>Seat</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="">Amount</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {PURCHASES.length ? (
                        PURCHASES.map((purchase) => (
                            <TableRow key={purchase.id} className="text-xs">
                                <TableCell>{purchase.user.name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5">
                                        <span>
                                            {purchase.ticket.name}
                                        </span>
                                        <div style={{ background: purchase.ticket.theme }}
                                            className="font-semibold size-3 text-white text-sm"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <TransactionStatus status={purchase.status} />
                                </TableCell>
                                <TableCell>
                                    <FormatPrice price={purchase.amount} />
                                </TableCell>
                                <TableCell className="text-center w-[100px]">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant={'ghost'} className="size-6 hover:bg-gray-200 shadow-none rounded-2xl">
                                                <EllipsisVertical size={18} strokeWidth={3} className=" inline-block" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <div className="flex flex-col gap-4">
                                                <div>
                                                    <div className="text-gray-400 text-xs">TICKET ID</div>
                                                    <div className="text-sm">
                                                        {purchase.code}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 text-xs">USER EMAIL</div>
                                                    <div className="text-sm">
                                                        {purchase.user.email}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-400 text-xs">REF ID</div>
                                                    <div className="text-sm">
                                                        {purchase.reference?.split('-')[0]}
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-400 py-3">
                                No recorded sales yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow className="w-full">
                        <TableCell colSpan={3}>Total Revenue</TableCell>
                        <TableCell colSpan={2} className="text-left">
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
