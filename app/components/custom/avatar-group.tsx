import CustomAvatar from "./custom-avatar";

interface AvatarGroupProps {
    names: string[];
    max?: number;
}

export default function AvatarGroup({ names, max = names.length }: AvatarGroupProps) {
    const visibleNames = names.slice(0, max);
    const extraCount = names.length - max;

    return (
        <div className="flex items-center -space-x-3.5">
            {visibleNames.map((name, index) => (
                <CustomAvatar key={index} name={name} styles="md:h-12 md:w-12 h-10 w-10" />
            ))}

            {extraCount > 0 && (
                <div className="ms-1 md:h-10 md:w-10 h-8 w-8 flex items-center justify-center rounded-full bg-primary-bg text-primary text-base font-light">
                    +{extraCount}
                </div>
            )}
        </div>
    );
}