import { ArrowRight, Calendar, Ellipsis, Heart, MapPin, Share2, Ticket } from "lucide-react";
import { STORAGE_URL } from "~/config/defaults";
import dayjs from "dayjs";
import { Link } from 'react-router';
import TicketCard from "~/components/cards/ticket-card";
import Placeholder from "~/components/utility/placeholder";
import { Button } from "~/components/ui/button";
import RedirectOrFetcher from "~/components/navigation/like-event";
import SharePage from "~/components/utility/share-page";

export default function MobileView({ event }: { event: OrganiserEvent }) {

    let banner = event.bannerUrl
        ? `${STORAGE_URL}/${event.bannerUrl}`
        : "/images/banners/default-course-img.png";

    const formattedDate = dayjs(event.date).format('MMMM D, YYYY');

    const TOTAL_TICKETS: number = event.tickets.reduce((sum: number, ticket: Ticket) => {
        return sum + ticket.quantityAvailable;
    }, 0);

    return (
        <section>
            <div className="bg-slate-100 col-span-1 md:col-span-4 h-60 w-full aspect-video group-hover:opacity-75 lg:h-auto overflow-hidden">
                <img
                    src={event.bannerUrl
                        ? `${STORAGE_URL}/${event.bannerUrl}`
                        : "/images/banners/default-course-img.png"}
                    alt={event.title}
                    className="h-60 w-full object-cover"
                />
            </div>

            <div className='container mt-5'>
                <div className='text-sm mb-2'>
                    Organised by {" "}
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
                            <div className="flex items-center gap-2 px-3 py-1.5 text-xs bg-indigo-50 text-primary-theme border border-primary-theme rounded-full hover:bg-gray-100 cursor-pointer transition">
                                <div>
                                    <Heart size={16} className="text-destructive fill-destructive" />
                                </div>
                                <span>Like Event</span>
                            </div>
                        </RedirectOrFetcher>
                        <SharePage>
                            <div className="flex items-center gap-2 px-3 py-1.5 text-xs bg-indigo-50 text-primary-theme border border-primary-theme rounded-full hover:bg-gray-100 cursor-pointer transition">
                                <div>
                                    <Share2 size={16} />
                                </div>
                                <span>Share</span>
                            </div>
                        </SharePage>
                    </div>

                    <div className="flex flex-col gap-10 w-full">
                        <div className='flex flex-col gap-3'>
                            <div className='text-gray-500 flex items-center gap-2'>
                                <Calendar size={20} />
                                <span className='text-sm'>{formattedDate}</span> — <span>{event.startTime.split(":")[0]}:{event.startTime.split(":")[1]}</span>
                            </div>
                            <div className='text-gray-500 flex items-center gap-2'>
                                <MapPin size={20} />
                                <span className='text-sm capitalize'>{event.city}, {event.country}</span>
                            </div>
                        </div>

                        <div className='flex items-end gap-14 justify-start'>
                            <div className='text-gray-500 flex flex-col items-start gap-1'>
                                <span className="text-sm">Tickets Sold</span>
                                <span>
                                    <span className="text-2xl font-bold text-primary">0</span>
                                    <span>/{TOTAL_TICKETS}</span>
                                </span>
                            </div>
                            <div className='text-gray-500 flex flex-col items-start gap-1'>
                                <span className="text-sm">Starts from</span>
                                <span>
                                    <span className="text-2xl font-bold text-primary-theme">
                                        N5,000
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 p-4 rounded-2xl mt-5 w-full">
                        <h2 className="font-semibold tracking-tighter text-lg text-primary mb-2">About Event</h2>
                        <div className="text-sm">
                            {event.description}
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

                        <Button className="bg-primary-theme w-full py-5 rounded-full font-light text-md tracking-tighter">
                            Get Booked <Ticket />
                        </Button>
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
                                Comments <span className="font-light text-sm">(256)</span>
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
