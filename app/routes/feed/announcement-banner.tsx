import { ArrowRight, Music, X } from 'lucide-react'

export default function AnnouncementBanner() {
    return (
        <section className="bg-[#F1F2F9] py-3 relative">
            <div className="container mx-auto font-light md:w-max text-sm flex gap-3 items-start">
                <Music size={18} className='mt-1 md:mt-0' />
                <span>Music theory courses coming soon to AriaPass. <br className='md:hidden' /> <b className="font-bold inline-block mt-1 md:mt-0">Get Notified <ArrowRight size={14} className="inline-block -top-[2px] left-1 relative" /></b></span>
            </div>

            <X size={16} strokeWidth={3} className="absolute md:top-3.5 top-2 md:right-18 right-2" />
        </section>
    )
}
