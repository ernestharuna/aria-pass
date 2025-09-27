import { ArrowLeft, ArrowRight, Calendar, Dot, Ellipsis, Heart, MapPin, Share, Ticket } from "lucide-react";
import { STORAGE_URL } from "~/config/defaults";
import dayjs from "dayjs";
import { Link, useOutletContext } from 'react-router';
import TicketCard from "~/components/cards/ticket-card";
import Placeholder from "~/components/utility/placeholder";
import { Button } from "~/components/ui/button";
import RedirectOrFetcher from "~/components/navigation/like-event";
import SharePage from "~/components/utility/share-page";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import FormatPrice from "~/components/utility/format-price";
import OneTimePurchase from "./paystack-purchase-button";
import { useState } from "react";
import { isPastEventDate, to12HourFormat } from "~/lib/utils";
import { FormatLineBreak } from "~/components/utility/format-line-break";

export default function MobileView({ event }: { event: OrganiserEvent }) {
    const user: User = useOutletContext();

    let banner = event.bannerUrl
        ? `${STORAGE_URL}/${event.bannerUrl}`
        : "/images/banners/default-course-img.png";

    const formattedDate = dayjs(event.date).format('MMMM D, YYYY');

    const TOTAL_TICKETS: number = event.tickets.reduce((sum: number, ticket: Ticket) => {
        return sum + ticket.quantityAvailable;
    }, 0);

    const TOTAL_TICKETS_SALES: number = event.tickets.reduce((sum: number, ticket: Ticket) => {
        return sum + ticket.ticketPurchases;
    }, 0);

    return (
        <section>
            <div className="bg-slate-100 col-span-1 md:col-span-4 h-80 w-full aspect-video group-hover:opacity-75 lg:h-auto relative overflow-hidden">
                <img
                    src={banner}
                    alt={event.title}
                    className="h-80 w-full object-cover"
                />
                <div className="bg-white/60 border px-3 py-1.5 text-xs font-semibold rounded-lg absolute top-5 left-5">
                    {event.eventType}
                </div>

                {event.status === 'completed' && (
                    <div className='bg-gray-800 font-bold text-white text-xs px-3 py-3 rounded-md w-max mb-1 absolute bottom-5 left-5'>
                        {isPastEventDate(event.date, event.startTime) ? 'EVENT ENDED' : 'SOLD OUT'}
                    </div>
                )}
            </div>

            <div className='container mt-5'>
                <div className='text-sm mb-2'>
                    Curated by {" "}
                    <Link to="#creator" className="font-bold text-primary-theme underline underline-offset-2">
                        {event.organiser.organiserName}
                    </Link>
                </div>
                <div className="flex flex-col gap-3 items-start pb-10">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tighter">
                        {event.title}
                    </h1>

                    <div className="flex items-center gap-4 mb-3">
                        {/* /api/events/${params.slug}/interested */}
                        <RedirectOrFetcher route={`/events/toggle-like/${event.slug}`}>
                            <button className="flex items-center gap-2 px-3 py-3 text-xs text-primary font-medium border border-gray-200 rounded-full hover:bg-gray-100 cursor-pointer transition">
                                <div>
                                    <Heart
                                        size={18}
                                        className={`${event.liked && 'text-destructive fill-current'}`}
                                    />
                                </div>
                                {event.liked
                                    ? (<span className="">Saved</span>)
                                    : (<span className="">Save to favorites</span>)
                                }
                            </button>
                        </RedirectOrFetcher>
                        <SharePage>
                            <div className="flex items-center gap-2 px-3 py-3 text-xs text-primary font-medium border border-gray-200 rounded-full hover:bg-gray-100 cursor-pointer transition">
                                <div>
                                    <Share size={18} />
                                </div>
                                <span>Share</span>
                            </div>
                        </SharePage>
                    </div>

                    <div className="flex flex-col gap-10 w-full">
                        <div className='flex flex-col gap-3'>
                            <div className='text-gray-500 flex items-center gap-2'>
                                <Calendar size={20} />
                                <span className='text-sm'>{formattedDate}</span> — {" "}
                                <span className="text-primary font-semibold tracking-tighter">
                                    {to12HourFormat(event.startTime)}
                                </span>
                            </div>
                            <div className='text-gray-500 flex items-center gap-2'>
                                <MapPin size={20} />
                                <span className='text-sm capitalize'>{event.city}, {event.country}</span>
                            </div>
                        </div>

                        <div className='flex items-end gap-14 justify-start'>
                            <div className='text-gray-500 flex flex-col items-start gap-1'>
                                <span className="text-sm">Starts from</span>
                                <span>
                                    <span className="text-2xl font-bold text-primary-theme">
                                        {event.tickets.length
                                            ? <FormatPrice price={Math.min(...event.tickets.map(ticket => Number(ticket.price)))} />
                                            : 'No tickets available'
                                        }
                                    </span>
                                </span>
                            </div>
                            {event.engagementVisible ? (
                                <div className='text-gray-500 flex flex-col items-start gap-1'>
                                    <span className="text-sm">Tickets Sold</span>
                                    <span>
                                        <span className="text-2xl font-bold text-primary">
                                            {TOTAL_TICKETS_SALES}
                                        </span>
                                        <span>/{TOTAL_TICKETS}</span>
                                    </span>
                                </div>
                            ) : ""}
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 p-4 rounded-2xl mt-5 w-full">
                        <h2 className="font-semibold tracking-tighter text-lg text-primary mb-2">About Event</h2>
                        <div className="text-sm">
                            <FormatLineBreak input={event.description} />
                        </div>

                        <hr className="my-7" />

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold tracking-tighter text-lg text-primary">Venue & Address</h2>
                                <div className="p-2 rounded-full text-primary-theme border border-primary-bg tracking-tighter"
                                >
                                    <MapPin size={20} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <h3 className="text-sm text-gray-400">Venue & Hall name</h3>
                                {event.venueName}
                            </div>
                            <div className="mb-5">
                                <h3 className="text-sm text-gray-400">Address</h3>
                                {event.venueAddress}
                            </div>
                        </div>

                        <hr className="my-7" />

                        {/* The main change is on this line: `overflow-x-auto` becomes `overflow-hidden` */}
                        <div className="relative max-w-full mb-3">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg">Event Tickets</h3>
                                <Ellipsis />
                            </div>

                            {/* This div handles the scrolling of the cards correctly */}
                            <div className="flex items-stretch gap-7 mt-8 overflow-x-auto pb-5">
                                {event.tickets.length
                                    ? event.tickets.map(ticket =>
                                        <TicketCard ticket={ticket} user="user" key={ticket.id} />
                                    )
                                    : <span className="text-gray-400">No tickets yet</span>
                                }
                            </div>

                            {/* This arrow will now be visually clipped instead of causing a page scroll */}
                            {event.tickets.length > 1 && (
                                <div className="rounded-full p-3 shadow-lg absolute top-1/2 -right-0 bg-gray-100">
                                    <ArrowRight />
                                </div>
                            )}
                        </div>

                        {(() => {
                            const [ticket, setTicket] = useState<Ticket>(event.tickets[0]);
                            const [next, setNext] = useState(false);

                            return (
                                <>
                                    {(event.tickets.length < 2 && event.tickets[0].price === '0.00') ? (
                                        <RedirectOrFetcher route={`/events/toggle-like/${event.slug}`}>
                                            <Button className="bg-primary w-full py-7 text-lg font-medium rounded-2xl tracking-tighter">
                                                <span>I will attend</span>
                                                <div>
                                                    <Heart
                                                        size={18}
                                                        className={`${event.liked && 'text-destructive fill-current'}`}
                                                    />
                                                </div>
                                            </Button>
                                        </RedirectOrFetcher>
                                    ) : (
                                        <Dialog>
                                            <form>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        className="bg-primary-theme w-full py-7 text-lg font-medium rounded-full tracking-tighter"
                                                        disabled={isPastEventDate(event.date, event.startTime) || (event.status === 'completed')}
                                                    >
                                                        Get a Ticket <Ticket />
                                                    </Button>
                                                </DialogTrigger>

                                                <DialogContent className="sm:max-w-[425px]">
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

                                                            <Button disabled={!ticket} onClick={() => setNext(!next)}>
                                                                Continue
                                                            </Button>
                                                        </>
                                                    )}

                                                    {next && (
                                                        <OneTimePurchase user={user} ticket={ticket} />
                                                    )}
                                                </DialogContent>
                                            </form>
                                        </Dialog>
                                    )}

                                </>
                            )
                        })()}
                    </div>

                    <div className="bg-white border border-gray-100 p-4 rounded-2xl  w-full">
                        <div className="text-sm relative mb-10">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-semibold text-lg">Notes</h3>
                                <Ellipsis />
                            </div>
                            <p>{event.extraInfo || <Placeholder text="No notes created by organiser" />}</p>
                        </div>
                    </div>
                    <div className="bg-white border border-gray-100 p-4 rounded-3xl  w-full">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">
                                Comments <span className="font-light text-sm">(0)</span>
                            </h3>
                            <Ellipsis />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 p-4 rounded-3xl w-full">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">
                                Terms & Conditions
                            </h3>
                            <Ellipsis />
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
