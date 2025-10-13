import client from '~/http/client'
import type { Route } from '../_user.dashboard/+types/route';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link, redirect, useOutletContext, type MetaFunction } from 'react-router';
import DetailedEventCard from '~/components/cards/detailed-event-card';
import useSession from '~/hooks/use-session';
import { defaultMeta } from '~/lib/meta';
import CustomAvatar from '~/components/custom/custom-avatar';

export const meta: MetaFunction = (args) => {
    return [
        ...defaultMeta(args) || [],
        { title: "Dashboard | AriaPass" },
    ];
};

export async function clientLoader() {
    const { getUser, validateSession } = useSession();

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
        if (response.status === 409) {
            await validateSession();
        }

        console.error("Failed to fetch events:", response);
        return redirect('')
    }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
    const { events, myEvents }: { events: OrganiserEvent[], myEvents: OrganiserEvent[] } = loaderData;
    const user: User = useOutletContext();

    return (
        <div>
            <section className="mb-10">
                <div className="flex flex-row items-center gap-1 mb-8">
                    <CustomAvatar name={user.name} styles='h-14 w-14 text-2xl '/>
                    <p className="text-3xl md:text-4xl font-bold tracking-tighter">Hello, {user.name.split(' ')[0]}!</p>
                </div>



                {/* {(events && events.length) ? (
                    <div
                        className="flex overflow-x-auto gap-5 pt-5 items-stretch snap-x snap-mandatory scroll-smooth px-[10vw] md:px-5 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300"
                    >
                        {events.map((event, index) => (
                            <div
                                key={event.id + index}
                                className="flex-shrink-0 snap-start max-w-xs md:w-auto [animation-name:scale-in-view] [animation-timeline:view()] [animation-range:entry_25%_cover_50%_exit_25%]">
                                <EventCard event={event} />
                            </div>
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
                )} */}
            </section>


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
                        {myEvents.slice(0, 30).map((event) => (
                            <DetailedEventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className='pt-10 flex flex-col items-center gap-5'>
                        <p className="font-medium tracking-tight text-md text-primary">
                            You have no events yet.
                        </p>
                        {user.organiserProfile ? (
                            <>
                                <Button disabled={user.organiserProfile?.status !== 'active'}
                                    className='rounded-full bg-primary px-22 py-6'
                                >
                                    <Link to={"/my-events/new"}>
                                        Create an Event
                                    </Link>
                                </Button>
                                {user.organiserProfile.status === 'pending' && (
                                    <small className="text-xs text-amber-600">
                                        Request under review
                                    </small>
                                )}
                                {user.organiserProfile.status === 'suspended' && (
                                    <small className="text-xs text-destructive">
                                        Account suspended
                                    </small>
                                )}
                            </>
                        ) : (
                            <Link to={"/organiser-request"}>
                                <Button className='rounded-full bg-primary-theme px-22 py-6'>
                                    Become an Organiser <ArrowRight />
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </section>
        </div>
    )
}
