import { Calendar } from "~/components/ui/calendar"
import {
  SidebarGroup,
  SidebarGroupContent,
} from "~/components/ui/sidebar"

export function DatePicker() {
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar className="[&_[role=gridcell].bg-accent]:bg-primary-bg [&_[role=gridcell].bg-accent]:font-bold [&_[role=gridcell].bg-accent]:border-primary-theme [&_[role=gridcell].bg-accent]:border-1 [&_[role=gridcell].bg-accent]:text-primary-theme [&_[role=gridcell]]:w-[33px]" />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
