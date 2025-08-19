import EventCard from '~/components/cards/event-card'
import client from '~/http/client'
import type { Route } from '../_user.dashboard/+types/route';
import { ArrowRight, SquareDashedMousePointer } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link, useOutletContext } from 'react-router';
import DetailedEventCard from '~/components/cards/detailed-event-card';
import useSession from '~/hooks/use-session';

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
                <h1 className='text-primary text-2xl font-medium tracking-tight'>Upcoming Events</h1>

                {(events && events.length) ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-5 items-stretch justify-start">
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
                        {user.organiserProfile?.status === 'active' ? (
                            <Link to={"/events/new-event"}>
                                <Button size={'sm'} className='rounded-full bg-primary text-xs'>
                                    Create an Event
                                </Button>
                            </Link>
                        ) : (
                            <Link to={"/organiser-request"}>
                                <Button size={'sm'} className='rounded-full bg-primary-theme text-xs'>
                                    Becoome an Organiser <ArrowRight />
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </section>

            {user.organiserProfile && (
                <section>
                    <h1 className='text-primary text-lg font-medium tracking-tight'>Your Events</h1>

                    {(myEvents && myEvents.length) ? (
                        <div className="grid grid-cols-1 pt-4 items-stretch justify-start">
                            {myEvents.map((event) => (
                                <DetailedEventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className='pt-10 flex flex-col items-center gap-5'>
                            <SquareDashedMousePointer strokeWidth={0.2} className='w-50 h-50 text-gray-500' />
                            <h2 className='font-semibold text-lg tracking-tighter'>No Events</h2>
                            <p className="text-light text-sm text-muted-foreground text-center">
                                Nothing coming up at the moment
                            </p>
                            <Link to={"/events/new-event"}>
                                <Button size={'sm'} className='rounded-full bg-primary text-xs'>
                                    Create an Event
                                </Button>
                            </Link>
                        </div>
                    )}
                </section>
            )}
        </div>
    )
}
