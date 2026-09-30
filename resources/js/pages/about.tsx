import { Head } from "@inertiajs/react";
import {
    CalendarDays,
    Database,
    ShieldCheck,
    ShoppingBag,
    UsersRound,
} from "lucide-react";

const capabilities = [
    {
        number: "01",
        icon: UsersRound,
        title: "A home for every team",
        description:
            "Browse club squads and player profiles, and discover the people who make Evergreen what it is.",
    },
    {
        number: "02",
        icon: CalendarDays,
        title: "The season, in one place",
        description:
            "Keep up with fixtures, match results, club events, and the moments worth sharing after the game.",
    },
    {
        number: "03",
        icon: ShieldCheck,
        title: "A straightforward way to join",
        description:
            "Prospective players can register online, while club updates and newsletter sign-ups stay close at hand.",
    },
    {
        number: "04",
        icon: ShoppingBag,
        title: "Club gear, ready to shop",
        description:
            "Explore products, choose available variants, manage a cart, and place orders through a dedicated checkout.",
    },
];

const technology = [
    {
        name: "Frontend",
        tools: "React 19 · TypeScript 5.9 · Inertia.js 3",
        description:
            "A responsive React experience delivered through Inertia, with typed page components and client-side navigation.",
    },
    {
        name: "Interface",
        tools: "Tailwind CSS 4 · Radix UI · Lucide",
        description:
            "Utility-first styling, accessible interaction primitives, and a consistent icon set power the club storefront.",
    },
    {
        name: "Backend",
        tools: "Laravel 13 · PHP 8.3+ · Fortify",
        description:
            "Laravel handles routing, application logic, validation, and customer authentication; Fortify supports staff authentication.",
    },
    {
        name: "Database",
        tools: "Eloquent ORM · MySql by default",
        description:
            "Relational models cover teams, players, matches, events, products, inventory, customers, and orders.",
    },
    {
        name: "Build & quality",
        tools: "Vite 8 · Wayfinder · Pest 4 · Pint",
        description:
            "Vite powers frontend builds, Wayfinder generates typed Laravel route helpers, Pest runs tests, and Pint keeps PHP code formatted.",
    },
];

