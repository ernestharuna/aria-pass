import { Outlet, redirect } from "react-router";
import { toast } from "sonner";
import useRoute from "~/hooks/use-route";
import useSession from "~/hooks/use-session";
import { AppSidebar } from "~/components/app-sidebar"

import { Separator } from "~/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar"
import type { Route } from "../_user/+types/route";
import Breadcrumb from "~/components/navigation/breadcrumb";
import client from "~/http/client";

export async function clientLoader() {
    const { getUser, validateSession } = useSession();
    const { intendedRoute } = useRoute();

    async function getSpaces() {
        const user = getUser();
        const isOrganiser = user && (await user).organiserProfile;

        if (!isOrganiser) return [];

        const spaces = await client.get('api/spaces');
        return spaces.data;
    }

    async function getInvitedSpaces() {
        const spaces = await client.get('api/spaces/invited');
        return spaces.data;
    }

    try {
        const user = await validateSession();
        const spaces = getSpaces();
        const invitedSpaces = getInvitedSpaces();

        return { user, spaces, invitedSpaces };
    } catch ({ response }: any) {
        if (response?.status === 401) {
            toast.warning("Your session has expired!", {
                description: "Login to continue using OwenaHub",
            })
        } else {
            toast.error("Something went wrong", {
                action: {
                    label: "Reload",
                    onClick: () => window.location.reload(),
                },
            })
        }
        intendedRoute(window.location.pathname);
        return redirect('/login');
    }
}

export default function ProtectedLayout({ loaderData }: Route.ComponentProps) {
    const { user, spaces, invitedSpaces }: { user: User, spaces: Promise<OrganiserEvent[]>, invitedSpaces: Promise<OrganiserEvent[]> } = loaderData;
    console.log(invitedSpaces);

    return (
        <SidebarProvider>
            <AppSidebar user={user} spaces={spaces} invitedSpaces={invitedSpaces} />
            <SidebarInset>
                <header className="z-50 bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-y px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb />
                </header>
                <div className="flex flex-1 flex-col gap-4 px-6 py-10 max-w-[94rem] w-full b mx-auto">
                    <Outlet context={user} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}