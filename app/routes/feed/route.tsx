import { BrMd } from "~/components/utility/line-break";
import type { Route } from "../+types/layout";
import { TypographyH1 } from "~/components/typography/typography-h1";
import { TypographyH2 } from "~/components/typography/typography-h2";
import EventCard from "~/components/cards/event-card";
import { TypographyLead } from "~/components/typography/typography-lead";
import { Button } from "~/components/ui/button";
import { BookCheck, ChevronRight, Piano, UsersRound } from "lucide-react";
import { Link } from "react-router";
import CustomAvatar from "~/components/custom/custom-avatar";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Aria Pass | Concerts, Exams, Courses, Tickets" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const tracks = [
  {
    image_path: "/images/event-flyer.jpg",
    title: "Mobile application developer",
    avgSalary: "400,000",
    openRoles: "500+",
    rating: 4.8,
    ratingCount: 97,
    hours: 50,
  },
  {
    image_path: "/images/event-flyer.jpg",
    title: "Fullstack Web developer",
    avgSalary: "400,000",
    openRoles: "500+",
    rating: 5.0,
    ratingCount: 97,
    hours: 40,
  },
  {
    image_path: "/images/event-flyer.jpg",
    title: "Tech project manager",
    avgSalary: "450,000",
    openRoles: "580+",
    rating: 4.9,
    ratingCount: 43,
    hours: 60,
  },
  {
    image_path: "/images/event-flyer.jpg",
    title: "Frontend Engineer",
    avgSalary: "250,000",
    openRoles: "820+",
    rating: 5.0,
    ratingCount: 99,
    hours: 60,
  },
  {
    image_path: "/images/event-flyer.jpg",
    title: "Frontend Engineer",
    avgSalary: "250,000",
    openRoles: "820+",
    rating: 5.0,
    ratingCount: 99,
    hours: 60,
  },
];

export default function Home() {
  return (
    <div className="fadeIn animated bg-gray-50">
      <header className="py-20">
        <div className="container text-center justify-center flex flex-col gap-10">
          <TypographyH1>Experience the Community <BrMd /> Behind the Concerts.</TypographyH1>

          <div className="flex justify-center gap-3 py-3 px-7 shadow rounded-full border border-[#F3F3F4] w-max mx-auto bg-white">
            <p className="">Tickets.</p>
            <p className="">Concerts.</p>
            <p className="">Recitals.</p>
            <p className="">Exams.</p>
            <p className="">Courses.</p>
          </div>
        </div>
      </header>

      <main className="mt-6">
        <section className="container pb-10">
          <TypographyH2>
            Upcoming Concerts
          </TypographyH2>

          <div className="mt-5 flex justify-between max-h-98">
            <div className="snap-x snap-mandatory flex overflow-x-auto gap-5 pb-5">
              {tracks.map((track, index) => (
                <EventCard key={index} track={track} index={index} />
              ))}
            </div>

            <div className="relative -top-50">
              <div className="bg-white rounded-lg border w-[450px] h-[700px] overflow-y-auto shadow-lg">
                <div className="p-3 flex gap-4 sticky top-0 bg-white z-10">
                  <Link to="#" className="rounded bg-sky-50 text-center text-xs text-sky-500 flex-1 py-2.5 px-4 flex items-center justify-center gap-2">
                    <Piano size={15} /> <span>Concerts</span>
                  </Link>
                  <Link to="#" className="rounded text-center text-xs text-gray-400 hover:bg-gray-50 flex-1 py-2.5 px-4 flex items-center justify-center gap-2">
                    <UsersRound size={15} /> <span>Organisers</span>
                  </Link>
                  <Link to="#" className="rounded text-center text-xs text-gray-400 hover:bg-gray-50 flex-1 py-2.5 px-4 flex items-center justify-center gap-2">
                    <BookCheck size={15} /> <span>Exams</span>
                  </Link>
                </div>

                <section>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div className="p-5 border-b">
                      <div className="flex gap-1.5 items-start mb-2">
                        <CustomAvatar styles="h-10 w-10 text-xs" />
                        <div>
                          <div className="font-semibold tracking-tight text-sm">Fire Keys Ensemble</div>
                          <div className="text-xs text-gray-400">Coming up on March 14, 2025</div>

                          <div className="text-xs tracking-tight my-3">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum repellat sequi aliquam ipsum aut, nihil accusantium enim est, maiores nostrum laboriosam ad dignissimos, facilis esse quis impedit quae aliquid soluta.
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-100 rounded-lg w-full group-hover:opacity-75 aspect-square lg:h-50 overflow-hidden">
                        <img
                          src="/images/event-flyer.jpg"
                          alt="Event Banner"
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>

                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-800">
          <div className="container py-20">
            <div className="text-white flex flex-col gap-4 items-start">
              <h2 className="scroll-m-20 pb-2 text-5xl font-semibold tracking-tight first:mt-0">
                Publish Events.
                Sell Tickets
              </h2>

              <TypographyLead>
                Sell Tickets with less than 2% commission.
              </TypographyLead>

              <Button className="flex gap-2 items-center bg-white text-black py-5 px-10! mt-5">
                <span>Become a Member</span><ChevronRight />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
