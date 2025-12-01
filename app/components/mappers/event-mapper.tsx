import EventCard from "../cards/event-card";
import EmptyState from "../skeletons/empty-state";

export default function EventsMapper({ events }: { events: OrganiserEvent[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 pb-5s">
            {events.length ? events.map((ev) => <EventCard event={ev} key={ev.slug} />) : <EmptyState resource="events" />}
        </div>
    )
}