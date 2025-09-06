import { Await, Link, redirect } from "react-router";
import { BrMd } from "~/components/utility/line-break";
import { ArrowRight, ChevronLeft, ChevronRight, Crown, Piano, UsersRound, UserStar } from "lucide-react";
import SearchBar from "~/components/utility/search-bar";
import { FeedFilter } from "~/components/utility/feed-filter";
import { Button } from "~/components/ui/button";
// import StackedSwipeDeck from "~/components/cards/stacked-swipe-deck";
import type { Route } from "../_guest._index/+types/route";
import { Suspense, useState } from "react";
import EventCardSkeleton from "~/components/skeletons/events-card-skeleton";
import client from "~/http/client";
import EventsMapper from "~/components/mappers/event-mapper";
import { STORAGE_URL } from "~/config/defaults";

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

// const sample = [
//     { id: 1, title: "Beethoven: Symphony No.5", subtitle: "Royal Hall • London", image: "/images/event-flyer.jpg" },
//     { id: 2, title: "Verdi: Requiem", subtitle: "Opera House • Milan", image: "/images/event-flyer.jpg" },
//     { id: 3, title: "Mozart: Piano Recital", subtitle: "Concert Hall • Berlin", image: "/images/event-flyer.jpg" },
//     { id: 4, title: "Brahms: Chamber Night", subtitle: "Studio • New York", image: "/images/event-flyer.jpg" },
// ];

