import { Check, ChevronDown, Send, X } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

export default function UpdateEventStatus({ event }: { event: OrganiserEvent }) {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <div className="flex flex-col gap-1 items-center">
                    <Button variant="secondary" size="sm">
                        Change status <ChevronDown />
                    </Button>
                    {event.tickets.length === 0 && (
                        <span className="text-xs text-destructive">
                            No ticket added
                        </span>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-max relative">
                <DropdownMenuItem disabled>
                    Cancel event <DropdownMenuShortcut><X /></DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={!(event.tickets.length > 0)}>
                    Publish <DropdownMenuShortcut><Send /></DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    Mark done <DropdownMenuShortcut><Check /></DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
