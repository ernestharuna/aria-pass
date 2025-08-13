import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import client from "~/http/client";

export async function clientLoader() {
    try {
        const profileRequests = await client.get('/api/admin/organiser-profiles');
        console.log(profileRequests)
    } catch ({ response }: any) {
        toast.error("Something went wrong");
        console.log(response);
    }
}

export default function Administrator() {
    return (
        <div>
            <section>
                <h2 className="text-lg mb-5 text-gray-600">Profile requests</h2>

                <section>
                    <div className="rounded-lg border border-gray-100 flex flex-col md:flex-row gap-5 justify-between items-between py-3 px-3 mb-3">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-gray-500">John Doe - m@example.com </p>
                            <p className="text-lg tracking-tighter">Example Organisation</p>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <Button size={"sm"} variant={"secondary"} className="rounded-full">Accept</Button>
                            <Button size={"sm"} variant={"outline"} className="rounded-full shadow-none">Decline</Button>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}