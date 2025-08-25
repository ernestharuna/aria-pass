import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function CustomAvatar({ name = "New User", styles }: { name?: string, styles?: string }) {
    function stringToColor(string: string): string {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
        return color;
    }

    function stringAvatar(name = "Kribb User"): string {
        const nameParts = name.split(' ');

        if (nameParts.length === 1) {
            // For single-word names, use the first two letters of the name
            return `${nameParts[0][0]}${nameParts[0][1] || ''}`;
        }

        // For two-word names, use the first letter of each word
        return `${nameParts[0][0]}${nameParts[1][0]}`;
    }

    return (
        <Avatar className={`p-1 ${styles}`}>
            <AvatarImage src="#" alt='...' />
            {/* <AvatarImage src="https://github.com/shadcn.png" alt='...' className={`rounded-full`} /> */}
            <AvatarFallback
                style={{ backgroundColor: stringToColor(name) }}
                className="font-bold uppercase text-black"
            >
                {stringAvatar(name)}
            </AvatarFallback>
        </Avatar>
    );
}

