import { Await, Link, redirect } from "react-router";
import { BrMd } from "~/components/utility/line-break";
import { ChevronRight, LibraryBig, Piano, UsersRound } from "lucide-react";
import SearchBar from "~/components/utility/search-bar";
import { FeedFilter } from "~/components/utility/feed-filter";
import { Button } from "~/components/ui/button";
import StackedSwipeDeck from "~/components/cards/stacked-swipe-deck";
import type { Route } from "../_guest._index/+types/route";
import { Suspense } from "react";
import EventCardSkeleton from "~/components/skeletons/events-card-skeleton";
import client from "~/http/client";
import EventsMapper from "~/components/mappers/event-mapper";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Aria Pass | Concerts, Exams, Courses, Tickets" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

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

const sample = [
    { id: 1, title: "Beethoven: Symphony No.5", subtitle: "Royal Hall • London", image: "/images/event-flyer.jpg" },
    { id: 2, title: "Verdi: Requiem", subtitle: "Opera House • Milan", image: "/images/event-flyer.jpg" },
    { id: 3, title: "Mozart: Piano Recital", subtitle: "Concert Hall • Berlin", image: "/images/event-flyer.jpg" },
    { id: 4, title: "Brahms: Chamber Night", subtitle: "Studio • New York", image: "/images/event-flyer.jpg" },
];

export default function Home({ loaderData }: Route.ComponentProps) {
    const { events }: { events: Promise<OrganiserEvent[]> } = loaderData;

    return (
        <div className="fadeIn animated">
            <header className="flex flex-col gap-5 md:min-h-[65vh]">
                <section className="container flex justify-between gap-40 items-center my-16">
                    {/* Overflow hidden is here to prevent mobile horizontal scrolling */}
                    <div className="md:flex-1 text-center md:text-start overflow-hidden">
                        <h1 className="text-3xl md:text-5xl font-semibold md:leading-13 text-primary tracking-tight">Experience the <BrMd /> Community Behind the Concerts</h1>
                        <p className="text-primary text-base mt-5 leading-5">
                            Explore work from the most talented and accomplished <BrMd /> designers ready to take on your next project.
                        </p>

                        <div className="mt-10 flex flex-col items-start gap-3 ">
                            <div className="flex gap-4 items-stretch mx-auto md:mx-0">
                                <Link to="" className="flex gap-1.5 items-center py-3 px-4 font-medium text-sm rounded-full bg-[#3A3546] text-white ">
                                    <Piano size={16} /> <span>Events</span>
                                </Link>
                                <Link to="" className="flex gap-1.5 items-center py-3 px-4 font-medium text-sm rounded-full hover:bg-gray-50">
                                    <LibraryBig size={16} /> <span>Theory <span className="hidden md:inline-block">& Exams</span></span>
                                </Link>
                                <Link to="" className="flex gap-1.5 items-center py-3 px-4 font-medium text-sm rounded-full hover:bg-gray-50">
                                    <UsersRound size={16} /> <span>Organisers</span>
                                </Link>
                            </div>

                            <div className="w-full ">
                                <div className="mb-4">
                                    <SearchBar />
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-xs">Popular:</span>
                                    {["Free ticket", "Christmas Carol", "Concert", "Classical"].map((item, index) => (
                                        <Link to={'?' + item.toLowerCase()} key={item + index} className="text-nowrap px-4 py-1.5 border border-gray-200 text-xs font-light rounded-full hover:bg-gray-50">
                                            {item.toLowerCase()}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center justify-center">
                        <StackedSwipeDeck
                            initialCards={sample}
                            width={650}
                            height={450}
                            onSwipe={(card, dir) => console.log("swiped", card.title, dir > 0 ? "right" : "left")}
                        />
                    </div>
                </section>
            </header >

            <main>
                <div className="hidden container md:flex items-center justify-between mb-8">
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

                <div className="md:hidden mb-4">
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
                <div className="hidden container md:block">
                    <Suspense fallback={<EventCardSkeleton type='user' />}>
                        <Await resolve={events}>
                            {(events) => <EventsMapper events={events} />}
                        </Await>
                    </Suspense>
                </div>

                <div className="md:hidden flex items-center justify-center py-10">
                    <StackedSwipeDeck
                        initialCards={sample}
                        width={350}
                        height={520}
                        onSwipe={(card, dir) => console.log("swiped", card.title, dir > 0 ? "right" : "left")}
                    />
                </div>
                {/* Events End ---------------------------------------------- */}

                <hr className="mt-10"/>


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

        </div >
    );
}

