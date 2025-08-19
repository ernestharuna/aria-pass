import client from "~/http/client";
import type { Route } from "./+types/route";
import { redirect } from "react-router";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import dayjs from "dayjs";
import { STORAGE_URL } from "~/config/defaults";
import EventStatus from "~/components/utility/event-status";
import AddTicket from "./add-ticket";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        const res = await client.get(`api/organiser/events/${params.slug}`);
        return { event: res.data }
    } catch ({ response }: any) {
        console.log(response);
        toast.warning("Something broke", {
            description: response.data.message || ""
        })
        return redirect('/dashboard')
    }
}

export default function OrganiserEvent({ loaderData }: Route.ComponentProps) {
    const { event }: { event: OrganiserEvent } = loaderData;

    const formattedDate = dayjs(event.date).format('MMMM D, YYYY');

    // console.log(event)
    return (
        <div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between py-5">
                {/* Left side */}
                <div className="flex gap-6 flex-col lg:flex-row lg:items-center w-full">
                    <div className="bg-gray-100 rounded-md group-hover:opacity-85 aspect-video h:50 lg:h-25 overflow-hidden transition">
                        {event.bannerUrl && (
                            <img
                                src={event.bannerUrl && `${STORAGE_URL}/${event.bannerUrl}`}
                                alt={event.title}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        )}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <EventStatus status={event.status} />
                        <h4 className='text-xl font-semibold'>{event.title}</h4>
                        <p className='text-gray-700 text-sm'>
                            {formattedDate} at {event.startTime.split(":")[0]}:{event.startTime.split(":")[1]} ∙ {event.venueName}, <span className="capitalize">{event.city}, {event.country}</span>
                        </p>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex gap-3 items-center">
                    <Button variant={"outline"} size={"sm"}>Edit</Button>
                    {/* <Button variant={"secondary"} size={"sm"}>Add ticket</Button> */}
                    <AddTicket />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row  gap-10 items-stretch">
                <section className="flex flex-col gap-4 flex-1 border-t py-5">
                    <p className="text-sm">Total revenue</p>
                    <p className="font-bold text-2xl">
                        <span className="text-xs text-muted-foreground">NGN</span> 0
                    </p>
                </section>
                <section className="flex flex-col gap-4 flex-1 border-t py-5">
                    <p className="text-sm">Tickets sold</p>
                    <p className="font-bold text-2xl">0/0</p>
                </section>
                <section className="flex flex-col gap-4 flex-1 border-t py-5">
                    <p className="text-sm">Page views</p>
                    <p className="font-bold text-2xl">{event.views.length}</p>
                </section>
            </div>

            <div className="mt-10 text-sm">
                <h3>Recent Orders</h3>
            </div>
        </div>
    )
}
