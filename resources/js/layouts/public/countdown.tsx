import { useEffect, useState } from "react";

function getTimeRemaining(targetDate: string) {
    const difference = Math.max(0, new Date(targetDate).getTime() - Date.now());

    return {
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

export default function Countdown({ scheduledAt }: { scheduledAt: string }) {
    const [remaining, setRemaining] = useState(() =>
        getTimeRemaining(scheduledAt),
    );

    useEffect(() => {
        const timer = window.setInterval(
            () => setRemaining(getTimeRemaining(scheduledAt)),
            1000,
        );
        return () => window.clearInterval(timer);
    }, [scheduledAt]);

    return (
        <div className="mt-7 flex flex-wrap justify-center gap-2 sm:gap-3">
            {Object.entries(remaining).map(([label, value]) => (
                <div className="flex items-start gap-2 sm:gap-3" key={label}>
                    <div className="min-w-12 text-center sm:min-w-16">
                        <p className="font-display text-5xl leading-none text-[#1f7a3d] sm:text-6xl">
                            {String(value).padStart(2, "0")}
                        </p>
                        <p className="mt-1 text-[10px] font-bold tracking-[0.14em] text-zinc-600 uppercase">
                            {label === "minutes"
                                ? "min"
                                : label === "seconds"
                                  ? "sec"
                                  : label}
                        </p>
                    </div>
                    {label !== "seconds" && (
                        <span className="font-display text-4xl leading-none text-[#1f7a3d] sm:text-5xl">
                            :
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
