import { ArrowLeft, Dot, Heart } from "lucide-react";
import { useState } from "react";
import RedirectOrFetcher from "~/components/navigation/like-event";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import FormatPrice from "~/components/utility/format-price";
import { isPastEventDate } from "~/lib/utils";
import PaystackPurchaseButton from "./paystack-purchase-button";

export default function CheckoutModal({ event, user }: { event: OrganiserEvent, user: User }) {
    const [ticket, setTicket] = useState<Ticket>(event.tickets[0]);
    const [next, setNext] = useState(false);

    return (
        <>
            {(event.tickets.length < 2 && event.tickets[0].price === '0.00') ? (
                <RedirectOrFetcher route={`/events/toggle-like/${event.slug}`}>
                    <Button
                        disabled={isPastEventDate(event.date, event.startTime) || (event.status === 'completed')}
                        className="bg-primary w-full py-6 text-lg font-light rounded-lg tracking-tighter"
                    >
                        <span>I will attend</span>
                        <div>
                            <Heart
                                size={20}
                                className={`${event.liked && 'text-destructive fill-current'}`}
                            />
                        </div>
                    </Button>
                </RedirectOrFetcher>
            ) : (
                <Dialog>
                    <form>
                        <DialogTrigger
                            asChild
                            disabled={isPastEventDate(event.date, event.startTime) || (event.status === 'completed')}
                        >
                            <Button
                                className="bg-primary-theme border border-b-3 border-indigo-800 w-full py-6 rounded-lg font-semibold text-xl tracking-tighter"
                            >
                                {event.status === 'completed'
                                    ? (
                                        <span>
                                            {isPastEventDate(event.date, event.startTime) ? 'Event Ended' : 'SOLD OUT'}
                                        </span>
                                    )
                                    : (
                                        <span className="text-sm md:text-lg tracking-tighter uppercase font-semibold">
                                            Buy Ticket
                                        </span>
                                    )
                                }
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px] rounded-3xl">
                            <DialogHeader className="">
                                <DialogTitle>Buy Ticket</DialogTitle>
                            </DialogHeader>
                            {next && (
                                <Button
                                    size={"sm"}
                                    variant={"outline"}
                                    className="w-max p-0 text-xs shadow-none rounded-full"
                                    onClick={() => setNext(false)}
                                >
                                    <ArrowLeft /> Back
                                </Button>
                            )}
                            {!next && (
                                <>
                                    {event.tickets.map((item: Ticket) => (
                                        <div
                                            key={item.id}
                                            onClick={() => setTicket(item)}
                                            className={`border relative p-2 flex items-center justify-between rounded-xl ${item.id === ticket?.id && 'outline-2 outline-primary-theme outline-offset-2 text-primary-theme'}`}
                                        >
                                            <div>
                                                <small className="flex gap-1 items-center font-semibold">
                                                    <span>{item.name}</span>
                                                    {item.quantityAvailable - item.ticketPurchases <= 0 && (
                                                        <span className="bg-amber-400 text-white px-2 py-0.5 tracking-tighter text-xs rounded-lg">SOLD OUT</span>
                                                    )}
                                                </small>

                                                <p className="font-semibold">
                                                    <FormatPrice price={item.price} />
                                                </p>
                                            </div>
                                            {(item.id === ticket.id) && (
                                                <Dot strokeWidth={10} />
                                            )}
                                        </div>
                                    ))}

                                    <Button
                                        className="py-6 rounded-xl"
                                        disabled={!ticket || (ticket.quantityAvailable - ticket.ticketPurchases <= 0)}
                                        onClick={() => setNext(!next)}
                                    >
                                        Continue
                                    </Button>   
                                </>
                            )}

                            {next && (
                                <PaystackPurchaseButton user={user} ticket={ticket} />
                            )}
                        </DialogContent>
                    </form>
                </Dialog>
            )}
        </>

    )
}