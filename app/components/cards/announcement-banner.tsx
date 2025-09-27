import { ArrowRight, Megaphone, Music, Ticket, X } from 'lucide-react'
import { useState } from 'react'

export default function AnnouncementBanner() {
    const [open, setOpen] = useState(true);

    return (
        <>
            {open && (
                <section className="bg-[#F1F2F9] py-2 relative">
                    <div className="container mx-auto font-light md:w-max text-xs flex gap-2 items-center">
                        <Megaphone size={18} className='fill-amber-500' strokeWidth={0}/>
                        <span>We've sold 100+ tickets in two (2) weeks 🎉</span>
                    </div>

                    <X size={16} strokeWidth={3} className="absolute md:top-3.5 top-2 md:right-18 right-2" onClick={() => setOpen(false)} />
                </section>
            )}
        </>
    )
}
