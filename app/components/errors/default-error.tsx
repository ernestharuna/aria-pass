import { isRouteErrorResponse } from "react-router";
import { Button } from "../ui/button";
import { ArrowLeft, RotateCw } from "lucide-react";

export default function DefaultError({ error }: { error: unknown }) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="w-full max-w-5xl container -translate-x-1/2 -translate-y-1/2 fixed left-1/2 top-1/2 transform">
            <h1 className="text-primary font-bold">{message}</h1>
            <p className="text-primary text-sm font-light">{details}</p>
            {stack && (
                <pre className="p-4 text-gray-400 max-w-4/5 overflow-x-auto text-xs">
                    <code>{stack}</code>
                </pre>
            )}

            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-5 mt-8">
                <Button
                    onClick={() => window.history.back()}
                    variant={"outline"}
                    className="rounded-full h-8 text-sm md:py-4 py-5 flex items-center gap-1">
                    <ArrowLeft size={18} /> <span>Back</span>
                </Button>

                <Button
                    onClick={() => window.location.reload()}
                    className="rounded-full h-8 text-sm text-white px-10 md:py-4 py-5 flex items-center gap-1"
                >
                    <span>Reload</span> <RotateCw size={18} />
                </Button>
            </div>
        </main>
    );
}