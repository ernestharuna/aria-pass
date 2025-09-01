import { Suspense } from 'react'
import { Await, Link, redirect, type MetaFunction } from 'react-router';
import type { Route } from '../_guest.events/+types/route';
import client from '~/http/client';
import EventCardSkeleton from '~/components/skeletons/events-card-skeleton';
import EventsMapper from '~/components/mappers/event-mapper';
import { ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { FeedFilter } from '~/components/utility/feed-filter';

export const meta: MetaFunction = () => {
    const title = "Events | AriaPass - Discover the community behind the concerts";
    const description = "AriaPass is a new way to experience live events. Discover and connect with other fans, plan meetups before concerts, and organize your event tickets with a community of music lovers. A product of OwenaHub Collective.";
    const imageUrl = "https://ariapass.owenahub.com/images/banners/app_banner.png";
    const url = "https://ariapass.owenahub.com";

    return [
        // Standard Meta Tags
        { title: title },
        { name: "description", content: description },
        { name: "theme-color", content: "#625DF5" },
        { name: "keywords", content: "concert community, music events, fan meetups, social ticketing, event organization, AriaPass, OwenaHub" },
        { name: "author", content: "OwenaHub Collective" },
        { name: "robots", content: "index, follow" },

        // Open Graph (Facebook, LinkedIn)
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: imageUrl },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@owenahub" }, // Optional: Add your Twitter handle
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: imageUrl },
    ];
};

export async function clientLoader(_: Route.ClientLoaderArgs) {
    try {
        const getEvents = async (): Promise<OrganiserEvent[]> => {
            const response = await client.get('/api/events');
            return response.data
        }

        const events = getEvents();
        return { events }
    } catch ({ response }: any) {
        return redirect('/');
    }
}

export default function Events({ loaderData }: Route.ComponentProps) {
    const { events }: { events: Promise<OrganiserEvent[]> } = loaderData;

    return (
        <main>
            <div className='container py-10 flex flex-col gap-2'>
                <h1 className='text-2xl font-semibold tracking-tighter'>All Events</h1>
                <p className='text-sm text-gray-500 font-light'>Showing all events</p>
            </div>

            <div className="hidden container lg:flex items-center justify-between mb-8">
                <FeedFilter />
                <div className="flex gap-4 items-center">
                    {["Choral", "Ensemble", "Church Music", "Recitals", "Classical Band", "Chamber"].map((item) => (
                        <Link to={""} key={item} className="rounded-full py-2 px-4 hover:bg-stone-100 text-sm font-semibold tracking-tight">{item}</Link>
                    ))}
                </div>
                <Button variant={"secondary"} className="rounded-full flex justify-between gap-2 px-5">
                    <span>Create Event</span>
                    <ChevronRight />
                </Button>
            </div>

            <div className="lg:hidden mb-4">
                <div className="container flex justify-between items-center">
                    <FeedFilter />
                    <Button variant={"secondary"} className="rounded-full flex justify-between gap-2 h-10">
                        <span>Create Event</span>
                        <ChevronRight />
                    </Button>
                </div>

                <hr className="mt-5 mb-2" />

                <div className="container flex gap-4 items-center overflow-x-auto">
                    {["Choral", "Ensemble", "Church Music", "Recitals", "Classical Band", "Chamber"].map((item) => (
                        <Link to={`?`} key={item} className="text-nowrap rounded-full py-2 px-4 hover:bg-stone-100 text-sm tracking-tight">{item}</Link>
                    ))}
                </div>
            </div>

            {/* Events ---------------------------------------------- */}
            <div className=" container block">
                <Suspense fallback={<EventCardSkeleton type='user' />}>
                    <Await resolve={events}>
                        {(events) => <EventsMapper events={events} />}
                    </Await>
                </Suspense>
            </div>
            {/* Events End ---------------------------------------------- */}

            <hr className="mt-10" />

            <div className="container mt-20">
                <div
                    className="h-80 rounded py-6 px-8 my-10 flex flex-col justify-center"
                    style={{
                        backgroundImage: `linear-gradient(90deg, #FAF9FB, #FAF9FB00), url('/images/ensemble-banner.png')`,
                        backgroundSize: 'cover, cover',
                        backgroundPosition: 'center, center',
                    }}
                >
                    <div className="">
                        <div className="h-10 w-10 rounded-full bg-[#F6A700] mb-3" />
                        <h2 className="text-xl font-bold mb-2">Get more leads, pay no fees</h2>
                        <p className="font-light text-xs mb-10">Rank higher, skip the fees, and level up your profile — all <br /> for $8/month.</p>

                        <Button className="rounded-full px-10">
                            Become an Organiser
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}
