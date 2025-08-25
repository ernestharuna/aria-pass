import { MapPin, Ticket } from 'lucide-react'
import Placeholder from '~/components/utility/placeholder'

export default function PreviewCard({ event, bannerImage }: { event?: any, bannerImage: any }) {
    return (
        <div className='lg:min-w-[400px] max-w-[400px] w-full'>
            <div className="bg-white border border-gray-100 flex flex-col gap-2 hover:shadow-lg rounded-lg group z-0! transition">
                {/* event banner */}
                <div className="z-0 relative bg-slate-100 rounded-t-lg w-full group-hover:opacity-75 aspect-square h-38 lg:h-50 overflow-hidden">
                    {bannerImage ? (
                        <img
                            src={bannerImage}
                            alt="Preview"
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    ) : ""}
                </div>

                {/* Content Wrapper */}
                <div className="flex items-stretch px-4 py-2">
                    <div className='flex flex-col leading-0 justify-start items-center '>
                        <p className="text-xl font-light uppercase">DEC</p>
                        <p className="-mt-2 text-3xl font-bold">24</p>
                    </div>

                    <div className="w-1 mx-4 border-e border-gray-400" />

                    <div className='flex flex-col pb-1 w-full'>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-1">
                                <MapPin strokeWidth={1.5} size={14} />
                                <span className='font-light text-sm capitalize'>
                                    {event.city || <Placeholder text='City' />}, {event.country || <Placeholder text='Country' />}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 mb-1 text-gray-600">
                                <span className="rounded-full px-2 py-1 font-medium text-xs bg-indigo-50 text-primary-theme">
                                    {event.event_type || "..."}
                                </span>
                            </div>
                        </div>
                        <div className="text-lg font-medium tracking-tighter">{event.title || <Placeholder text='Event title' />}</div>
                        <div className="text-xs font-light">{event.description || <Placeholder text='A Concise event description' />}</div>
                        <div className="text-[10px] flex items-center gap-2 mt-2">
                            <Ticket strokeWidth={1.5} size={14} />
                            <span className='font-light'>Start from <span className='font-semibold'>NGN 5,000</span> </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
