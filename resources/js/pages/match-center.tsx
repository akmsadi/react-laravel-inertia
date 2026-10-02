import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    MapPin,
    MoreVertical,
    Share2,
    Trophy,
} from "lucide-react";
import { home, matchCenter } from "@/routes";

interface MatchVenue {
    name?: string;
}

interface Match {
    id: number;
    match_type: string;
    format_overs: number;
    venue?: MatchVenue | null;
    scheduled_at?: string | null;
    team_name: string;
    opponent_name: string;
    match_status: string;
    result_type?: string | null;
    result_summary?: string | null;
    notes?: string | null;
}

interface Scorecard {
    batting: {
        name: string;
        dismissal: string;
        runs: number;
        balls: number;
        fours: number;
        sixes: number;
        strike_rate: string;
    }[];
    did_not_bat: string[];
    extras: { total: number; detail: string };
    bowling: {
        name: string;
        overs: string;
        maidens: number;
        runs: number;
        wickets: number;
        economy: string;
    }[];
    fall_of_wickets: { name: string; score: number; overs: string }[];
}

interface SummaryInnings {
    batting_side: string;
    runs: number;
    wickets: number;
    overs: string;
    scorecard: Scorecard;
    batsmen: { name: string; runs: number; balls: number; not_out: boolean }[];
    bowlers: { name: string; wickets: number; runs: number; overs: string }[];
}

interface MatchCenterProps {
    match: Match | null;
    summary: SummaryInnings[];
    previousMatchId: number | null;
    nextMatchId: number | null;
    oldMatches: Match[];
}

const tabs = ["Summary", "Scorecard"] as const;

type Tab = (typeof tabs)[number];