export default function About() {
    return (
        <>
            <Head title="About Evergreen Team" />

            <section
                id="home"
                className="relative isolate flex min-h-120 items-end overflow-hidden bg-zinc-950 sm:min-h-140"
            >
                <img
                    src="/assets/images/about.jpg"
                    alt="Evergreen cricket club"
                    className="absolute inset-0 -z-20 size-full object-cover object-center"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-r from-zinc-950/85 via-zinc-950/45 to-zinc-950/10" />
                <div className="mx-auto w-full max-w-[1600px] px-5 pt-28 pb-14 text-white sm:px-8 sm:pb-20">
                    <p className="mb-4 text-xs font-bold tracking-[0.2em] text-lime-300 uppercase sm:text-sm">
                        Evergreen Team · Club platform
                    </p>
                    <h1 className="max-w-4xl font-display text-6xl leading-[0.9] uppercase sm:text-8xl lg:text-9xl">
                        One club.
                        <br />
                        Every side of the game.
                    </h1>
                    <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
                        A digital home for the players, fixtures, events, and
                        club shop that bring Evergreen together.
                    </p>
                </div>
            </section>

            <section className="bg-white px-5 py-16 sm:px-8 sm:py-24">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                    <div>
                        <p className="text-xs font-bold tracking-[0.18em] text-[#1f7a3d] uppercase">
                            About the project
                        </p>
                        <h2 className="mt-4 font-display text-5xl leading-[0.95] uppercase sm:text-6xl">
                            Cricket lives here, on and off the field.
                        </h2>
                    </div>
                    <div className="space-y-5 text-base leading-8 text-zinc-600">
                        <p>
                            Evergreen Team is a community cricket club website
                            built to make club life easier to follow and easier
                            to take part in. Members and supporters can find
                            teams and players, keep up with match days and
                            events, and stay connected to the club.
                        </p>
                        <p>
                            The platform also brings player registration and an
                            online store into the same experience. Behind the
                            scenes, a Laravel application manages the club’s
                            records and shop workflows, while a React interface
                            keeps the experience quick and accessible across
                            screen sizes.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[#eef2ec] px-5 py-16 sm:px-8 sm:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 grid gap-4 sm:mb-14 sm:grid-cols-[1fr_0.8fr] sm:items-end">
                        <div>
                            <p className="text-xs font-bold tracking-[0.18em] text-[#1f7a3d] uppercase">
                                Made for club life
                            </p>
                            <h2 className="mt-3 font-display text-5xl leading-none uppercase sm:text-7xl">
                                One home for the whole club
                            </h2>
                        </div>
                        <p className="max-w-lg text-sm leading-7 text-zinc-600 sm:justify-self-end">
                            From the first registration to the final overs, the
                            platform connects the everyday details that keep a
                            cricket community moving.
                        </p>
                    </div>

                    <div className="grid border-t border-zinc-300 sm:grid-cols-2">
                        {capabilities.map((capability) => {
                            const Icon = capability.icon;

                            return (
                                <article
                                    key={capability.number}
                                    className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-zinc-300 py-7 sm:gap-5 sm:px-6 sm:py-9 even:sm:pr-0 odd:sm:border-r odd:sm:pl-0"
                                >
                                    <span className="pt-1 text-xs font-semibold text-[#1f7a3d] tabular-nums">
                                        {capability.number}
                                    </span>
                                    <div>
                                        <Icon
                                            aria-hidden="true"
                                            className="mb-4 size-6 text-[#1f7a3d]"
                                            strokeWidth={1.7}
                                        />
                                        <h3 className="font-display text-3xl leading-none uppercase">
                                            {capability.title}
                                        </h3>
                                        <p className="mt-3 max-w-md text-sm leading-7 text-zinc-600">
                                            {capability.description}
                                        </p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section
                id="technology"
                className="bg-zinc-950 px-5 py-16 text-white sm:px-8 sm:py-24"
            >
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <p className="text-xs font-bold tracking-[0.18em] text-lime-300 uppercase">
                            Under the hood
                        </p>
                        <h2 className="mt-4 font-display text-6xl leading-[0.9] uppercase sm:text-7xl">
                            Built on a modern stack.
                        </h2>
                        <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
                            A full-stack Laravel and React application, with a
                            relational data model built around the way the club
                            operates.
                        </p>
                    </div>

                    <div className="border-t border-white/20">
                        {technology.map((item, index) => (
                            <article
                                key={item.name}
                                className="grid gap-3 border-b border-white/20 py-6 sm:grid-cols-[8rem_1fr] sm:gap-6 sm:py-7"
                            >
                                <div className="flex items-center gap-3 text-lime-300">
                                    {index === 3 ? (
                                        <Database
                                            aria-hidden="true"
                                            className="size-4"
                                        />
                                    ) : (
                                        <span className="text-xs font-semibold tabular-nums">
                                            0{index + 1}
                                        </span>
                                    )}
                                    <h3 className="text-xs font-bold tracking-[0.12em] uppercase">
                                        {item.name}
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white sm:text-base">
                                        {item.tools}
                                    </p>
                                    <p className="mt-2 text-sm leading-7 text-white/60">
                                        {item.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#1f7a3d] px-5 py-12 text-white sm:px-8 sm:py-16">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-bold tracking-[0.18em] text-lime-200 uppercase">
                            Evergreen Team
                        </p>
                        <h2 className="mt-2 font-display text-4xl leading-none uppercase sm:text-5xl">
                            Rooted in cricket. Connected by community.
                        </h2>
                    </div>
                    <Database
                        aria-hidden="true"
                        className="hidden size-10 shrink-0 text-white/50 sm:block"
                        strokeWidth={1.2}
                    />
                </div>
            </section>
        </>
    );
}
