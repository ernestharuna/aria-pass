import { Outlet, redirect, type MetaFunction } from "react-router";
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

export const meta: MetaFunction = () => {
    return [
        { title: "AriaPass - Discover the community behind the concerts" },
        { name: "description", content: "Discover the community behind the concerts" },
        { name: "theme-color", content: "#625DF5" },
        { name: "keywords", content: "events, music, tickets, organise" },
        { name: "author", content: "OwenaHub" },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: "AriaPass - Discover the community behind the concerts" },
        { property: "og:description", content: "Discover the community behind the concerts" },
        { property: "og:image", content: "https://ariapass.owenahub.com/images/banners/app_banner.png" }, // image URL
        { property: "og:url", content: "https://ariapass.owenahub.com" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "AriaPass - Discover the community behind the concerts" },
        { name: "twitter:description", content: "Discover the community behind the concerts" },
        { name: "twitter:image", content: "https://ariapass.owenahub.com/images/banners/app_banner.png" }, // image URL
    ];
}

export async function clientLoader() {
    const { validateSession } = useSession();
    const { intendedRoute } = useRoute();

    try {
        const user = await validateSession();
        return { user };
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
    const { user }: { user: User } = loaderData;

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset>
                <header className="z-50 bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
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