function formatMatchDate(date: string | null | undefined): string {
    if (!date) {
        return "Date to be confirmed";
    }

    return new Date(date).toLocaleDateString("en-GB", {
        timeZone: "UTC",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function formatMatchType(match: Match): string {
    if (match.match_type === "limited_overs") {
        return `${match.format_overs}-over match`;
    }

    return match.match_type.replaceAll("_", " ");
}

function ScorecardInnings({ innings }: { innings: SummaryInnings }) {
    const { batting, did_not_bat, extras, bowling, fall_of_wickets } =
        innings.scorecard;
    const head =
        "px-3 py-2 text-right text-[10px] font-bold tracking-wider text-slate-400 uppercase";
    const cell = "px-3 py-2.5 text-right tabular-nums";

    return (
        <section className="overflow-hidden border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-4 border-l-4 border-[#f5b700] bg-slate-100 px-4 py-3">
                <h3 className="truncate text-base font-black tracking-wide text-slate-900 uppercase sm:text-xl">
                    {innings.batting_side}
                </h3>
                <span className="shrink-0 text-xl font-black text-slate-900 sm:text-2xl">
                    {innings.runs}-{innings.wickets}{" "}
                    <span className="text-xs font-semibold text-slate-500">
                        ({innings.overs} ov)
                    </span>
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-136 text-sm">
                    <thead className="border-b border-slate-200">
                        <tr>
                            <th className="px-3 py-2 text-left text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Batter
                            </th>
                            <th className={head}>R</th>
                            <th className={head}>B</th>
                            <th className={head}>4s</th>
                            <th className={head}>6s</th>
                            <th className={head}>SR</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {batting.map((row) => (
                            <tr key={row.name}>
                                <td className="px-3 py-2.5">
                                    <p className="font-semibold text-slate-900">
                                        {row.name}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {row.dismissal}
                                    </p>
                                </td>
                                <td
                                    className={`${cell} font-bold text-slate-900`}
                                >
                                    {row.runs}
                                </td>
                                <td className={cell}>{row.balls}</td>
                                <td className={cell}>{row.fours}</td>
                                <td className={cell}>{row.sixes}</td>
                                <td className={cell}>{row.strike_rate}</td>
                            </tr>
                        ))}
                        <tr className="bg-slate-50">
                            <td className="px-3 py-2.5 font-semibold text-slate-700">
                                Extras
                                {extras.detail && (
                                    <span className="ml-2 text-xs font-normal text-slate-400">
                                        ({extras.detail})
                                    </span>
                                )}
                            </td>
                            <td className={`${cell} font-bold text-slate-900`}>
                                {extras.total}
                            </td>
                            <td colSpan={4} />
                        </tr>
                        <tr className="bg-slate-50">
                            <td className="px-3 py-2.5 font-bold text-slate-900 uppercase">
                                Total
                            </td>
                            <td className={`${cell} font-black text-slate-900`}>
                                {innings.runs}-{innings.wickets}
                            </td>
                            <td
                                colSpan={4}
                                className="px-3 py-2.5 text-right text-xs text-slate-500"
                            >
                                {innings.overs} overs
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {did_not_bat.length > 0 && (
                <p className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500">
                    <span className="font-bold text-slate-700">
                        Did not bat:{" "}
                    </span>
                    {did_not_bat.join(", ")}
                </p>
            )}

            <div className="overflow-x-auto border-t border-slate-200">
                <table className="w-full min-w-136 text-sm">
                    <thead className="border-b border-slate-200">
                        <tr>
                            <th className="px-3 py-2 text-left text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                Bowler
                            </th>
                            <th className={head}>O</th>
                            <th className={head}>M</th>
                            <th className={head}>R</th>
                            <th className={head}>W</th>
                            <th className={head}>Econ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {bowling.map((row) => (
                            <tr key={row.name}>
                                <td className="px-3 py-2.5 font-semibold text-slate-900">
                                    {row.name}
                                </td>
                                <td className={cell}>{row.overs}</td>
                                <td className={cell}>{row.maidens}</td>
                                <td className={cell}>{row.runs}</td>
                                <td
                                    className={`${cell} font-bold text-slate-900`}
                                >
                                    {row.wickets}
                                </td>
                                <td className={cell}>{row.economy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {fall_of_wickets.length > 0 && (
                <p className="border-t border-slate-200 px-4 py-3 text-xs leading-6 text-slate-500">
                    <span className="font-bold text-slate-700">
                        Fall of wickets:{" "}
                    </span>
                    {fall_of_wickets
                        .map(
                            (wicket, index) =>
                                `${wicket.score}-${index + 1} (${wicket.name}, ${wicket.overs} ov)`,
                        )
                        .join(", ")}
                </p>
            )}
        </section>
    );
}

function InningsCard({ innings }: { innings: SummaryInnings }) {
    return (
        <div className="overflow-hidden bg-white shadow-md">
            <div className="flex items-center justify-between gap-4 border-l-4 border-[#f5b700] bg-slate-100 px-4 py-3">
                <span className="truncate text-base font-black tracking-wide text-slate-900 uppercase sm:text-xl">
                    {innings.batting_side}
                </span>
                <span className="flex shrink-0 items-baseline gap-3">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase">
                        Overs {innings.overs}
                    </span>
                    <span className="text-2xl font-black text-slate-900 sm:text-3xl">
                        {innings.runs}-{innings.wickets}
                    </span>
                </span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-200">
                <SummaryColumn title="Batting">
                    {innings.batsmen.map((batsman) => (
                        <SummaryRow
                            key={batsman.name}
                            name={batsman.name}
                            value={`${batsman.runs}${batsman.not_out ? "*" : ""}`}
                            detail={String(batsman.balls)}
                        />
                    ))}
                </SummaryColumn>
                <SummaryColumn title="Bowling">
                    {innings.bowlers.map((bowler) => (
                        <SummaryRow
                            key={bowler.name}
                            name={bowler.name}
                            value={`${bowler.wickets}-${bowler.runs}`}
                            detail={bowler.overs}
                        />
                    ))}
                </SummaryColumn>
            </div>
        </div>
    );
}

function SummaryColumn({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="min-w-0">
            <p className="border-b border-slate-200 px-3 py-2 text-[10px] font-bold tracking-[0.16em] text-slate-400 uppercase sm:px-4">
                {title}
            </p>
            <div className="divide-y divide-slate-100">{children}</div>
        </div>
    );
}

function SummaryRow({
    name,
    value,
    detail,
}: {
    name: string;
    value: string;
    detail: string;
}) {
    return (
        <div className="flex items-baseline justify-between gap-2 px-3 py-2.5 sm:px-4">
            <span className="truncate text-xs font-semibold text-slate-700 uppercase sm:text-sm">
                {name}
            </span>
            <span className="shrink-0 whitespace-nowrap">
                <b className="text-sm text-slate-900 sm:text-base">{value}</b>
                <span className="ml-1 text-[11px] text-slate-400">
                    {detail}
                </span>
            </span>
        </div>
    );
}

function NavLink({
    matchId,
    label,
    direction,
}: {
    matchId: number | null;
    label: string;
    direction: "previous" | "next";
}) {
    const Icon = direction === "previous" ? ChevronLeft : ChevronRight;
    const content =
        direction === "previous" ? (
            <>
                <Icon size={20} />
                <span className="hidden font-semibold sm:inline">{label}</span>
            </>
        ) : (
            <>
                <span className="hidden font-semibold sm:inline">{label}</span>
                <Icon size={20} />
            </>
        );

    if (matchId === null) {
        return (
            <span
                aria-disabled="true"
                className="flex items-center gap-1 text-slate-300"
            >
                {content}
            </span>
        );
    }

    return (
        <Link
            href={matchCenter({ match: matchId })}
            aria-label={`${label} match`}
            preserveScroll
            className="flex items-center gap-1 transition hover:text-[#1f7a3d]"
        >
            {content}
        </Link>
    );
}

export default function MatchCenter({
    match,
    summary,
    previousMatchId,
    nextMatchId,
    oldMatches,
}: MatchCenterProps) {
    const isCompleted = ["completed", "finished", "result"].includes(
        match?.match_status ?? "",
    );

    const [activeTab, setActiveTab] = useState<Tab>("Summary");

    return (
        <>
            <Head title="Match Center" />

            <div className="bg-[#f5f6f8] px-5 py-8 sm:px-8 sm:py-12">
                <div className="mx-auto max-w-[1600px]">
                    <div className="mb-4 flex items-center justify-between gap-4 text-xs text-slate-500">
                        <div className="min-w-0 truncate">
                            {match && (
                                <h1 className="font-display text-4xl leading-none text-slate-900 uppercase sm:text-5xl">
                                    {formatMatchType(match)} ·{" "}
                                    {formatMatchDate(match.scheduled_at)}
                                    {match.venue?.name
                                        ? ` · ${match.venue.name}`
                                        : ""}
                                </h1>
                            )}
                        </div>
                        <div className="flex shrink-0 items-center gap-4 text-slate-800">
                            <NavLink
                                matchId={previousMatchId}
                                label="Previous"
                                direction="previous"
                            />
                            <NavLink
                                matchId={nextMatchId}
                                label="Next"
                                direction="next"
                            />
                            <Share2 size={18} className="hidden sm:block" />
                            <MoreVertical size={19} />
                        </div>
                    </div>

                    {match ? (
                        <section className="overflow-hidden border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-200 p-5">
                                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-slate-500 uppercase">
                                    <Trophy
                                        size={15}
                                        className="text-[#1f7a3d]"
                                    />
                                    {isCompleted
                                        ? match.result_summary && (
                                              <p className="text-[#1f7a3d]">
                                                  {match.result_summary}
                                              </p>
                                          )
                                        : "Fixture"}
                                </div>
                            </div>

                            <div className="flex overflow-x-auto border-slate-200 px-5 gap-5">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setActiveTab(tab)}
                                        className={`shrink-0 border-b-2 py-4 text-sm font-bold ${tab === activeTab ? "border-[#075fc2] text-[#075fc2]" : "border-transparent text-slate-500 hover:text-slate-900"}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {summary.length === 0 ? (
                                <p className="border-t border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500">
                                    Match details have not been recorded yet.
                                </p>
                            ) : activeTab === "Summary" ? (
                                <div className="border-t border-slate-200 bg-slate-50 p-4">
                                    <div className="grid gap-5 lg:grid-cols-2">
                                        {summary.map((innings) => (
                                            <InningsCard
                                                key={innings.batting_side}
                                                innings={innings}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 border-t border-slate-200 bg-slate-50 p-4">
                                    {summary.map((innings) => (
                                        <ScorecardInnings
                                            key={innings.batting_side}
                                            innings={innings}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>
                    ) : (
                        <section className="border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-sm sm:px-12">
                            <CalendarDays
                                aria-hidden="true"
                                className="mx-auto size-10 text-[#1f7a3d]"
                                strokeWidth={1.5}
                            />
                            <h1 className="mt-5 font-display text-5xl leading-none text-slate-900 uppercase sm:text-6xl">
                                No matches yet
                            </h1>
                            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500">
                                Match summaries will appear here once a fixture
                                has been added to the Evergreen schedule.
                            </p>
                            <Link
                                href={home()}
                                className="mt-7 inline-flex bg-[#1f7a3d] px-5 py-3 text-sm font-bold tracking-[0.12em] text-white uppercase transition hover:bg-green-900"
                            >
                                Back to home
                            </Link>
                        </section>
                    )}

                    {oldMatches.length > 0 && (
                        <section className="mt-14">
                            <div className="mb-6 flex items-end justify-between gap-4">
                                <div>
                                    <h2 className="mt-2 font-display text-5xl leading-none text-slate-900 uppercase sm:text-6xl">
                                        Old matches
                                    </h2>
                                </div>
                                <span className="hidden text-sm text-slate-500 sm:block">
                                    {oldMatches.length} recent results
                                </span>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                {oldMatches.map((oldMatch) => (
                                    <Link
                                        key={oldMatch.id}
                                        href={matchCenter({
                                            match: oldMatch.id,
                                        })}
                                        className="flex min-h-64 flex-col border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 text-xs font-bold tracking-widest text-slate-500 uppercase">
                                            <span>
                                                {formatMatchDate(
                                                    oldMatch.scheduled_at,
                                                )}
                                            </span>
                                            <Trophy
                                                size={15}
                                                className="text-[#1f7a3d]"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col px-5 py-5">
                                            <p className="text-xs font-semibold text-slate-400">
                                                {formatMatchType(oldMatch)}
                                            </p>
                                            <div className="mt-4 space-y-3">
                                                <div className="flex items-center justify-between gap-4">
                                                    <span className="text-slate-900">
                                                        {oldMatch.team_name}
                                                    </span>
                                                    <span className="grid size-6 shrink-0 place-items-center bg-[#1f7a3d] text-[9px] font-bold text-white">
                                                        ET
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between gap-4">
                                                    <span className="text-slate-900">
                                                        {oldMatch.opponent_name}
                                                    </span>
                                                    <span className="grid size-6 shrink-0 place-items-center bg-orange-500 text-[9px] font-bold text-white">
                                                        OP
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="mt-5 border-t border-slate-100 pt-4 text-sm leading-6 font-semibold text-[#075fc2]">
                                                {oldMatch.result_summary ??
                                                    "Result details are not available."}
                                            </p>
                                            {oldMatch.venue?.name && (
                                                <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-slate-500">
                                                    <MapPin size={13} />
                                                    {oldMatch.venue.name}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}
