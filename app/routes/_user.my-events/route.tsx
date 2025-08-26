import { toast } from 'sonner';
import useSession from '~/hooks/use-session';
import client from '~/http/client';
import type { Route } from '../_user.my-events/+types/route';
import DetailedEventCard from '~/components/cards/detailed-event-card';
import { Link, redirect, useSearchParams } from 'react-router';
import { Button } from '~/components/ui/button';
import { parseForm } from '~/lib/utils';
import { Plus } from 'lucide-react';
import RecordFilter from '~/components/utility/record-filter';
import { useEffect, useState } from 'react';

export async function clientLoader() {
    const { getUser } = useSession();

    try {
        const user = getUser();
        const isOrganiser = user && (await user).organiserProfile?.status === 'active'

        if (!isOrganiser) {
            toast.warning("Unauthorized page", {
                description: 'No active orgainiser profile'
            });
            return redirect('/dashboard')

        }
        const { data } = await client.get('/api/organiser/events');

        return { events: data }
    } catch ({ response }: any) {
        console.error(response);
        return redirect('/dashboard')
    }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
    const credentials = await parseForm(request);

    const promise = new Promise(async (resolve, reject) => {
        try {
            await client.delete(`api/organiser/events/${credentials.event_slug}`);
            resolve('Event has been deleted');
            redirect('/my-events')
        } catch (error: any) {
            reject(error.status)
        }
    });

    toast.promise(promise, {
        loading: "Processing delete request",
        success: (msg) => msg as string,
        error: "Failed to process"
    });

    return null
}

export default function MyEvents({ loaderData }: Route.ComponentProps) {
    const { events }: { events: OrganiserEvent[] } = loaderData;

    const [searchParams] = useSearchParams();
    const [filteredEvents, setFilteredEvents] = useState<OrganiserEvent[]>(events);

    useEffect(() => {
        const filtered = events.filter((submission) => {
            if (searchParams.get("status")) {
                return submission.status === searchParams.get("status");
            }
            return true;
        });
        setFilteredEvents(filtered);
    }, [searchParams, events]);

    return (
        <div>
            <section>
                <div className="flex flex-col lg:flex-row gap-7 justify-between lg:items-start">
                    <div>
                        <h1 className='text-primary text-2xl font-medium tracking-tight mb-3'>My Events</h1>
                        <RecordFilter />
                    </div>
                    <Link to={'new'} className=''>
                        <Button
                            variant={'default'}
                            size={'sm'}
                            className='bg-primary cursor-pointer text-xs'
                        >
                            Create Event <Plus size={10} />
                        </Button>
                    </Link>
                </div>

                {(filteredEvents && filteredEvents.length) ? (
                    <div className="grid grid-cols-1 pt-4 items-stretch justify-start">
                        {filteredEvents.map((event) => (
                            <DetailedEventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <div className='pt-20 flex flex-col items-start gap-5'>
                        <p className="text-light text-sm text-muted-foreground text-center">
                            Nothing coming up at the moment
                        </p>
                    </div>
                )}
            </section>
        </div>
    )
}
