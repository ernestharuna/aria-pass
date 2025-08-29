import { ChevronDown } from "lucide-react"
import * as React from "react"

import { Button } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

export function FeedFilter() {
    const [filter, setFilter] = React.useState("Upcoming")

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2 w-40 px-10 py-5 items-center justify-between rounded-full">
                    <span>{filter}</span> <ChevronDown size={14} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-min relative">
                <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                    <DropdownMenuRadioItem value="Upcoming">Upcoming</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Following" disabled>Following</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Organisers" disabled>Organisers</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
