import { NavLink, Outlet, useOutletContext, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
    return [
        { title: "Account | AriaPass" },
        { name: "description", content: "For Musicians" },
    ];
}

export default function AccountLayout() {
    const user: User = useOutletContext();

    const tabs = ["My account", "Ticket purchase", "Preferences"];
    const NAVIGATION = [...tabs, ...(user.accountType === 'admin' ? ['Operations'] : [])]

    return (
        <div>
            <section className=" mx-auto mt-8">
                <p className="text-gray-500">{user.name}</p>
                <h1 className="text-3xl">Account Setting</h1>
            </section>

            {/* Tabs */}
            <section className="mx-auto mt-5 flex gap-8 text-sm overflow-x-auto border-b">
                {NAVIGATION.map((nav) => {
                    return (
                        <NavLink
                            key={nav}
                            to={nav.toLowerCase().replace(/\s+/g, "-")}
                            className={({ isActive }) =>
                                `border-b-3 py-2 transition-all text-nowrap font-medium ${isActive
                                    ? "border-primary-theme text-black"
                                    : "border-white text-gray-500 hover:text-black"
                                }`
                            }
                        >
                            {nav}
                        </NavLink>
                    );
                })}
            </section>

            {/* Tab Content */}
            <section className=" mx-auto mt-8">
                <Outlet context={user} />
            </section>
        </div>
    );
}
