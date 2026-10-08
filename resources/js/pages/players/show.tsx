import { Head, Link } from "@inertiajs/react";

type Stat = { label: string; value: string | number | null };

type PlayerProps = {
    player: {
        id: number;
        name: string;
        nickname: string | null;
        organization: string | null;
    };
    batting: Record<string, number | null>;
    bowling: Record<string, string | number | null>;
};

function StatGrid({ title, stats }: { title: string; stats: Stat[] }) {
    return (
        <section className="mt-10 mx-auto max-w-[1600px]">
            <h2 className="font-display text-4xl leading-none uppercase">
                {title}
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white p-5 text-center shadow-[0_5px_18px_rgba(0,0,0,.08)]"
                    >
                        <p className="font-display text-4xl leading-none text-[#1f7a3d]">
                            {stat.value ?? "-"}
                        </p>
                        <p className="mt-2 text-[11px] font-bold tracking-[0.14em] text-zinc-600 uppercase">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function Show({ player, batting, bowling }: PlayerProps) {
    return (
        <>
            <Head title={player.name} />
            <div className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 sm:py-16">
                <Link
                    href="/#members"
                    className="text-sm font-bold tracking-widest text-[#1f7a3d] uppercase"
                >
                    &larr; All members
                </Link>

                <div className="mt-6 flex flex-col items-center gap-6 bg-white p-6 text-center shadow-[0_5px_18px_rgba(0,0,0,.08)] sm:flex-row sm:text-left">
                    <img
                        src="/assets/images/empty-male.png"
                        alt={player.name}
                        className="size-36 rounded-full object-cover"
                    />
                    <div>
                        <h1 className="font-display text-5xl leading-none uppercase sm:text-6xl">
                            {player.name}
                        </h1>
                        {player.nickname && (
                            <p className="mt-2 text-zinc-600">
                                &ldquo;{player.nickname}&rdquo;
                            </p>
                        )}
                        {player.organization && (
                            <p className="mt-1 text-sm font-semibold tracking-widest text-zinc-600 uppercase">
                                {player.organization}
                            </p>
                        )}
                    </div>
                </div>

                <StatGrid
                    title="Batting"
                    stats={[
                        { label: "Matches", value: batting.matches },
                        { label: "Innings", value: batting.innings },
                        { label: "Runs", value: batting.runs },
                        { label: "Highest", value: batting.highest_score },
                        { label: "Average", value: batting.average },
                        { label: "Strike rate", value: batting.strike_rate },
                        { label: "50s", value: batting.fifties },
                        { label: "100s", value: batting.hundreds },
                        { label: "Fours", value: batting.fours },
                        { label: "Sixes", value: batting.sixes },
                    ]}
                />

                <StatGrid
                    title="Bowling"
                    stats={[
                        { label: "Innings", value: bowling.innings },
                        { label: "Overs", value: bowling.overs },
                        { label: "Maidens", value: bowling.maidens },
                        { label: "Runs", value: bowling.runs },
                        { label: "Wickets", value: bowling.wickets },
                        { label: "Economy", value: bowling.economy },
                        { label: "Best", value: bowling.best },
                    ]}
                />
            </div>
        </>
    );
}
