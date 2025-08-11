import { Calendar } from "~/components/ui/calendar"
import {
  SidebarGroup,
  SidebarGroupContent,
} from "~/components/ui/sidebar"

export function DatePicker() {
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar className="[&_[role=gridcell].bg-accent]:bg-gray-200 [&_[role=gridcell].bg-accent]:text-primary [&_[role=gridcell]]:w-[33px]" />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
