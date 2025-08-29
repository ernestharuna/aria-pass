import EventCard from '~/components/cards/event-card'
import client from '~/http/client'
import type { Route } from '../_user.dashboard/+types/route';
import { ArrowRight, ChevronRight, SquareDashedMousePointer } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link, useOutletContext, type MetaFunction } from 'react-router';
import DetailedEventCard from '~/components/cards/detailed-event-card';
import useSession from '~/hooks/use-session';

export const meta: MetaFunction = () => {
    return [
        { title: "Dashboard | AriaPass" },
        { name: "description", content: "For Musicians" },
    ];
}

export async function clientLoader() {
    const { getUser } = useSession();

    try {
        const user = getUser();
        const isOrganiser = user && (await user).organiserProfile

        const promises = [
            client.get('/api/events'),
        ];

        if (isOrganiser) {
            promises.push(client.get('/api/organiser/events'));
        }

        const responses = await Promise.all(promises);

        const allEvents = responses[0].data;
        const myEvents = responses[1] ? responses[1].data : [];

        return {
            events: allEvents,
            myEvents: myEvents,
        };

    } catch ({ response }: any) {
        console.error("Failed to fetch events:", response);
        throw new Error("Could not fetch event data.");
    }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
    const { events, myEvents }: { events: OrganiserEvent[], myEvents: OrganiserEvent[] } = loaderData;
    const user: User = useOutletContext();

    return (
        <div>
            <section className="mb-10">
                <div className="flex flex-col gap-4 mb-8">
                    <p className="text-4xl font-bold tracking-tighter">Hello, {user.name.split(' ')[0]}!</p>
                    <h1 className='text-primary text-2xl font-medium tracking-tight'>Dashboard</h1>
                </div>

                <div>
                    <h2 className='text-primary text-lg font-medium tracking-tight flex items-center gap-3'>
                        <span>Upcoming Events</span>
                        <Link to={"/events"} className='hover:bg-gray-100 rounded-lg p-2'>
                            <ChevronRight size={16} />
                        </Link>
                    </h2>
                </div>

                {(events && events.length) ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 pt-5 items-stretch justify-start">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className='pt-10 flex flex-col items-center gap-5'>
                        <SquareDashedMousePointer strokeWidth={0.2} className='w-50 h-50 text-gray-500' />
                        <h2 className='font-semibold text-lg tracking-tighter'>No Events</h2>
                        <p className="text-light text-sm text-muted-foreground text-center">
                            Nothing coming up at the moment
                        </p>
                    </div>
                )}
            </section>

            {true && (
                <section className='mb-10'>
                    <h2 className='text-primary text-lg font-medium tracking-tight flex items-center gap-3'>
                        <span>Your Events</span>
                        <Link to={"/my-events"} className='hover:bg-gray-100 rounded-lg p-2'>
                            <ChevronRight size={16} />
                        </Link>
                    </h2>

                    <p className='text-sm text-muted-foreground mb-2'>
                        Manage your events, tickets, and attendees {" "}
                        <Link to={"/my-events"} className='text-blue-500 underline underline-offset-2'>here</Link>
                    </p>

                    {(myEvents && myEvents.length) ? (
                        <div className="grid grid-cols-1 items-stretch justify-start">
                            {myEvents.map((event) => (
                                <DetailedEventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className='pt-10 flex flex-col items-center gap-5'>
                            <p className="font-medium tracking-tight text-md text-primary">
                                You have no events yet.
                            </p>
                            {user.organiserProfile ? (
                                <Link to={"/my-events/new"}>
                                    <Button size={'sm'} className='rounded-full bg-primary text-xs'>
                                        Create an Event
                                    </Button>
                                </Link>
                            ) : (
                                <Link to={"/organiser-request"}>
                                    <Button className='rounded-full bg-primary-theme text-xs'>
                                        Becoome an Organiser <ArrowRight />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}
                </section>
            )}
        </div>
    )
}
