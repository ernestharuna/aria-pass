import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import client from "~/http/client";
import type { Route } from "../_user.account.operations/+types/route";
import { useFetcher } from "react-router";

import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Check, X } from "lucide-react";

dayjs.extend(relativeTime);

export async function clientLoader() {
    try {
        const { data } = await client.get('/api/admin/organiser-profiles');
        return { profiles: data }
    } catch ({ response }: any) {
        toast.error("Something went wrong");
        console.log(response);
        throw new Error("Something went wrong");
    }
}

export default function Administrator({ loaderData }: Route.ComponentProps) {
    const { profiles }: { profiles: OrganiseProfile[] } = loaderData;
    const fetcher = useFetcher();

    return (
        <div>
            <section>
                <h2 className="text-lg mb-5 text-gray-400 tracking-tighter flex items-center gap-5">
                    Profile requests <div className="border-t w-20 inline-block" />
                </h2>

                <section>
                    {(profiles && profiles.length)
                        ? profiles.map((profile) => (
                            <div key={profile.id} className="rounded-lg border border-gray-100 flex flex-col md:flex-row gap-5 justify-between items-between py-3 px-3 mb-5">
                                <div className="flex flex-col gap-1 flex-1">
                                    <p className="text-sm text-gray-500">{profile.user} - {profile.contactEmail ?? "N/A"} </p>
                                    <p className="text-md tracking-tighter">{profile.organiserName}</p>
                                </div>

                                <div className="flex items-center justify-between gap-5 text-sm">
                                    <div className="text-xs text-muted-foreground">
                                        {dayjs(profile.createdAt).fromNow()}
                                    </div>

                                    <>
                                        {(profile.status === 'pending' || profile.status === "suspended") && (
                                            <fetcher.Form method="POST" action={`profile-request/${profile.id}`}>
                                                <input type="hidden" name="status" value="active" />
                                                <Button
                                                    size={"sm"}
                                                    variant={"secondary"}
                                                    className="rounded-full">
                                                    Approve <Check strokeWidth={3} className="text-green-500" />
                                                </Button>
                                            </fetcher.Form>
                                        )}

                                        {profile.status === 'active' && (
                                            <fetcher.Form method="POST" action={`profile-request/${profile.id}`}>
                                                <input type="hidden" name="status" value="suspended" />
                                                <Button
                                                    size={"sm"}
                                                    variant={"secondary"}
                                                    className="rounded-full">
                                                    Suspend <X strokeWidth={3} className="text-destructive"/>
                                                </Button>
                                            </fetcher.Form>
                                        )}
                                    </>

                                </div>
                            </div>
                        ))
                        : ("Nothing yet")}
                </section>
            </section>
        </div>
    )
}