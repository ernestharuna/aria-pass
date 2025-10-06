import { Bookmark, Crown, Eye, Heart, MapPin } from 'lucide-react';
import dayjs from 'dayjs';
import { STORAGE_URL } from '~/config/defaults';
import { Link } from 'react-router';
import RedirectOrFetcher from '../navigation/like-event';
import CustomAvatar from '../custom/custom-avatar';
import { isPastEventDate } from '~/lib/utils';


export default function EventCard({ event, index }: { event: OrganiserEvent, index?: number }) {
    const formattedDate = dayjs(event.date).format('MMM DD').toUpperCase();

    return (
        <div key={index} className="bg-white border-gray-100 flex flex-col gap-1 group">
            {/* event banner */}
            <div className="relative bg-gray-100 rounded-md group-hover:opacity-85 overflow-hidden transition h-90">
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
                <div className="absolute flex items-start justify-between top-2 w-[100%] left-0 right-0 py-0.5 px-2.5">
                    <div className='bg-white/60 w-max py-1 px-2 rounded'>
                        <div className='flex flex-col justify-start items-center'>
                            <p className="text-2xl tracking-tighter font-bold">{formattedDate.split(' ')[1]}</p>
                            <p className="-mt-1.5 tracking-tighter text-sm font-light uppercase">{formattedDate.split(' ')[0]}</p>
                        </div>
                    </div>
                    <div className='z-10'>
                        <RedirectOrFetcher route={`/events/toggle-like/${event.slug}`}>
                            <button title="Add to favourites" className='bg-white/70 w-max py-4 px-2 rounded hover:scale-110  hover:bg-white transition'>
                                <Bookmark
                                    className={`${event.liked && 'text-destructive fill-current size-'}`}
                                    strokeWidth={1.5}
                                />
                            </button>
                        </RedirectOrFetcher>
                    </div>
                </div>

                {/* Added top-0 and left-0 to position the overlay */}
                <div className='absolute bottom-0 left-0 w-full text-white p-2'>
                    {event.status === 'completed' && (
                        <div className='bg-gray-800 font-bold text-white text-xs px-3 py-3 rounded-md w-max mb-1'>
                            {isPastEventDate(event.date, event.startTime) ? 'EVENT ENDED' : 'SOLD OUT'}
                        </div>
                    )}
                    <div className="flex items-center gap-1 mb-1">
                        <MapPin strokeWidth={2} size={14} />
                        <span className='font-light text-sm capitalize'>
                            {event.city}, {event.country}
                        </span>
                    </div>

                    <div className="text-xl leading-6 font-semibold tracking-tighter mb-1">
                        {event.title}
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between w-full max-w-full overflow-hidden'>
                <div className="flex items-center text-xs min-w-0">
                    <CustomAvatar
                        name={event.organiser.organiserName || ""}
                        styles='size-8'
                    />
                    <span className='font-medium tracking-tight text-nowrap truncate max-w-[8rem]'>
                        {event.organiser.organiserName}
                    </span>
                    <span title='Verified Partner' className='mx-0.5'>
                        <Crown className='text-amber-500 fill-current size-3.5' />
                    </span>
                    <span className='font-bold tracking-tight bg-gray-300 text-gray-800 uppercase px-1 py-0.5 rounded text-[10px] ms-2'>
                        {event.eventType}
                    </span>
                </div>

                <div className='flex items-center gap-3 shrink-0'>
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