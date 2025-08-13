import EventCard from '~/components/cards/event-card'

export default function Dashboard() {
    return (
        <div>
            <section className="py-10">
                <h1 className='text-xl md:text-2xl font-semibold tracking-tight'>Upcoming Events</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-10 justify-start">
                    {Array.from({ length: 4 }).map((track, index) => (
                        <EventCard key={index} track={track} index={index} />
                    ))}
                </div>
            </section>
        </div>
    )
}
