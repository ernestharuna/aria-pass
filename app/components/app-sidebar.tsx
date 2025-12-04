import React, { Suspense } from "react"
import { Info, Plus, UserPlus } from "lucide-react"

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
import { Await, Link, NavLink } from "react-router"

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user: User;
  spaces: Promise<OrganiserEvent[]>;
  invitedSpaces: Promise<OrganiserEvent[]>;
};

export function AppSidebar({ user, spaces, invitedSpaces, ...props }: AppSidebarProps) {

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-sidebar-border h-16">
        <NavUser user={user} />
      </SidebarHeader>

      <section className="border mx-2 mt-2 mb-2 bg-white rounded-2xl shadow">
        <div className="px-4 py-3">
          <div className="text-sm font-bold tracking-tight">
            {user.name}
          </div>
          <div className="text-xs font-light text-gray-600">
            {user.email}
          </div>
        </div>

        {user.organiserProfile?.status === 'active' && (
          <>
            <hr />
            <Link to={"/my-events"} className="px-4 py-4 block hover:bg-primary hover:text-white rounded-b-2xl transition cursor-pointer">
              <div className="text-xs font-medium flex items-center gap-2">
                <UserPlus size={16} />
                <span>Invite teammates</span>
              </div>
            </Link>
          </>
        )}
      </section>

      <SidebarContent>
        <DatePicker />

        <section className="px-3 pb-1.5">
          <h3 className="font-semibold tracking-tighter text-gray-400 text-sm mb-1">Your Spaces</h3>

          <div>
            <Suspense fallback={<div className="p-3 text-xs text-gray-500">Loading your spaces</div>}>
              <Await resolve={spaces}>
                {(loadedSpaces) => (
                  <>
                    {loadedSpaces.length === 0 && (
                      <div className="p-3 text-xs text-gray-400 flex items-center justify-center mt-1 gap-1">
                        <Info size={16} /> <span>No teammates</span>
                      </div>
                    )}

                    {loadedSpaces.map((space) => (
                      <NavLink
                        key={space.id}
                        to={`spaces/${space.slug}`}
                        className={({ isActive }) =>
                          [
                            isActive
                              ? "block rounded-md p-2 mb-1 bg-gray-200 border text-xs"
                              : "block rounded-md p-2 mb-1 bg-gray-100 border text-xs",
                          ].join(" ")
                        }
                      >
                        <div className=" font-semibold text-gray-500 tracking-tight">
                          {space.title}
                        </div>
                      </NavLink>
                    ))}
                  </>
                )}
              </Await>
            </Suspense>
          </div>

          <h3 className="font-semibold tracking-tighter text-gray-400 text-sm mt-3 mb-1">Invited Spaces</h3>

          <div>
            <Suspense fallback={<div className="p-3 text-xs text-gray-500">Loading your invites</div>}>
              <Await resolve={invitedSpaces}>
                {(loadedSpaces) => (
                  <>
                    {loadedSpaces.length === 0 && (
                      <div className="p-3 text-xs text-gray-400 flex items-center justify-center mt-1 gap-1">
                        <Info size={16} /> <span>You haven't been invited</span>
                      </div>
                    )}

                    {loadedSpaces.map((space) => (
                      <NavLink
                        key={space.id}
                        to={`spaces/${space.slug}`}
                        className={({ isActive }) =>
                          [
                            isActive
                              ? "block rounded-md p-2 mb-1 bg-gray-200 border text-xs"
                              : "block rounded-md p-2 mb-1 bg-gray-100 border text-xs",
                          ].join(" ")
                        }
                      >
                        <div className=" font-semibold text-gray-500 tracking-tight">
                          {space.title}
                        </div>
                      </NavLink>
                    ))}
                  </>
                )}
              </Await>
            </Suspense>
          </div>
        </section>
        <SidebarSeparator className="mx-0" />
      </SidebarContent>

      <SidebarFooter className="bg-white !shadow-[0px_0px_25px_#80808020]">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to={"/my-events/new"}>
              <SidebarMenuButton className="flex items-center justify-between bg-primary-theme hover:bg-primary-theme/80 hover:text-white text-white py-5 rounded-xl curosr-pointer">
                <span className="font-semibold tracking-tight text-sm">Create an Event</span>
                <Plus strokeWidth={3} />
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar >
  )
}
