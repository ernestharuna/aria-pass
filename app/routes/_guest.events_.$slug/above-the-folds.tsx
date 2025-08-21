import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Rating from "~/components/custom/rating";
import { Calendar, Globe } from "lucide-react";
import { STORAGE_URL } from "~/config/defaults";
import dayjs from "dayjs";
import { Link } from 'react-router';

export default function AboveTheFolds({ event }: { event: OrganiserEvent }) {

    let banner = event.bannerUrl
        ? `${STORAGE_URL}/${event.bannerUrl}`
        : "/images/banners/default-course-img.png"
    return (
        <div>
            <section
                className="bg-muted py-20 hidden lg:block"
                style={{
                    backgroundImage: `linear-gradient(90deg, #16161dce ,#16161D), url(${banner})`,
                    backgroundSize: 'cover, cover',
                    backgroundPosition: 'center, center',
                }}
            >
                <div className="container flex items-center mt-8 gap-10">
                    <div className="flex flex-1 flex-col gap-6 items-start text-white">
                        <h1 className="text-xl md:text-5xl font-bold leading-14 font-serif tracking-tighter">
                            {event.title}
                        </h1>
                        <p className='text-xl'>{event.description}</p>
                        <div className="flex items-center gap-2 font-semibold">
                            <span className="text-primary-theme">5.0</span>
                            <Rating />
                            <span>(20+ ratings) 25+ students</span>
                        </div>
                        <div className='flex items-center'>
                            <div className="flex items-center gap-2">
                                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring *:data-[slot=avatar]:grayscale">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                                        <AvatarFallback>LR</AvatarFallback>
                                    </Avatar>
                                    <Avatar>
                                        <AvatarImage
                                            src="https://github.com/evilrabbit.png"
                                            alt="@evilrabbit"
                                        />
                                        <AvatarFallback>ER</AvatarFallback>
                                    </Avatar>
                                </div>
                                <div className="text-white font-light text-xs">+200 Attending</div>
                            </div>
                        </div>
                        <div>
                            Created by {" "}
                            <Link to="#creator" className="text-primary-theme underline underline-offset-2">
                                {event.organiser?.organiserName}
                            </Link>
                        </div>
                        <div className="flex gap-6 items-center">
                            <div className="flex gap-2 items-center">
                                <Calendar strokeWidth={1} size={18} />{" "}
                                <span>
                                    Last updated {" "}
                                    {event.updatedAt
                                        ? dayjs(event.updatedAt).format("MM/YYYY")
                                        : dayjs(event.createdAt).format("MM/YYYY")
                                    }
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Globe strokeWidth={1} size={18} />{" "}
                                <span>English, International</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white flex-1 w-full shadow-2xl rounded-md aspect-video overflow-hidden">
                        <img
                            src={event.bannerUrl
                                ? `${STORAGE_URL}/${event.bannerUrl}`
                                : "/images/banners/default-course-img.png"}
                            alt={event.title}
                            className="h-auto w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className='lg:hidden'>
                <div className="bg-slate-100 col-span-1 md:col-span-4 h-60 w-full aspect-video group-hover:opacity-75 lg:h-auto overflow-hidden">
                    <img
                        src={event.bannerUrl
                            ? `${STORAGE_URL}/${event.bannerUrl}`
                            : "/images/banners/default-course-img.png"}
                        alt={event.title}
                        className="h-60 w-full object-cover"
                    />
                </div>

                <div className='container mt-7'>
                    <div className="flex flex-col gap-3 items-start mb-14">
                        <h1 className="text-2xl md:text-3xl font-bold font-serif tracking-tighter">
                            {event.title}
                        </h1>
                        <p className='text-base'>
                            {event.description}
                        </p>
                        <div className="mt-3 flex text-sm items-center gap-2 font-semibold">
                            <span className="text-primary-theme">5.0</span>
                            <Rating />
                            <span>(20+ ratings) 25+ students</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring *:data-[slot=avatar]:grayscale">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                                    <AvatarFallback>LR</AvatarFallback>
                                </Avatar>
                                <Avatar>
                                    <AvatarImage
                                        src="https://github.com/evilrabbit.png"
                                        alt="@evilrabbit"
                                    />
                                    <AvatarFallback>ER</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="text-white font-light text-xs">+200 Attending</div>
                        </div>
                        <div className='text-sm mb-4'>
                            Created by {" "}
                            <Link to="#creator" className="text-primary-theme underline underline-offset-2">
                                {event.organiser.organiserName}
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex gap-2 items-center">
                                <Calendar strokeWidth={1} size={20} />{" "}
                                <span>
                                    Last updated {" "}
                                    {event.updatedAt
                                        ? dayjs(event.updatedAt).format("MM/YYYY")
                                        : dayjs(event.createdAt).format("MM/YYYY")
                                    }
                                </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Globe strokeWidth={1} size={20} />{" "}
                                <span>
                                    English, International
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
