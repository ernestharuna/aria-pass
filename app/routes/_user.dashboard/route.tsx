import EventCard from '~/components/cards/event-card'
import client from '~/http/client'
import type { Route } from '../_user.dashboard/+types/route';
import { ArrowRight, SquareDashedMousePointer } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Link, useOutletContext } from 'react-router';

export async function clientLoader() {
    try {
        const response = await client.get('/api/events');
        const events = response.data;

        return { events }
    } catch ({ response }: any) {

    }
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
    const { events } = loaderData;
    const user: User = useOutletContext();

    console.log(events);

    return (
        <div>
            <section className="py-10">
                <h1 className='text-primary text-2xl font-medium tracking-tight'>Upcoming Events</h1>

                {(events && events.length) ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-5 justify-start">
                        {Array.from({ length: 4 }).map((track, index) => (
                            <EventCard key={index} track={track} index={index} />
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
                            <Link to={"/create-event"}>
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
        </div>
    )
}
