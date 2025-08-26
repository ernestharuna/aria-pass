import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = "What type of design are you interested in?",
    onSearch,
}) => {
    const [query, setQuery] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center bg-gray-200/50 backdrop-blur-3xl rounded-full overflow-hidden"
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-4 py-4 bg-transparent text-gray-700 focus:outline-none placeholder:text-sm placeholder:text-gray-700 placeholder:font-light"
            />
            <button
                type="submit"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-theme hover:bg-primary text-white mr-2 transition-colors"
            >
                <Search size={20} strokeWidth={2.5}/><span className="hidden">"</span>
            </button>
        </form>
    );
};

export default SearchBar;
