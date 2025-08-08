import { MapPin, Ticket } from 'lucide-react'

export default function EventCard({ track, index }: { track: any, index: number }) {
    return (
        <div>
            <div key={index} className="bg-white border border-gray-200 snap-center max-w-78 w-78 flex flex-col gap-2 hover:shadow-lg rounded group relative transition">
                {/* event banner */}
                <div className="bg-slate-100 shadow-md rounded-t w-full group-hover:opacity-75 aspect-square lg:h-50 overflow-hidden">
                    <img
                        src={track.image_path
                            ? `${track.image_path}`
                            : "/images/banners/default-course-img.png"}
                        alt={track.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Content Wrapper */}
                <div className="flex items-stretch px-4 py-2">
                    <div className='flex flex-col leading-0 justify-start items-center '>
                        <p className="text-xl font-light uppercase">DEC</p>
                        <p className="-mt-2 text-3xl font-bold">24</p>
                    </div>

                    <div className="w-1 mx-4 border-e border-gray-400" />

                    <div className='flex flex-col pb-1'>
                        <div className="flex items-center gap-1 mb-1">
                            <MapPin strokeWidth={1.5} size={14} /> <span className='font-light text-xs'>Nigeria</span>
                        </div>
                        <div className="text-lg font-semibold">Red Jazz Live</div>
                        <div className="text-xs font-light">Going hard this December with your favorite artises</div>
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
