import React from 'react'
import { Link, useFetcher } from 'react-router'
import useAuth from '~/hooks/use-auth';

export default function RedirectOrFetcher({ children, route, }:
    { children: React.ReactNode, route: string }
) {
    const { userSession } = useAuth();
    const fetcher = useFetcher();

    return (
        <>
            {userSession
                ? (
                    <fetcher.Form method='POST' action={route}>
                        {children}
                    </fetcher.Form>
                )
                : (<Link to={"/register"}>{children}</Link>)
            }
        </>
    )
}
