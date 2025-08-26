import { ArrowDownNarrowWide, Ban, Check, SquarePen, X } from "lucide-react";
import { useSearchParams } from "react-router";

// ! I can add other types here and filter them based on the props coming in, this will be the default filter
const STATUS_FILTERS = [
    {
        label: "Published",
        icon: <Check size={16} strokeWidth={1.3} />,
    },
    {
        label: "Draft",
        icon: <SquarePen size={16} strokeWidth={1.3} />,
    },
    {
        label: "Suspended",
        icon: <Ban size={16} strokeWidth={1.3} />,
    },
    {
        label: "Cancelled",
        icon: <X size={16} strokeWidth={1.3} />,
    },
]

export default function RecordFilter() {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="flex items-center gap-3 overflow-x-auto">
            <button
                onClick={() => {
                    setSearchParams((prev) => {
                        prev.delete('status');
                        return prev;
                    });
                }}
                className={`
                        ${!searchParams.get('status') && 'bg-stone-700 text-white'}
                        rounded-full text-nowrap  ps-1.5 pe-2.5 py-1 bg-stone-200 flex items-center gap-1 text-xs hover:bg-stone-300 transition cursor-pointer`
                }
            >
                <ArrowDownNarrowWide size={16} strokeWidth={1.3} /> <span className="font-medium">All</span>
            </button>

            {STATUS_FILTERS.map((filter) => (
                <button
                    onClick={() => setSearchParams({ status: filter.label.toLowerCase() })}
                    key={filter.label}
                    className={`
                        ${searchParams.get('status') === filter.label.toLocaleLowerCase() && 'bg-stone-700 text-white curs'}
                        rounded-full text-nowrap ps-1.5 pe-2.5 py-1 bg-stone-200 flex items-center gap-1 text-xs hover:bg-stone-300 transition cursor-pointer`
                    }
                >
                    {filter.icon} <span className="font-medium">{filter.label}</span>
                </button>
            ))}
        </div>
    )
}