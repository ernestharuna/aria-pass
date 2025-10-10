import React, { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";

interface CountdownProps {
    eventDate: string
    startTime: string
    display?: 'd' | 'dh' | 'dhm' | 'dhms'
    pad?: boolean
    showLabels?: boolean
    separator?: React.ReactNode
    onComplete?: () => void
    className: string
}

export default function Countdown({
    eventDate,
    startTime,
    display = "dhms",
    pad = true,
    showLabels = true,
    separator = ":",
    onComplete,
    className,
}: CountdownProps) {
    // Build a LOCAL target date by composing parts (avoids parsing quirks)
    const target = useMemo(() => {
        const [y, m, d] = eventDate.split("-").map(Number);
        const [hh, mm, ss] = startTime.split(":").map(Number);
        // JS Date uses 0-based months
        return dayjs(new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, ss ?? 0, 0));
    }, [eventDate, startTime]);

    const [parts, setParts] = useState(() => diffParts(target));
    const firedRef = useRef(false);

    useEffect(() => {
        const tick = () => {
            const next = diffParts(target);
            setParts(next);
            if (next.totalMs <= 0 && !firedRef.current) {
                firedRef.current = true;
                onComplete?.();
            }
        };

        tick(); // render immediately with correct values
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [target, onComplete]);

    const units = selectUnits(parts, display, pad);

    return (
        <div
            className={className}
            role="timer"
            aria-live="polite"
            style={{ display: "inline-flex", gap: showLabels ? "0.75rem" : "0.25rem" }}
        >
            {units.map((u, i) => (
                <Unit
                    key={u.key}
                    value={u.value}
                    label={u.label}
                    showLabel={showLabels}
                    separator={!showLabels && i < units.length - 1 ? separator : null}
                />
            ))}
        </div>
    );
}

/** Compute remaining time parts using dayjs */
function diffParts(target: any) {
    let diffMs = target.diff(dayjs()); // milliseconds
    if (diffMs < 0) diffMs = 0;

    const totalMs = diffMs;
    const totalSeconds = Math.floor(diffMs / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { totalMs, days, hours, minutes, seconds };
}

/** Build the units list to render according to the display mode */
function selectUnits(parts: any, display: any, pad: any) {
    
    const fmt = (n: any, width = 2) => (pad ? String(n).padStart(width, "0") : String(n));

    const base = [
        { key: "days", value: String(parts.days), label: "Days" },
        { key: "hours", value: fmt(parts.hours), label: "Hours" },
        { key: "minutes", value: fmt(parts.minutes), label: "Minutes" },
        { key: "seconds", value: fmt(parts.seconds), label: "Seconds" },
    ];

    switch (display) {
        case "d":
            return base.slice(0, 1);
        case "dh":
            return base.slice(0, 2);
        case "dhm":
            return base.slice(0, 3);
        case "dhms":
        default:
            return base;
    }
}

/** Small presentational unit */
function Unit({ value, label, showLabel, separator }: any) {
    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: "0.35rem",
                fontVariantNumeric: "tabular-nums",
            }}
        >
            <span
                style={{
                    fontSize: "1.35rem",
                    letterSpacing: 0,
                    fontWeight: 700,
                    lineHeight: 1,
                    minWidth: "2ch",
                    textAlign: "right",
                }}
                aria-label={showLabel ? `${value} ${label}` : undefined}
            >
                {value}
            </span>
            {showLabel ? (
                <span style={{ opacity: 0.75, fontSize: "0.8rem" }}>{label}</span>
            ) : separator ? (
                <span aria-hidden="true">{separator}</span>
            ) : null}
        </div>
    );
}