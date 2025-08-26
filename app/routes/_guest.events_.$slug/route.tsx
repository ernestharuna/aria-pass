import client from "~/http/client";
import type { Route } from "../_guest.events_.$slug/+types/route";
import { toast } from "sonner";
import { redirect } from "react-router";
import DesktopView from "./desktop-atf";
import MobileView from "./mobile-atf";


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

  return (
    <div className='bg-gray-50'>
      <div className="hidden lg:block">
        <DesktopView event={event} />
      </div>

      <div className="block lg:hidden">
        <MobileView event={event} />
      </div>
    </div>
  )
}
