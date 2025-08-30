import * as React from "react"
import { Ban, CalendarCheck, Heart, Home, Plus, ShoppingCart, Square, User } from "lucide-react"

import { DatePicker } from "~/components/date-picker"
import { NavUser } from "~/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "~/components/ui/sidebar"
import { Link, NavLink } from "react-router"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: User;
};

// const data = {
//   calendars: [
//     {
//       name: "My Calendars",
//       items: ["Personal", "Work", "Family"],
//     },
//     {
//       name: "Favorites",
//       items: ["Holidays", "Birthdays"],
//     },
//     {
//       name: "Other",
//       items: ["Travel", "Reminders", "Deadlines"],
//     },
//   ],
// }

const app_menu = [
  {
    icon: <Home size={20} strokeWidth={2.5} />,
    label: "Dashboard",
    href: "dashboard"
  },
  {
    icon: <CalendarCheck size={20} strokeWidth={2.5} />,
    label: "My Events",
    href: "my-events"
  },
  {
    icon: <Heart size={20} strokeWidth={2.5} />,
    label: "Favourites",
    href: "favourites"
  },
  {
    icon: <ShoppingCart size={20} strokeWidth={2.5} />,
    label: "Purchases",
    href: "purchases"
  },
  {
    icon: <User size={20} strokeWidth={2.5} />,
    label: "Account",
    href: "account"
  },
]

export function AppSidebar({ user, ...props }: AppSidebarProps) {

  console.log(user);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser user={user} />
      </SidebarHeader>

      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />

        {/* Navigation */}
        <section className="px-2 mb-2">
          {app_menu.map((menu, index) => (
            <NavLink
              key={index + menu.href}
              to={menu.href}
              className={({ isActive, isPending }) =>
                isActive
                  ? "block rounded-xl p-1 bg-primary-bg text-primary-theme "
                  : isPending
                    ? "block rounded-xl p-1  hover:bg-gray-100 text-primary"
                    : "block rounded-xl p-1 hover:bg-gray-100 text-primary"
              }
            >
              {({ isActive }) => (
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <span className={`inline-block p-2 ${isActive ? "text-primary-theme rounded" : ""}`}>
                      {menu.icon ? (React.cloneElement(menu.icon))
                        : (<span>
                          <Square size={16} />
                        </span>)
                      }
                    </span>
                    <span className={`capitalize text-sm font-bold tracking-tight`}>
                      {menu.label}
                    </span>
                  </div>
                  {(menu.href === 'my-events' && !user.organiserProfile?.id) && (
                    <div className="bg-amber-50 border border-amber-200 p-1 rounded-md text-amber-500">
                      <Ban size={14} strokeWidth={3} />
                    </div>
                  )}
                </div>
              )}
            </NavLink>
          ))
          }
        </section>

        <SidebarSeparator className="mx-0" />

        {/* <Calendars calendars={data.calendars} /> */}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to={"/my-events"}>
              <SidebarMenuButton className="bg-primary-theme hover:bg-primary-theme/80 hover:text-white text-white py-5 rounded-xl curosr-pointer">
                <Plus />
                <span className="font-semibold tracking-tight text-sm">Create an Event</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
