export default function LoaderWithText({ text = 'loading' }: { text?: string }) {
    return (
        <div className="flex flex-col gap-2 items-center p-3">
            <p className="text-center italic tracking-tight text-md font-light capitalize">
                {text}...
            </p>

            <div className="w-50 h-2 bg-gray-200 animate-pulse rounded-full" />
        </div>
    )
}