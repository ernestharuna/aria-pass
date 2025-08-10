export default function HrWithText({ text = "Or" }: { text?: string }) {
    return (
        <div className="flex items-center py-5 mt-3">
            <div className="flex-1 border-t border-gray-600" />
            <div className="text-gray-700 text-xs font-bold mx-4">{text}</div>
            <div className="flex-1 border-t border-gray-600" />
        </div>
    )
}
