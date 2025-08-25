import dayjs from 'dayjs';
import { Eye, Heart, MapPin, Ticket } from 'lucide-react'
import CustomAvatar from '~/components/custom/custom-avatar';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import Placeholder from '~/components/utility/placeholder'

export default function PreviewCard({ event, bannerImage }: { event?: any, bannerImage: any }) {
    const formattedDate = dayjs(event.date).format('MMM DD').toUpperCase();

    return (
        <div className="bg-white border-gray-100 flex flex-col gap-1 group">
            <div className="relative bg-gray-100 rounded-lg w-full aspect-video h-60 lg:h-70 overflow-hidden">
                {bannerImage && (
                    <img
                        src={bannerImage}
                        alt={event.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                )}

                {/* Overlay background */}
                <div className='absolute top-0 left-0 w-full min-h-full bg-gradient-to-t from-black/70 to-black/30' />

                {/* Upperside of the card */}
                <div className="absolute flex items-center justify-between top-2 w-[97%] left-2 py-0.5 px-1">
                    <div className='bg-white top-2 left-2 w-max py-0.5 px-2 rounded-md'>
                        <div className='flex flex-col justify-start items-center '>
                            <p className="text-xl font-bold">{formattedDate.split(' ')[1]}</p>
                            <p className="-mt-1.5 tracking-tighter text-xs font-light uppercase">{formattedDate.split(' ')[0]}</p>
                        </div>
                    </div>
                    <div className="z-10">
                        <button title="Add to favourites" className='bg-white top-2 left-2 w-max py-2 px-2 rounded-full hover:scale-110 transition'>
                            <Heart
                                className="text-primary"
                                strokeWidth={1.5} size={20} />
                        </button>
                    </div>

                </div>

                {/* Added top-0 and left-0 to position the overlay */}
                <div className='absolute bottom-0 left-0 w-full text-white p-2'>
                    <div className="flex items-center gap-1">
                        <MapPin strokeWidth={1.5} size={14} />
                        <span className='font-light text-sm capitalize'>
                            {event.city || <Placeholder text='City' />}, {" "}
                            {event.country || <Placeholder text='Country' />}
                        </span>
                    </div>

                    <div className="text-lg font-medium tracking-tighter mb-1">{event.title || <Placeholder text='Event title' />}</div>

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
            <div className='flex items-center justify-between'>
                <div className="flex items-center text-xs">
                    <CustomAvatar
                        styles='size-8 text-[10px]'
                    />
                    <span className='font-medium tracking-tight me-2'>Profile name</span>
                    <span className='font-bold tracking-tight bg-gray-300 text-white uppercase px-1 py-0.5 rounded text-[10px]'>
                        {event.event_type || <Placeholder text='event type' />}
                    </span>
                </div>

                <div className='flex items-center gap-3'>
                    <div className="flex items-center gap-1 text-xs">
                        <Heart className='size-4 fill-gray-400 text-gray-400' />
                        <span className='text-gray-700'>{100}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                        <Eye className='size-4 text-gray-400' />
                        <span className='text-gray-700'>{100}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
