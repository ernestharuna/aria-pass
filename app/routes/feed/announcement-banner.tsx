import { ArrowRight, Music, X } from 'lucide-react'

export default function AnnouncementBanner() {
    return (
        <section className="bg-[#F1F2F9] py-4 relative">
            <div className="container mx-auto font-light w-max text-sm flex gap-2 items-center">
                <Music size={16} />
                <span>Music theory courses coming soon to AriaPass. <b className="font-bold">Get Notified <ArrowRight size={14} className="inline-block -top-[2px] left-1 relative" /></b></span>
            </div>

            <X size={16} strokeWidth={3} className="absolute top-5 right-18" />
        </section>
    )
}
