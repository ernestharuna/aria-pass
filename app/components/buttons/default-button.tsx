import { useNavigation } from 'react-router';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';

export default function DefaultButton({ text }: { text: string }) {
    const { state } = useNavigation();
    const busy: boolean = state === "submitting" || state === "loading";
    return (
        <Button
            disabled={busy}
            className="bg-[#3A3546] rounded-full border border-gray-500 text-white hover:bg-gray-600 cursor-pointer w-full tracking-wide py-5.5 uppercase disabled:bg-gray-500 disabled:text-gray-200 disabled:cursor-not-allowed disabled:border-gray-500 "
        >
            {busy ? (<LoaderCircle className="animate-spin" />) : text}
        </Button>
    )
}
