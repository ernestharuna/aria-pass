import client from "~/http/client";
import type { Route } from "../_user.spaces_.$slug/+types/route";
import { toast } from "sonner";
import { redirect } from "react-router";
import AvatarGroup from "~/components/custom/avatar-group";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        const res = await client.get(`api/organiser/events/${params.slug}`);
        return { space: res.data }
    } catch ({ response }: any) {
        toast.warning("Something broke", {
            description: response.data.message || ""
        })
        return redirect('/my-events')
    }
}

export default function EventSpaces({ loaderData }: Route.ComponentProps) {
    const { space }: { space: OrganiserEvent } = loaderData;

    function extractNames(members: any) {
        if (!Array.isArray(members)) return [];
        return members.map(member => member.name);
    }

    return (
        <div>
            <section className="mx-auto mb-5">
                <p className="text-gray-500 mb-1 text-sm  md:text-base">Event Space</p>
                <h1 className="text-xl md:text-3xl font-bold tracking-tight">
                    {space.title}
                </h1>
            </section>

            <section className="border-b pb-4">
                <div className="flex items-center gap-2">
                    <AvatarGroup names={extractNames(space.members)} max={3} />

                    <span className="font-medium tracking-tighter ms-2">
                        {space.members?.length} member{space?.members.length > 1 && 's'}
                    </span>
                </div>
            </section>
        </div>
    )
}
