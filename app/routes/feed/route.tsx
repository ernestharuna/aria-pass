import { Link } from "react-router";
import type { Route } from "../+types/layout";
import AnnouncementBanner from "./announcement-banner";
import { BrMd } from "~/components/utility/line-break";
import { ChevronRight, LibraryBig, Piano, UsersRound } from "lucide-react";
import CustomAvatar from "~/components/custom/custom-avatar";
import SearchBar from "./search-bar";
import { FeedFilter } from "./feed-filter";
import EventCard from "~/components/cards/event-card";
import { Button } from "~/components/ui/button";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Aria Pass | Concerts, Exams, Courses, Tickets" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="fadeIn animated">
      <header className="flex flex-col gap-5 min-h-[65vh]">
        <AnnouncementBanner />

        <section className="container flex justify-between gap-40 items-center mt-5">
          <div className="flex-1">
            <h1 className="text-5xl font-semibold leading-13 text-[#0D0C22] -tracking-normal first:mt-0">Experience the Community <BrMd /> Behind the Concerts</h1>
            <p className="text-[#0D0C22] text-sm mt-5">
              Explore work from the most talented and accomplished <BrMd /> designers ready to take on your next project.
            </p>

            <div className="mt-10 flex flex-col items-start gap-3">
              <div className="flex gap-4 items-stretch">
                <Link to="" className="flex gap-1.5 items-center py-3 px-4 font-medium text-sm rounded-full bg-[#3A3546] text-white ">
                  <Piano size={16} /> <span>Events</span>
                </Link>
                <Link to="" className="flex gap-1.5 items-center py-3 px-4 font-medium text-sm rounded-full hover:bg-gray-50">
                  <LibraryBig size={16} /> <span>Theory & Exams</span>
                </Link>
                <Link to="" className="flex gap-1.5 items-center py-3 px-4 font-medium text-sm rounded-full hover:bg-gray-50">
                  <UsersRound size={16} /> <span>Organisers</span>
                </Link>
              </div>

              <div className="w-full">
                <div className="mb-4">
                  <SearchBar />
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-xs">Popular:</span>
                  {["Free ticket", "Christmas Carol", "Concert", "Classical"].map((item) => (
                    <Link to={'?' + item.toLowerCase()} className="px-4 py-1.5 border border-gray-200 text-xs font-light rounded-full hover:bg-gray-50">
                      {item.toLowerCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:inline-block w-[650px] h-[450px]">
            <div className="bg-gray-200 rounded-3xl relative w-[650px] h-[450px]">
              <span className="absolute bottom-5 right-5 shadow-md rounded-full flex items-center bg-white pe-3">
                <CustomAvatar styles="h-10 w-10 text-xs" /> <span className="font-semibold text-xs">John Ode Choral</span>
              </span>
            </div>
          </div>
        </section>
      </header>

      <main>
        <div className="container flex items-center justify-between mb-8">
          <FeedFilter />

          <div className="flex gap-4 items-center">
            {["Choral", "Ensemble", "Church Music", "Recitals", "Classical Band", "Chamber"].map((item) => (
              <Link to={""} className="rounded-full py-2 px-4 hover:bg-stone-100 text-sm font-medium tracking-tight">{item}</Link>
            ))}
          </div>
          <Button variant={"secondary"} className="rounded-full flex justify-between gap-2 px-5">
            <span>Create Event</span>
            <ChevronRight />
          </Button>

        </div>

        <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-5">
          {Array.from({ length: 4 }).map((track, index) => (
            <EventCard key={index} track={track} index={index} />
          ))}
        </div>

        <div
          className="container rounded-3xl py-6 px-8 my-10"
          style={{
            backgroundImage: `linear-gradient(90deg, #FAF9FB, #FAF9FB00),
            url('/images/ensemble-banner.png')`,
            backgroundSize: 'cover, cover',
            backgroundPosition: 'center, center',
          }}
        >
          <div>
            <div className="h-10 w-10 rounded-full bg-[#F6A700] mb-3" />
            <h2 className="text-xl font-bold mb-2">Get more leads, pay no fees</h2>
            <p className="font-light text-xs mb-3">Rank higher, skip the fees, and level up your profile — all <br /> for $8/month.</p>

            <Button className="rounded-full px-10">
              Become an Organiser
            </Button>
          </div>
        </div>

        <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-5">
          {Array.from({ length: 4 }).map((track, index) => (
            <EventCard key={index} track={track} index={index} />
          ))}
        </div>
      </main>

    </div>
  );
}

