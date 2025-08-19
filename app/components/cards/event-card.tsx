import { Heart, MapPin } from 'lucide-react';
import dayjs from 'dayjs';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/components/ui/avatar"
import { STORAGE_URL } from '~/config/defaults';
import { Link } from 'react-router';


export default function EventCard({ event, index }: { event: OrganiserEvent, index?: number }) {
    const formattedDate = dayjs(event.date).format('MMM DD').toUpperCase();

    return (
        <div key={index} className="bg-white border border-gray-100 flex flex-col gap-2 hover:shadow-lg rounded-xl group">
            {/* event banner */}
            <div className="relative bg-gray-100 rounded-xl w-full group-hover:opacity-85 aspect-video h-50 lg:h-70 overflow-hidden transition">
                <Link to={`/events/${event.slug}`}>
                    <span aria-hidden="true" className="z-50 absolute inset-0" />
                </Link>
                
                {event.bannerUrl && (
                    <img
                        src={event.bannerUrl && `${STORAGE_URL}/${event.bannerUrl}`}
                        alt={event.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                )}

                {/* Overlay background */}
                <div className='absolute top-0 left-0 w-full min-h-full bg-gradient-to-t from-black/70 to-black/30' />

                {/* Upperside of the card */}
                <div className="absolute flex items-center justify-between top-2 w-[97%] left-2 py-0.5 px-1">
                    <div className='bg-white top-2 left-2 w-max py-0.5 px-2 rounded-lg'>
                        <div className='flex flex-col justify-start items-center '>
                            <p className="text-xl font-bold">{formattedDate.split(' ')[1]}</p>
                            <p className="-mt-1.5 tracking-tighter text-xs font-light uppercase">{formattedDate.split(' ')[0]}</p>
                        </div>
                    </div>
                    <div className='bg-white top-2 left-2 w-max py-2 px-2 rounded-full'>
                        <Heart strokeWidth={1} size={18} className='text-primary' />
                    </div>

                </div>

                {/* Added top-0 and left-0 to position the overlay */}
                <div className='absolute bottom-0 left-0 w-full text-white p-2'>
                    <div className="flex items-center gap-1">
                        <MapPin strokeWidth={1.5} size={14} /> <span className='font-light text-sm capitalize'>{event.city}, {event.country}</span>
                    </div>

                    <div className="text-lg font-medium tracking-tighter mb-1">{event.title}</div>

                    <div className="flex items-center gap-2">
                        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring *:data-[slot=avatar]:grayscale">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <Avatar>
                                <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                                <AvatarFallback>LR</AvatarFallback>
                            </Avatar>
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/evilrabbit.png"
                                    alt="@evilrabbit"
                                />
                                <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="text-white font-light text-xs">+200 Attending</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

{/* Content Wrapper */ }
{/* <div className="flex items-stretch px-4 py-2">
    <div className='flex flex-col leading-0 justify-start items-center '>
        <p className="text-xl font-light uppercase">{formattedDate.split(' ')[0]}</p>
        <p className="-mt-2 text-3xl font-bold">{formattedDate.split(' ')[1]}</p>
    </div>

    <div className="w-1 mx-4 border-e border-gray-400" />

    <div className='flex flex-col pb-1 w-full'>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
                <MapPin strokeWidth={1.5} size={14} /> <span className='font-light text-sm capitalize'>{event.city}, {event.country}</span>
            </div>
            <div className="flex items-center gap-1 mb-1 text-gray-600">
                <Eye strokeWidth={1.5} size={14} /> <span className='font-light text-xs'>{event.views}</span>
            </div>
        </div>
        <div className="text-lg font-medium tracking-tighter">{event.title}</div>
        <div className="text-xs font-light">{event.description}</div>
        <div className="text-[10px] flex items-center gap-2 mt-2">
            <Ticket strokeWidth={1.5} size={14} />
            <span className='font-light'>Start from <span className='font-semibold'>NGN 5,000</span> </span>
        </div>
    </div>
</div> */}