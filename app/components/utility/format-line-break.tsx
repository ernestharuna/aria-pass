export function FormatLineBreak({ input }: { input: string | null }) {
    return (input ?? '').split('\n').map((line: string, index: number) => (
        <p key={index} className="mb-2 text-wrap">{line}</p>
    ));
}