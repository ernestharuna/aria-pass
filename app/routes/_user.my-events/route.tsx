import { toast } from 'sonner';
import useSession from '~/hooks/use-session';
import client from '~/http/client';
import type { Route } from '../_user.my-events/+types/route';
import DetailedEventCard from '~/components/cards/detailed-event-card';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';

export async function clientLoader() {
    const { getUser } = useSession();

    try {
        const user = getUser();
        const isOrganiser = user && (await user).organiserProfile?.status === 'active'

        if (!isOrganiser) {
            toast.warning("Unauthorized", {
                description: 'You organiser profile is invalid'
            })
        }

        const { data } = await client.get('/api/organiser/events');

        return { events: data }

    } catch ({ response }: any) {
        console.error("Failed to fetch events:", response);
        throw new Error("Could not fetch event data.");
    }
}

export default function MyEvents({ loaderData }: Route.ComponentProps) {
    const { events }: { events: OrganiserEvent[] } = loaderData;

    return (
        <div>
            <section>
                <div className="flex justify-between items-center">
                    <h1 className='text-primary text-2xl font-medium tracking-tight'>Your Events</h1>
                    <Link to={'new'} >
                        <Button variant={'secondary'} size={'sm'} className='cursor-pointer text-sm'>Create Event</Button>
                    </Link>
                </div>

                {(events && events.length) ? (
                    <div className="grid grid-cols-1 pt-4 items-stretch justify-start">
                        {events.map((event) => (
                            <DetailedEventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className='pt-10 flex flex-col items-start gap-5'>
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
        </div>
    )
}
