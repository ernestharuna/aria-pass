import { ArrowRight, Calendar, Ellipsis, Heart, MapPin, Share, Ticket } from "lucide-react";
import { STORAGE_URL } from "~/config/defaults";
import dayjs from "dayjs";
import TicketCard from "~/components/cards/ticket-card";
import Placeholder from "~/components/utility/placeholder";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import RedirectOrFetcher from "~/components/navigation/like-event";
import SharePage from "~/components/utility/share-page";

export default function DesktopView({ event }: { event: OrganiserEvent }) {

    let banner = event.bannerUrl
        ? `${STORAGE_URL}/${event.bannerUrl}`
        : "/images/banners/default-course-img.png";

    const formattedDate = dayjs(event.date).format('MMMM D, YYYY');

    const TOTAL_TICKETS: number = event.tickets.reduce((sum: number, ticket: Ticket) => {
        return sum + ticket.quantityAvailable;
    }, 0);

    return (
        <div>
            <div className="container py-10 flex gap-10 items-start">
                <div className="basis-6/10">
                    <section className="rounded-3xl border border-gray-100 bg-white mb-8">
                        <div className="bg-white w-full overflow-hidden rounded-t-3xl relative">
                            <img
                                src={banner}
                                alt={event.title}
                                className="h-90 w-full object-cover"
                            />

                            <div className="bg-white/90 px-4 py-2 text-sm font-semibold rounded-md absolute top-5 left-5">{event.eventType}</div>
                        </div>
                        <div className='px-8 py-8'>
                            <div className='text-sm mb-2'>
                                Organised by {" "}
                                <Link to="#creator" className="font-bold text-primary-theme underline underline-offset-2">
                                    {event.organiser.organiserName}
                                </Link>
                            </div>
                            <div className="flex items-center gap-10  justify-between mb-6">
                                <h1 className="text-xl md:text-3xl font-semibold tracking-tighter leading-10">
                                    {event.title}
                                </h1>

                                <div className="flex items-center gap-4">
                                    <RedirectOrFetcher route={`/events/toggle-like/${event.slug}`}>
                                        <button title="Add to favourites"  className='border p-3 border-gray-200 rounded-full hover:bg-gray-100 cursor-pointer transition'>
                                            <Heart 
                                                className={`${event.liked && 'text-destructive fill-current'}`}
                                            />
                                        </button>
                                    </RedirectOrFetcher>
                                    <SharePage>
                                        <div className='border p-3 border-gray-200 rounded-full hover:bg-gray-100 cursor-pointer transition'>
                                            <Share />
                                        </div>
                                    </SharePage>
                                </div>
                            </div>

                            <div className="flex justify-between items-end">
                                <div className='flex flex-col gap-3'>
                                    <div className='text-gray-500 flex items-center gap-2'>
                                        <Calendar size={18} />
                                        <span className='text-normal'>{formattedDate}</span> — <span>{event.startTime.split(":")[0]}:{event.startTime.split(":")[1]}</span>
                                    </div>
                                    <div className='text-gray-500 flex items-center gap-2'>
                                        <MapPin size={18} />
                                        <span className='text-normal capitalize'>{event.city}, {event.country}</span>
                                    </div>
                                </div>

                                <div className='flex items-end gap-16'>
                                    <div className='text-gray-500 flex flex-col items-end gap-1'>
                                        <span className="text-sm">Tickets Sold</span>
                                        <span>
                                            <span className="text-3xl font-bold text-primary">0</span>
                                            <span>/{TOTAL_TICKETS}</span>
                                        </span>
                                    </div>
                                    <div className='text-gray-500 flex flex-col items-end gap-1'>
                                        <span className="text-sm">Starts from</span>
                                        <span>
                                            <span className="text-3xl font-bold text-primary-theme">
                                                N5,000
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-10" />

                            <div>
                                <h2 className="font-semibold tracking-tighter text-xl text-indigo-800 mb-4">About Event</h2>
                                <div>
                                    {event.description}
                                </div>
                            </div>

                            <hr className="my-10" />

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-semibold tracking-tighter text-xl text-indigo-800">Venue and Address</h2>
                                    <Button
                                        size={"sm"} variant={"outline"}
                                        className="shadow-none rounded-full text-primary-theme border-primary-bg tracking-tighter"
                                    >
                                        <MapPin /> View Map
                                    </Button>
                                </div>
                                <div className="mb-5">
                                    <h3 className="font-semibold">Venue & Hall name</h3>
                                    {event.venueName}
                                </div>
                                <div className="mb-5">
                                    <h3 className="font-semibold">Address</h3>
                                    {event.venueAddress}
                                </div>
                            </div>

                        </div>
                    </section>

                    <section className="rounded-3xl border border-gray-100 bg-white px-8 py-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-xl">
                                Seat Plan
                            </h3>
                            <Ellipsis />
                        </div>

                    </section>
                </div>

                <div className="basis-4/10 min-w-0">
                    <aside className="bg-white px-8 py-6 rounded-3xl border border-gray-100 mb-8">
                        <div className="text-sm relative">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-xl">Event Tickets</h3>
                                <Ellipsis />
                            </div>
                            <div className="flex items-stretch gap-7 mt-8 overflow-x-auto pb-5">
                                {event.tickets.length
                                    ? event.tickets.map(ticket =>
                                        <TicketCard ticket={ticket} user="user" key={ticket.id} />
                                    )
                                    : <span className="text-gray-400">No tickets yet</span>
                                }
                            </div>
                            {event.tickets.length > 1 && (
                                <div className="rounded-full p-3 shadow-lg absolute top-1/2 -right-2 bg-gray-100">
                                    <ArrowRight />
                                </div>
                            )}
                        </div>

                        <hr className="my-10" />

                        <div className="text-sm relative mb-10">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-semibold text-xl">Notes</h3>
                                <Ellipsis />
                            </div>
                            <p>{event.extraInfo || <Placeholder text="No notes created by organiser" />}</p>
                        </div>

                        <Button className="bg-primary-theme w-full py-7 rounded-2xl font-semibold text-xl tracking-tighter">
                            Get Booked <Ticket />
                        </Button>
                    </aside>

                    <div className="bg-white px-8 py-6 rounded-3xl border border-gray-100 mb-8">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-xl">
                                Comments <span className="font-light text-sm">(256)</span>
                            </h3>
                            <Ellipsis />
                        </div>
                    </div>

                    <div className="bg-white px-8 py-6 rounded-3xl border border-gray-100 mb-8">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-xl">
                                Terms & Conditions
                            </h3>
                            <Ellipsis />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
