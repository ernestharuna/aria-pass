import type { Route } from '../_user.events.toggle-like.$slug/+types/route'
import client from '~/http/client';
import { toast } from 'sonner';

export async function clientAction({ params }: Route.ClientActionArgs) {
    const promise = new Promise(async (resolve, reject) => {
        try {
            await client.post(`/api/events/${params.slug}/interested`);
            resolve('Event saved!');
        } catch (error) {
            reject(error);
        }
    });

    toast.promise(promise, {
        loading: 'Saving Event to your list',
        success: (message) => message as string,
        error: 'Something went wrong!',
    });

    return null;
}
