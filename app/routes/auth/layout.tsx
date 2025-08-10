import { Link, Outlet, redirect } from 'react-router'
import useSession from '~/hooks/use-session';
import type { Route } from './+types/layout';

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
                        <span className="font-extrabold">AriaPass </span>
                        <span className="font-normal">For Musicians</span>
                    </div>
                </Link>
            </header>
            <Outlet />
        </div>
    )
}
