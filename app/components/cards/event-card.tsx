import { Crown, Eye, Heart, MapPin } from 'lucide-react';
import dayjs from 'dayjs';
import { STORAGE_URL } from '~/config/defaults';
import { Link } from 'react-router';
import RedirectOrFetcher from '../navigation/like-event';
import CustomAvatar from '../custom/custom-avatar';


export default function EventCard({ event, index }: { event: OrganiserEvent, index?: number }) {
    const formattedDate = dayjs(event.date).format('MMM DD').toUpperCase();

    return (
        <div key={index} className="bg-white border-gray-100 flex flex-col gap-1 group">
            {/* event banner */}
            <div className="relative bg-gray-100 rounded-lg w-full group-hover:opacity-85 aspect-video h-80 lg:h-90 overflow-hidden transition">
                <Link to={`/events/${event.slug}`}>
                    <span aria-hidden="true" className="z-10 absolute inset-0" />
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
                <div className='absolute top-0 left-0 w-full min-h-full bg-gradient-to-t from-black/60 to-black/20' />

                {/* Upperside of the card */}
                <div className="absolute flex items-center justify-between top-2 w-[97%] left-2 py-0.5 px-1">
                    <div className='bg-white top-2 left-2 w-max py-0.5 px-2 rounded-md'>
                        <div className='flex flex-col justify-start items-center '>
                            <p className="text-xl font-bold">{formattedDate.split(' ')[1]}</p>
                            <p className="-mt-1.5 tracking-tighter text-xs font-light uppercase">{formattedDate.split(' ')[0]}</p>
                        </div>
                    </div>
                    <div className="z-10">
                        <RedirectOrFetcher route={`/events/toggle-like/${event.slug}`}>
                            <button title="Add to favourites" className='bg-white top-2 left-2 w-max py-2 px-2 rounded-full hover:scale-110 transition'>
                                <Heart
                                    className={`${event.liked && 'text-destructive fill-current'}`}
                                    strokeWidth={1.5} size={20} />
                            </button>
                        </RedirectOrFetcher>
                    </div>

                </div>

                {/* Added top-0 and left-0 to position the overlay */}
                <div className='absolute bottom-0 left-0 w-full text-white p-2'>
                    <div className="flex items-center gap-1">
                        <MapPin strokeWidth={1.5} size={14} /> <span className='font-light text-sm capitalize'>{event.city}, {event.country}</span>
                    </div>

                    <div className="text-xl leading-6 font-semibold tracking-tighter mb-1">{event.title}</div>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className="flex items-center text-xs">
                    <CustomAvatar
                        name={event.organiser.organiserName || ""}
                        styles='size-8 text-[10px]'
                    />
                    <span className='font-medium tracking-tight me-2'>
                        {event.organiser.organiserName}
                    </span>
                    <span className='font-bold tracking-tight bg-gray-300 text-white uppercase px-1 py-0.5 rounded text-[10px] mr-2'>
                        {event.eventType}
                    </span>
                    <span title='Verified Partner'>
                        <Crown className='text-amber-500 fill-current size-3.5' />
                    </span>
                </div>

                <div className='flex items-center gap-3'>
                    <div className="flex items-center gap-1 text-xs">
                        <Heart className='size-4 fill-gray-400 text-gray-400' />
                        <span className='text-gray-700'>{event.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                        <Eye className='size-4 text-gray-400' />
                        <span className='text-gray-700'>{event.views}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}