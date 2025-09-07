import client from "~/http/client";
import type { Route } from "../_user.spaces_.$slug/+types/route";
import { toast } from "sonner";
import { redirect } from "react-router";
import AvatarGroup from "~/components/custom/avatar-group";
import PurchasesTable from "./purchase-table";
import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import CustomAvatar from "~/components/custom/custom-avatar";
import { Printer } from "lucide-react";

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
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <AvatarGroup names={extractNames(space.members)} max={3} />
                        <Dialog>
                            <div>
                                <DialogTrigger asChild>
                                    <span className="font-medium tracking-tighter underline underline-offset-2 underline-2 cursor-pointer">
                                        {space.members?.length} <span className=""> member{space?.members.length > 1 && 's'}</span>
                                    </span>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Members in this space</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col gap-3">
                                        {space.members.map((mem) => (
                                            <div className="flex gap-1 items-center">
                                                <CustomAvatar name={mem.name} styles="w-10 h-10" />
                                                <div className="flex flex-col gap-1">
                                                    <span>{mem.name}</span>
                                                    <span className="text-xs text-gray-400 font-light -mt-1">{mem.email}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">Close</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </div>
                        </Dialog>
                    </div>

                    <Button
                        variant={"outline"}
                        className="rounded-xl"
                        onClick={() => window.print()}
                    >
                        <Printer /> Print
                    </Button>
                </div>
            </section>

            <section>
                <PurchasesTable event={space} />
            </section>
        </div>
    )
}
