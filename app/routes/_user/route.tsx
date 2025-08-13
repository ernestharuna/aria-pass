import { Outlet, redirect } from "react-router";
import { toast } from "sonner";
import useRoute from "~/hooks/use-route";
import useSession from "~/hooks/use-session";
import { AppSidebar } from "~/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "~/components/ui/sidebar"
import type { Route } from "../_user/+types/route";

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
                <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>October 2024</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Outlet context={user} />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}