import { Link, Outlet, redirect, type MetaFunction } from 'react-router'
import useSession from '~/hooks/use-session';
import type { Route } from '../_auth/+types/route';

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

export async function clientLoader(_: Route.ClientLoaderArgs) {
    const { validateSession } = useSession();

    try {
        await validateSession();
        return redirect('/dashboard');
    } catch ({ response }: any) {
        return {};
    }
}

export default function AuthLayout() {
    return (
        <div>
            <header className="container flex justify-center pt-6">
                <Link to="/" className="z-10 flex gap-2 items-center cursor-pointer">
                    {/* <img width="30" className="inline-block" src="/images/logos/logo.png" title="OwenaHub" /> */}
                    <div className="text-popover-foreground">
                        <span className="font-medium mr-">AriaPass </span>
                        <span className="font-light text-sm">For Musicians</span>
                    </div>
                </Link>
            </header>
            <Outlet />
        </div>
    )
}
