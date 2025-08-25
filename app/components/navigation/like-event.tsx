import React from 'react'
import { Link, useFetcher } from 'react-router'
import useAuth from '~/hooks/use-auth';

export default function RedirectOrFetcher({ children, route, }:
    { children: React.ReactNode, route: string }
) {
    const { userSession } = useAuth();
    const fetcher = useFetcher();

    return (
        <div className='z-20'>
            {userSession
                ? (
                    <fetcher.Form method='POST' action={route}>
                        {children}
                    </fetcher.Form>
                )
                : (<Link to={"/register"}>{children}</Link>)
            }
        </div>
    )
}
