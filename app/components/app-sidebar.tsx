import * as React from "react"
import { ChevronRight, LayoutGrid, Plus, Square, SquarePen } from "lucide-react"

import { Calendars } from "~/components/calendars"
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
import { NavLink } from "react-router"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: User;
};

const data = {
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
}

const app_menu = [
  {
    icon: <ChevronRight size={16} strokeWidth={4} />,
    label: "Dashboard",
    href: "dashboard"
  },
  {
    icon: <ChevronRight size={16} strokeWidth={4} />,
    label: "My Events",
    href: "my-events"
  },
  {
    icon: <ChevronRight size={16} strokeWidth={4} />,
    label: "Account",
    href: "account"
  },
]

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser user={user} />
      </SidebarHeader>

      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        {/* Navigation */}
        <section className="ps-2 mb-2">
          {app_menu.map((menu, index) => (
            <NavLink
              key={index + menu.href}
              to={menu.href}
              className={({ isActive, isPending }) =>
                isActive
                  ? "block bg-muted "
                  : isPending
                    ? "block  hover:bg-gray-100 text-primary"
                    : "block hover:bg-gray-100 text-primary"
              }
            >
              {({ isActive }) => (
                <div className="flex items-center">
                  <span className={`inline-block p-2 ${isActive ? "text-primary-theme rounded" : ""}`}>
                    {menu.icon ? (React.cloneElement(menu.icon))
                      : (<span>
                        <Square size={16} />
                      </span>)
                    }
                  </span>
                  <span className={`capitalize text-[13px] font-medium`}>
                    {menu.label}
                  </span>
                </div>
              )}
            </NavLink>
          ))
          }
        </section>

        <SidebarSeparator className="mx-0" />

        <Calendars calendars={data.calendars} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
