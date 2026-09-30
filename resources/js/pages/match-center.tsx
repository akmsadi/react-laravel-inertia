import { Head, Link } from "@inertiajs/react";
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    MapPin,
    MoreVertical,
    Share2,
    Trophy,
} from "lucide-react";
import { home } from "@/routes";

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

interface MatchCenterProps {
    match: Match | null;
    oldMatches: Match[];
}

const tabs = [
    "Summary",
    "Scorecard",
    "Report",
    "Commentary",
    "Stats",
    "News",
    "Fan ratings",
];

function formatMatchDate(date: string | null | undefined): string {
    if (!date) {
        return "Date to be confirmed";
    }

    return new Date(date).toLocaleDateString([], {
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

export default function MatchCenter({ match, oldMatches }: MatchCenterProps) {
    const isCompleted = ["completed", "finished", "result"].includes(
        match?.match_status ?? "",
    );

    return (
        <>
            <Head title="Match Center" />

            <div className="bg-[#f5f6f8] px-5 py-8 sm:px-8 sm:py-12">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-7 flex items-center justify-between gap-4 text-xs text-slate-500 sm:mb-10">
                        <div className="min-w-0 truncate">
                            <Link
                                href={home()}
                                className="transition hover:text-[#1f7a3d]"
                            >
                                Evergreen Team
                            </Link>
                            <span className="px-2">/</span>
                            <span>Match center</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-4 text-slate-800">
                            <button
                                type="button"
                                aria-label="Previous match"
                                className="transition hover:text-[#1f7a3d]"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="hidden font-semibold sm:inline">
                                Previous
                            </span>
                            <span className="hidden font-semibold sm:inline">
                                Next
                            </span>
                            <button
                                type="button"
                                aria-label="Next match"
                                className="transition hover:text-[#1f7a3d]"
                            >
                                <ChevronRight size={20} />
                            </button>
                            <Share2 size={18} className="hidden sm:block" />
                            <MoreVertical size={19} />
                        </div>
                    </div>

                    {match ? (
                        <section className="overflow-hidden border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-200 px-5 py-5 sm:px-8">
                                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-slate-500 uppercase">
                                    <Trophy
                                        size={15}
                                        className="text-[#1f7a3d]"
                                    />
                                    {isCompleted ? "Result" : "Fixture"}
                                </div>
                                <p className="mt-2 text-sm font-semibold text-slate-700">
                                    {formatMatchType(match)} ·{" "}
                                    {formatMatchDate(match.scheduled_at)}
                                    {match.venue?.name
                                        ? ` · ${match.venue.name}`
                                        : ""}
                                </p>
                            </div>

                            <div className="px-5 py-7 sm:px-8 sm:py-10">
                                <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between gap-5">
                                            <div className="flex items-center gap-3">
                                                <span className="grid size-8 place-items-center bg-[#1f7a3d] text-xs font-bold text-white">
                                                    ET
                                                </span>
                                                <span className="text-lg font-bold text-slate-900 sm:text-2xl">
                                                    {match.team_name}
                                                </span>
                                            </div>
                                            <span className="text-xl font-bold text-slate-400 sm:text-2xl">
                                                {isCompleted
                                                    ? "Score pending"
                                                    : "-"}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between gap-5">
                                            <div className="flex items-center gap-3">
                                                <span className="grid size-8 place-items-center bg-orange-500 text-xs font-bold text-white">
                                                    OP
                                                </span>
                                                <span className="text-lg font-bold text-slate-900 sm:text-2xl">
                                                    {match.opponent_name}
                                                </span>
                                            </div>
                                            <span className="text-xl font-bold text-slate-400 sm:text-2xl">
                                                -
                                            </span>
                                        </div>
                                    </div>

                                    <div className="border-l-0 border-slate-200 pt-5 text-left sm:min-w-56 sm:border-l sm:pt-0 sm:pl-8 sm:text-right">
                                        <p className="text-sm font-semibold text-[#075fc2]">
                                            {match.result_summary ??
                                                "Match result will appear here after the score is recorded."}
                                        </p>
                                        {match.notes && (
                                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                                {match.notes}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-6 overflow-x-auto border-t border-slate-200 px-5 sm:gap-8 sm:px-8">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={tab}
                                        type="button"
                                        className={`shrink-0 border-b-2 py-4 text-sm font-bold ${index === 0 ? "border-[#075fc2] text-[#075fc2]" : "border-transparent text-slate-500 hover:text-slate-900"}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
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

                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
                        <MapPin size={14} />
                        <span>
                            Scorecard and ball-by-ball details will be added as
                            match data is recorded.
                        </span>
                    </div>

                    {oldMatches.length > 0 && (
                        <section className="mt-14">
                            <div className="mb-6 flex items-end justify-between gap-4">
                                <div>
                                    <p className="text-xs font-bold tracking-[0.16em] text-[#1f7a3d] uppercase">
                                        The archive
                                    </p>
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
                                    <article
                                        key={oldMatch.id}
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
                                                    <span className="font-bold text-slate-900">
                                                        {oldMatch.team_name}
                                                    </span>
                                                    <span className="grid size-6 shrink-0 place-items-center bg-[#1f7a3d] text-[9px] font-bold text-white">
                                                        ET
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between gap-4">
                                                    <span className="font-bold text-slate-900">
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
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}
