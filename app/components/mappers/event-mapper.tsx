import EventCard from "../cards/event-card";
import EmptyState from "../skeletons/empty-state";

export default function EventsMapper({ events }: { events: OrganiserEvent[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 pb-5">
            {events.length ? events.map((ev) => <EventCard event={ev} key={ev.slug} />) : <EmptyState />}
        </div>
    )
}