import client from "~/http/client";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import dayjs from "dayjs";
import { STORAGE_URL } from "~/config/defaults";
import EventStatus from "~/components/utility/event-status";
import AddTicket from "./add-ticket";
import type { Route } from "../_user.my-events_.$slug/+types/route";
import { Link, redirect } from "react-router";
import { parseForm } from "~/lib/utils";
import formRequest from "~/http/form.request";
import { ArrowLeft, ChevronDown } from "lucide-react";
import TicketCard from "~/components/cards/ticket-card";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        const res = await client.get(`api/organiser/events/${params.slug}`);
        return { event: res.data }
    } catch ({ response }: any) {
        console.log(response);
        toast.warning("Something broke", {
            description: response.data.message || ""
        })
        return redirect('/my-events')
    }

}

export async function clientAction({ request, params }: Route.ClientActionArgs) {
    const credentials = await parseForm(request)
    console.log(credentials);
    // return
    try {
        switch (credentials.type) {
            case 'ticket.edit':
                await formRequest(
                    credentials,
                    `organiser/events/${params.slug}/tickets/${credentials.ticketId}`,
                    'PATCH'
                );
                toast.success("Ticket edited!");
                return;
            case 'ticket.create':
                await formRequest(credentials, `organiser/events/${params.slug}/tickets`, 'POST');
                toast.success("Ticket added!", {
                    description: 'Feel free to edit the content of your event ticket'
                });
                return;
            default:
                toast.warning('No form action specified', {
                    description: 'Contact support concerning this'
                })
                break;
        }

        await formRequest(credentials, `organiser/events/${params.slug}/tickets`, 'POST');
        return redirect(`/my-events/${params.slug}`)
    } catch (error: any) {
        console.log(error)
        toast.warning('Something went wrong', {
            description: error
        });
        return
    }
}

export default function OrganiserEvent({ loaderData }: Route.ComponentProps) {
    const { event }: { event: OrganiserEvent } = loaderData;
    const FORMATTED_DATE = dayjs(event.date).format('MMMM D, YYYY');

    const TOTAL_TICKETS: number = event.tickets.reduce((sum: number, ticket: Ticket) => {
        return sum + ticket.quantityAvailable;
    }, 0);

    // console.log(event)
    return (
        <div>
            <Link to={"/my-events"} className="flex items-center gap-2 text-sm">
                <ArrowLeft size={16} />
                <span>My Events</span>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between pt-5 pb-10">
                {/* Left side */}
                <div className="flex gap-6 flex-col lg:flex-row lg:items-center w-full">
                    <div className="bg-gray-100 rounded-md group-hover:opacity-85 aspect-video h:50 lg:h-25 overflow-hidden transition">
                        {event.bannerUrl && (
                            <img
                                src={event.bannerUrl && `${STORAGE_URL}/${event.bannerUrl}`}
                                alt={event.title}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        )}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <EventStatus status={event.status} />
                        <h4 className='text-xl font-semibold'>{event.title}</h4>
                        <p className='text-gray-700 text-sm'>
                            {FORMATTED_DATE} at {event.startTime.split(":")[0]}:{event.startTime.split(":")[1]} ∙ {event.venueName}, <span className="capitalize">{event.city}, {event.country}</span>
                        </p>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex gap-3 items-center">
                    <Button variant={"outline"} size={"sm"}>Edit</Button>
                    <AddTicket />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-3 lg:gap-10 items-stretch">
                <section className="flex flex-col gap-4 flex-1 border-t py-5">
                    <p className="text-sm">Total revenue</p>
                    <p className="font-bold text-2xl">
                        <span className="text-xs text-muted-foreground">NGN</span> 0
                    </p>
                </section>
                <section className="flex flex-col gap-4 flex-1 border-t py-5">
                    <p className="text-sm">Tickets sold</p>
                    <div className="flex justify-between">
                        <p className="font-bold text-2xl">
                            0/{TOTAL_TICKETS}
                        </p>
                        <Button variant={"secondary"} size={"sm"} className="text-xs p-0">
                            <span>{event.tickets.length} categories</span>
                            <ChevronDown size={16} />
                        </Button>
                    </div>
                </section>
                <section className="flex flex-col gap-4 flex-1 border-t py-5">
                    <p className="text-sm">Page views</p>
                    <p className="font-bold text-2xl">{event.views.length}</p>
                </section>
            </div>

            <div className="mt-10 text-sm ">
                <h3 className="font-semibold">Event Tickets</h3>

                <div className="flex items-stretch gap-5 mt-5 overflow-x-auto pb-10 border-b">
                    {event.tickets.length
                        ? event.tickets.map(ticket => <TicketCard ticket={ticket} user="organiser" key={ticket.id} />)
                        : <span className="text-gray-400">No tickets yet</span>
                    }
                </div>
            </div>
        </div>
    )
}
