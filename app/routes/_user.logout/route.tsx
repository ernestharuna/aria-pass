import { redirect } from "react-router";
import { toast } from "sonner";
import client from "~/http/client";
import type { Route } from "../_user.logout/+types/route";

export async function clientAction({ }: Route.ClientActionArgs) {
    await client.post('/api/logout');

    toast.info('You logged out', {
        description: 'Maybe you want to login again? 🥺',
    });

    return redirect('/login');
}