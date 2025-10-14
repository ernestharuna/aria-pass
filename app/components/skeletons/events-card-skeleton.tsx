export default function EventCardSkeleton({ type }: { type?: "user" | "organiser" }) {
    if (type === "user") {
        return (
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-5 sm:grid-cols-3 xl:gap-x-6 mb-5 animated fadeIn">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-[20rem] md:h-[25rem] bg-gray-100 animate-pulse rounded-lg" />
                ))}
            </div>
        )
    } else {
        return (
            <div className="flex flex-col gap-4 animated fadeIn min-h-[300px]">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex-1 min-h-[8rem] w-full bg-gray-100 animate-pulse rounded-lg" />
                ))}
            </div>
        )
    }
}

