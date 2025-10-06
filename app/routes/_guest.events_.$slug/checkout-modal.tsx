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
                        className="bg-primary w-full py-7 text-lg font-light rounded-2xl tracking-tighter"
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
                                className="bg-primary-theme w-full py-7 rounded-2xl font-semibold text-xl tracking-tighter"
                            >
                                {event.status === 'completed'
                                    ? (
                                        <span>
                                            {isPastEventDate(event.date, event.startTime) ? 'Event Ended' : 'SOLD OUT'}
                                        </span>
                                    )
                                    : (
                                        <span>
                                            Get a Ticket
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
                                            onClick={() => setTicket(item)}
                                            className={`border p-2 flex items-center justify-between rounded-xl ${item.id === ticket?.id && 'outline-2 outline-primary-theme outline-offset-2 text-primary-theme'}`}
                                        >
                                            <div>
                                                <small>{item.name}</small>
                                                <p className="font-semibold">
                                                    <FormatPrice price={item.price} />
                                                </p>
                                            </div>
                                            {(item.id === ticket.id) && (
                                                <Dot strokeWidth={10} />
                                            )}
                                        </div>
                                    ))}

                                    <Button className="py-6 rounded-xl" disabled={!ticket} onClick={() => setNext(!next)}>
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