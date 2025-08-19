import { LoaderCircle } from 'lucide-react';

export default function SplashScreen() {
    return (
        <div className='p-5 h-screen mx-auto flex flex-col items-center justify-center bg-white animated fadeIn relative'>
            <div className="flex flex-col gap-3 mb-7 items-center">
                <div className="text-center leading-3 flex flex-row gap-3 items-center">
                    <span className="rounded-full p-1 border border-gray-200">
                        <LoaderCircle size={14} strokeWidth={1.7} className='animate-spin h-5 w-5 text-primary' />
                    </span>

                    <p className='text-md font-semibold tracking-tighter animate-pulse'>
                        <span className="text-primary-theme">Aria</span>Pass
                    </p>
                </div>
            </div>
        </div>
    );
}
