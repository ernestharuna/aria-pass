import dayjs from 'dayjs';
import { STORAGE_URL } from '~/config/defaults';

import { Button } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react';
import { Link } from 'react-router';
import EventStatus from '../utility/event-status';

export default function DetailedEventCard({ event }: { event: OrganiserEvent }) {
    const formattedDate = dayjs(event.date).format('MMMM D, YYYY');

    return (
        <div className="flex items-center justify-between py-5 border-b">
            {/* Left side */}
            <div className="flex gap-3 items-start w-full">
                <div className="bg-gray-100 rounded-md group-hover:opacity-85 aspect-video h-20 overflow-hidden transition">
                    {event.bannerUrl && (
                        <img
                            src={event.bannerUrl && `${STORAGE_URL}/${event.bannerUrl}`}
                            alt={event.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    )}
                </div>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-md font-bold leading-5'>{event.title}</h4>
                    <p className='text-gray-700 text-xs'>
                        {formattedDate} at {event.startTime.split(":")[0]}:{event.startTime.split(":")[1]} ∙ {event.venueName}, <span className="capitalize">{event.city}, {event.country}</span>
                    </p>
                    <p className='font-light text-gray-500 text-[12px]'>
                        100/300 tickets sold
                    </p>
                </div>
            </div>

            {/* Right side */}
            <div className="flex gap-3 items-center">
                <EventStatus status={event.status} />
                <Actions event={event} />
            </div>
        </div>
    )
}

function Actions({ event }: { event: OrganiserEvent }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <EllipsisVertical size={14} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-max relative md:right-[40%]">
                <Link to={`/my-events/${event.slug}`}>
                    <DropdownMenuItem className='cursor-pointer'>
                        View
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}