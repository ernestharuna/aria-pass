import { LoaderCircle } from 'lucide-react';

export default function SplashScreen() {
    return (
        <div className='p-5 h-screen mx-auto flex flex-col items-center justify-center bg-primary-bg animated fadeIn relative'>
            <div className="flex flex-col gap-3 mb-7 items-center">
                <div className="text-center leading-3 flex flex-row items-center text-gray-700">
                    <span className="animate-spin p-1">
                        <LoaderCircle size={20} strokeWidth={1} className='h-20 w-20 text-primary' />
                    </span>
                </div>
            </div>
        </div>
    );
}
