import client from "~/http/client";
import type { Route } from "../_guest.events_.$slug/+types/route";
import { toast } from "sonner";
import { redirect } from "react-router";
import AboveTheFolds from "./above-the-folds";


export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const { data } = await client.get(`api/events/${params.slug}`);
    return { event: data }
  } catch (error: any) {
    toast.error("Something went wrong", {
      description: `Status code ${error.status} - Unable to load resource`
    });
    return redirect('/')
  }
}

export default function ViewEvent({ loaderData }: Route.ComponentProps) {
  const { event }: { event: OrganiserEvent } = loaderData;
  console.log(event);


  return (
    <div>
      <AboveTheFolds event={event} />
    </div>
  )
}
