import { toast } from 'sonner';
import useSession from '~/hooks/use-session';
import client from '~/http/client';
import type { Route } from '../_user.my-events/+types/route';
import DetailedEventCard from '~/components/cards/detailed-event-card';
import { Link, redirect } from 'react-router';
import { Button } from '~/components/ui/button';
import { parseForm } from '~/lib/utils';
import { Plus } from 'lucide-react';

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

    return (
        <div>
            <section>
                <div className="flex justify-between items-center">
                    <h1 className='text-primary text-2xl font-medium tracking-tight'>My Events</h1>
                    <Link to={'new'} >
                        <Button
                            variant={'default'}
                            size={'sm'}
                            className='rounded-full cursor-pointer text-xs'
                        >
                            Create Event <Plus size={10} />
                        </Button>
                    </Link>
                </div>

                {(events && events.length) ? (
                    <div className="grid grid-cols-1 pt-4 items-stretch justify-start">
                        {events.map((event) => (
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