export default function Home({ loaderData }: Route.ComponentProps) {
    const { events }: { events: Promise<OrganiserEvent[]> } = loaderData;

    return (
        <div className="fadeIn animated">
            <div className="relative isolate px-6 pt-5 lg:px-8 -z-10">
                <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }} className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-100 to-indigo-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
            </div>
            <header className="flex flex-col gap-5 lg:min-h-[65vh]">
                <section className="container flex justify-between gap-20 items-center my-16">
                    <div className="lg:basis-7/12 text-center md:text-start overflow-auto">
                        <h1 className="text-3xl md:text-5xl font-serif font-normal md:leading-13 text-primary tracking-tighter">
                            Experience the <BrMd /> Community Behind the Concerts
                        </h1>
                        <p className="text-primary tracking-tight text-sm md:text-base mt-5 leading-5">
                            Discover events, book tickets, and connect with fellow music <BrMd /> enthusiasts on AriaPass — your gateway to unforgettable musical experiences.
                        </p>

                        <div className="mt-10 flex flex-col items-start gap-3 ">
                            <div className="flex gap-4 items-stretch mx-auto md:mx-0">
                                <Link to="/events" className="flex gap-1.5 items-center py-3 px-4 font-medium text-sm rounded-full bg-[#3A3546] text-white ">
                                    <Piano size={16} /> <span>Events</span>
                                </Link>
                                <Link to="/organisers" className="flex gap-1.5 items-center py-3 px-4 font-medium text-sm rounded-full hover:bg-gray-50">
                                    <UsersRound size={16} /> <span>Organisers</span>
                                </Link>
                                <Link to="/artists" className="flex gap-1.5 items-center py-3 px-4 font-medium text-sm rounded-full hover:bg-gray-50">
                                    <UserStar size={16} /> <span>Artists</span>
                                </Link>
                            </div>

                            <div className="w-full ">
                                <div className="mb-4">
                                    <SearchBar />
                                </div>

                                <div className="flex items-center gap-3 overflow-x-auto">
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

                    {/* Event Banners */}
                    <div className="hidden lg:block lg:basis-5/12">
                        <div className="h-100 w-full bg-gray-50 rounded-3xl border overflow-hidden relative">
                            <Suspense fallback={<div className="h-100 w-full bg-gray-200 animate-pulse" />}>
                                <Await resolve={events}>
                                    {(events) => {
                                        const [index, setIndex] = useState(0);

                                        const handlePrev = () => {
                                            setIndex(i => (i - 1 + events.length) % events.length);
                                        };

                                        const handleNext = () => {
                                            setIndex(i => (i + 1) % events.length);
                                        };

                                        return (
                                            <>
                                                {events.length > 0 && (
                                                    <>
                                                        {/* Overlay background */}
                                                        <div className='absolute top-0 left-0 w-full min-h-full bg-gradient-to-t from-black/50 to-black/10' />
                                                        <img
                                                            src={events[index].bannerUrl && `${STORAGE_URL}/${events[index].bannerUrl}`}
                                                            alt={events[index].title}
                                                            className="h-full w-full object-cover"
                                                            loading="lazy"
                                                        />
                                                        <button
                                                            title="Previous"
                                                            onClick={() => handlePrev()}
                                                            className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white/50 rounded-full text-gray-800 hover:bg-white transition-colors"
                                                        >
                                                            <ChevronLeft />
                                                        </button>
                                                        <button
                                                            title="Next"
                                                            onClick={() => handleNext()}
                                                            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white/50 rounded-full text-gray-800 hover:bg-white transition-colors"
                                                        >
                                                            <ChevronRight />
                                                        </button>
                                                        <div className="absolute bottom-5 right-5 py-2 px-3 rounded-full bg-white text-xs shadow-lg flex items-center gap-1">
                                                            {events[index].organiser.organiserName} <Crown className="inline-block h-4 w-4 fill-amber-500 text-amber-500" />
                                                        </div>

                                                    </>
                                                )}
                                            </>
                                        )
                                    }}
                                </Await>
                            </Suspense>
                        </div>
                    </div>
                </section>
            </header>

            <main>
                <div className="hidden container lg:flex items-center justify-between mb-8">
                    <FeedFilter />
                    <div className="flex gap-4 items-center">
                        {["All", "Choral", "Ensemble", "Church Music", "Recitals", "Chamber"].map((item) => (
                            <Link
                                to={""}
                                key={item}
                                className={`rounded-full py-2 px-4 hover:bg-stone-100 text-sm font-medium tracking-tight ${item === "All" && "bg-[#F8F7F4] text-primary"}`}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                    <Link to={"/my-events/new"}>
                        <Button variant={"secondary"} className="cursor-pointer rounded-full flex justify-between gap-2 px-5">
                            <span>Create Event</span>
                            <ChevronRight />
                        </Button>
                    </Link>
                </div>

                <div className="lg:hidden mb-4">
                    <div className="container flex justify-between items-center">
                        <FeedFilter />
                        <Link to={"/my-events/new"}>
                            <Button variant={"secondary"} className="cursor-pointer rounded-full flex justify-between gap-2 h-10">
                                <span>Create Event</span>
                                <ChevronRight />
                            </Button>
                        </Link>
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

                <Link to={"events"} className="block mx-auto w-max mt-3">
                    <Button variant={"outline"} className="py-5 px-10 rounded-full">
                        See more <ArrowRight />
                    </Button>
                </Link>

                {/* <div className="md:hidden flex items-center justify-center py-10">
                    <StackedSwipeDeck
                        initialCards={sample}
                        width={350}
                        height={520}
                        onSwipe={(card, dir) => console.log("swiped", card.title, dir > 0 ? "right" : "left")}
                    />
                </div> */}
                {/* Events End ---------------------------------------------- */}

                <hr className="mt-10" />

                <div className="container mt-10">
                    <div
                        className="h-80 rounded-4xl py-6 px-8 my-10 flex flex-col justify-center"
                        style={{
                            backgroundImage: `linear-gradient(90deg, #FAF9FB, #FAF9FB00), url('/images/ensemble-banner.png')`,
                            backgroundSize: 'cover, cover',
                            backgroundPosition: 'center, center',
                        }}
                    >
                        <div className="">
                            <h2 className="text-3xl font-semibold tracking-tighter mb-4">
                                Get more leads, <br className="md:hidden" />  Pay no fees
                            </h2>
                            <p className="font-light text-sm mb-10">Rank higher, skip the fees, and level up your profile — all <BrMd /> for $0/month.</p>

                            <Link to={"/organiser-request"}>
                                <Button className="w-full md:w-max rounded-full px-10 py-6">
                                    Become an Organiser
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

        </div >
    );
}

