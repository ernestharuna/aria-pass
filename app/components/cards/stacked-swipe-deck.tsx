import React from "react";
import { motion } from "framer-motion";

type Card = {
    id: string | number;
    title?: string;
    image: string;
    subtitle?: string;
};

type Props = {
    initialCards: Card[];
    width?: number;
    height?: number;
    onSwipe?: (card: Card, dir: -1 | 1) => void;
};

export default function StackedSwipeDeck({
    initialCards,
    width = 320,
    height = 480,
    onSwipe,
}: Props) {
    const [cards, setCards] = React.useState<Card[]>([...initialCards]);
    const [removingId, setRemovingId] = React.useState<string | number | null>(null);
    const [removeDir, setRemoveDir] = React.useState<-1 | 1>(1);

    // Thresholds for deciding a "swipe away"
    const OFFSET_THRESHOLD = 120;
    const VELOCITY_THRESHOLD = 800;

    const handleDragEnd = (card: Card, _e: any, info: { offset: { x: number }; velocity: { x: number } }) => {
        const offsetX = info.offset.x;
        const velX = info.velocity.x;
        const shouldRemove = Math.abs(offsetX) > OFFSET_THRESHOLD || Math.abs(velX) > VELOCITY_THRESHOLD;

        if (shouldRemove) {
            const dir: -1 | 1 = offsetX >= 0 ? 1 : -1;
            setRemoveDir(dir);
            setRemovingId(card.id);
            onSwipe?.(card, dir);
            // actual reordering will happen in onAnimationComplete
        }
        // otherwise Framer will spring back automatically
    };

    const handleAnimationComplete = (cardId: string | number) => {
        // only act when the card that completed leaving is the one we marked removing
        if (removingId !== cardId) return;

        setCards((prev) => {
            if (prev.length <= 1) return prev;
            // top card is the last element (we render bottom-to-top)
            const top = prev[prev.length - 1];
            const remaining = prev.slice(0, prev.length - 1);
            // move the removed top to the bottom (looping)
            return [top, ...remaining];
        });

        // reset removal state
        setRemovingId(null);
    };

    return (
        <div
            className="relative"
            style={{ width: `${width}px`, height: `${height}px` }}
            aria-live="polite"
        >
            {cards.map((card, i) => {
                const topIndex = cards.length - 1;
                const isTop = i === topIndex;

                // posFromTop: 0 for top card, 1 for the one right behind top, etc.
                const posFromTop = topIndex - i;

                // Visual stacking offsets for the **outer** wrapper (static)
                const translateY = posFromTop * 10; // px downward per layer
                const translateX = posFromTop * 8; // px right per layer
                const scale = 1 - posFromTop * 0.03;
                const rotate = posFromTop % 2 === 0 ? -3 : 3;
                const zIndex = i; // bottom: low, top: high

                return (
                    <div
                        key={card.id}
                        className="absolute left-1/2 top-1/2"
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                            transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                            zIndex,
                            pointerEvents: isTop ? "auto" : "none", // only top card should receive pointer events
                        }}
                    >
                        {/* inner motion div is the element that will be dragged/animated */}
                        <motion.div
                            drag={isTop ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            whileTap={{ scale: 1.02 }}
                            onDragEnd={(e, info) => isTop && handleDragEnd(card, e, info)}
                            className="w-full h-full rounded-2xl overflow-hidden bg-white"
                            style={{ touchAction: "pan-y" }}
                            // if this card is currently being removed, animate it off-screen
                            animate={
                                removingId === card.id
                                    ? { x: removeDir * 1200, rotate: removeDir * 30, opacity: 0, transition: { duration: 0.45 } }
                                    : { x: 0, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 400, damping: 30 } }
                            }
                            onAnimationComplete={() => handleAnimationComplete(card.id)}
                        >
                            {/* Card content */}
                            <div className="relative w-full h-full">
                                <img
                                    src={card.image}
                                    alt={card.title ?? "event image"}
                                    className="w-full h-full object-cover"
                                />

                                {/* small overlay content — location/title/CTA */}
                                <div className="absolute left-4 top-4 bg-black/60 text-white text-xs rounded-md px-3 py-1 backdrop-blur-sm">
                                    {card.subtitle ?? "Location"}
                                </div>

                                <div className="absolute left-4 bottom-4">
                                    <button className="bg-white/90 text-black px-3 py-1 rounded-md text-sm shadow">
                                        Interested
                                    </button>
                                </div>

                                <div className="absolute right-4 top-4 flex flex-col items-end text-white drop-shadow">
                                    <h3 className="text-sm font-semibold">{card.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
}
