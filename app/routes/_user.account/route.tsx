import { NavLink, Outlet, useOutletContext } from "react-router";

export default function Account() {
    const user: User = useOutletContext();

    const tabs = ["My account", "Ticket purchase", "Preferences"];
    const NAVIGATION = [...tabs, ...(user.accountType === 'admin' ? ['Operations'] : [])]

    return (
        <div>
            <section className="max-w-7xl mx-auto mt-8">
                <p className="text-gray-500">{user.name}</p>
                <h1 className="text-3xl">Account Setting</h1>
            </section>

            {/* Tabs */}
            <section className="max-w-7xl mx-auto mt-5 flex gap-8 text-sm overflow-x-auto border-b">
                {NAVIGATION.map((nav) => {
                    return (
                        <NavLink
                            key={nav}
                            to={nav.toLowerCase().replace(/\s+/g, "-")}
                            className={({ isActive }) =>
                                `border-b-2 py-2 transition-all text-nowrap font-medium ${isActive
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
            <section className="max-w-7xl mx-auto mt-8">
                <Outlet context={user} />
            </section>
        </div>
    );
}
