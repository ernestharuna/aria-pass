import { API_URL } from '~/config/defaults';
import { Button } from '../ui/button';


export default function GoogleAuthButton({ text }: { text: string }) {
    const handleGoogleSignIn = () => {
        window.location.href = `${API_URL}/api/auth/google/redirect`;
    };

    return (
        <Button
            variant={"outline"}
            onClick={handleGoogleSignIn}
            className="bg-white border-0 border-primary-theme hover:shadow rounded-full flex p-5 w-full gap-2 items-center cursor-pointer">
            <img src="/images/logos/google.png" alt="..." width="18" />
            <span className="text-black font-medium">{text} with Google</span>
        </Button>
    )
}
