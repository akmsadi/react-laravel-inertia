import { Form, Head, Link, usePage } from "@inertiajs/react";
import { dashboard, login } from "@/routes";
import InputError from "@/components/input-error";
import { Spinner } from "@/components/ui/spinner";
import { store } from "@/routes/player-registration";
import { useEffect, useState } from "react";
import { ArrowUp, Menu, X } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
    {
        image: "/assets/images/slider/slider-image-4.png",
        title: "Evergreen Team",
        subtitle: "Passion - Performance - Teamwork",
    },
    {
        image: "/assets/images/slider/slider-image-5.jpg",
        title: "Match Day Ready",
        subtitle: "United We Play, United We Win",
    },
    {
        image: "/assets/images/slider/slider-image-6.jpg",
        title: "Champions In Action",
        subtitle: "Building A Winning Legacy",
    },
    {
        image: "/assets/images/slider/slider-image-7.jpg",
        title: "Champions In Action",
        subtitle: "Building A Winning Legacy",
    },
];

function imageSource(image: { image_path?: string; src?: string }) {
    return image.src ?? `/${image.image_path}`;
}

function getTimeRemaining(targetDate: string) {
    const difference = Math.max(0, new Date(targetDate).getTime() - Date.now());

    return {
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference / 3600000) % 24),
        minutes: Math.floor((difference / 60000) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

function Countdown({ scheduledAt }: { scheduledAt: string }) {
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
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-600">
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

interface WelcomeProps {
    lastMatch: any;
    nextMatch: any;
    players: any[];
    events: any[];
    teams: any[];
    playerCount: number;
    pendingCount: number;
}

export default function Welcome({
    lastMatch,
    nextMatch,
    players,
    events,
    teams,
    playerCount,
    pendingCount,
}: WelcomeProps) {
    const { auth, flash } = usePage().props;
    const dashboardUrl = "/";
    const status = (flash as { status?: string } | undefined)?.status;

    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeEvent, setActiveEvent] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const activeImages = events[activeEvent]?.images ?? [];

    useEffect(() => {
        if (!carouselApi) {
            return;
        }

        setActiveSlide(carouselApi.selectedScrollSnap());
        const onSelect = () => setActiveSlide(carouselApi.selectedScrollSnap());
        carouselApi.on("select", onSelect);

        return () => {
            carouselApi.off("select", onSelect);
        };
    }, [carouselApi]);

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-[#e9ecef] font-sans text-zinc-950">
                <header className="sticky top-0 z-30 border-b-[5px] border-[#1f7a3d] bg-white/95 backdrop-blur">
                    <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-3 sm:px-8">
                        <a href="#home" className="shrink-0">
                            <img
                                src="/assets/images/logo1.png"
                                alt="Evergreen Team"
                                className="h-auto w-36 sm:w-44"
                            />
                        </a>
                        <button
                            type="button"
                            className="grid size-10 place-items-center lg:hidden"
                            aria-label="Toggle navigation"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            {menuOpen ? <X size={25} /> : <Menu size={25} />}
                        </button>
                        <div
                            className={`${menuOpen ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col border-b border-zinc-200 bg-white px-5 py-4 lg:static lg:flex lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0`}
                        >
                            {["Teams", "Members", "Gallery", "Join"].map(
                                (item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        onClick={() => setMenuOpen(false)}
                                        className="border px-4 py-2 text-center text-sm font-semibold uppercase tracking-widest transition hover:bg-[#1f7a3d] hover:text-white"
                                    >
                                        {item}
                                    </a>
                                ),
                            )}
                            {auth.user ? (
                                <Link
                                    href={dashboardUrl}
                                    className="border px-4 py-2 text-center text-sm font-semibold uppercase tracking-widest transition hover:bg-[#1f7a3d] hover:text-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="border px-4 py-2 text-center text-sm font-semibold uppercase tracking-widest text-[#1f7a3d] transition hover:bg-[#1f7a3d] hover:text-white"
                                    >
                                        Admin
                                    </Link>
                                </>
                            )}
                            <Link
                                href="/about"
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                About
                            </Link>
                        </div>
                    </nav>
                </header>

                <main id="home">
                    <section className="relative overflow-hidden">
                        <Carousel setApi={setCarouselApi} opts={{ loop: true }}>
                            <CarouselContent className="ml-0">
                                {slides.map((slide) => (
                                    <CarouselItem
                                        key={slide.title}
                                        className="relative h-105 pl-0 sm:h-135 lg:h-150"
                                    >
                                        <img
                                            src={slide.image}
                                            alt="Evergreen cricket team"
                                            className="absolute inset-0 size-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-zinc-950/45" />
                                        <div className="absolute inset-x-5 bottom-14 mx-auto max-w-375 text-white sm:bottom-20 sm:px-3">
                                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-200">
                                                Evergreen Cricket Club
                                            </p>
                                            <h1 className="font-display text-5xl uppercase leading-none sm:text-7xl lg:text-8xl">
                                                {slide.title}
                                            </h1>
                                            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] sm:text-base">
                                                {slide.subtitle}
                                            </p>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-4 size-11 rounded-none border-white/50 bg-black/20 text-white hover:bg-[#1f7a3d] sm:left-8" />
                            <CarouselNext className="right-4 size-11 rounded-none border-white/50 bg-black/20 text-white hover:bg-[#1f7a3d] sm:right-8" />
                            <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2">
                                {slides.map((slide, index) => (
                                    <button
                                        type="button"
                                        key={slide.title}
                                        aria-label={`Show ${slide.title}`}
                                        onClick={() =>
                                            carouselApi?.scrollTo(index)
                                        }
                                        className={`h-1.5 w-8 transition ${index === activeSlide ? "bg-white" : "bg-white/40"}`}
                                    />
                                ))}
                            </div>
                        </Carousel>
                    </section>

                    <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24">
                        <div className="grid gap-10 lg:grid-cols-[1.35fr_.95fr] lg:items-stretch">
                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#1f7a3d]">
                                    Cricket. Commitment. Community.
                                </p>
                                <h2 className="mt-3 font-display text-6xl uppercase leading-[0.86] sm:text-7xl">
                                    Play bold with
                                    <br />
                                    <span className="text-[#1f7a3d]">
                                        Evergreen Team
                                    </span>
                                </h2>
                                <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600">
                                    We value smart cricket, high standards, and
                                    a team-first culture that keeps improving
                                    every season. Every session is designed to
                                    feel like match preparation, not just
                                    attendance.
                                </p>
                                <div className="mt-7 flex flex-wrap gap-3">
                                    <a href="#join" className="btn-71">
                                        Join the squad
                                    </a>
                                    <a href="#gallery" className="btn-71">
                                        Events gallery
                                    </a>
                                </div>
                            </div>
                            <aside className="relative flex h-full flex-col justify-center overflow-hidden border border-green-900/10 bg-white p-7 text-center shadow-[0_5px_18px_rgba(0,0,0,.08)] sm:p-10">
                                <img
                                    src="/assets/images/logo/logo.svg"
                                    alt=""
                                    aria-hidden="true"
                                    className="absolute inset-0 m-auto w-2/3 opacity-[0.06]"
                                />
                                <div className="relative">
                                    {nextMatch ? (
                                        <>
                                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1f7a3d]">
                                                Next fixture
                                            </p>
                                            <h2 className="mt-2 font-display text-4xl uppercase leading-none sm:text-5xl">
                                                {nextMatch.team_name}{" "}
                                                <span className="text-[#1f7a3d]">
                                                    vs
                                                </span>{" "}
                                                {nextMatch.opponent_name}
                                            </h2>
                                            <p className="mt-5 font-semibold">
                                                {new Date(
                                                    nextMatch.scheduled_at,
                                                ).toLocaleString([], {
                                                    dateStyle: "medium",
                                                    timeStyle: "short",
                                                })}
                                            </p>
                                            <p className="mt-1 text-zinc-600">
                                                {nextMatch.venue?.name}
                                            </p>
                                            <Countdown
                                                scheduledAt={
                                                    nextMatch.scheduled_at
                                                }
                                            />
                                        </>
                                    ) : lastMatch ? (
                                        <>
                                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1f7a3d]">
                                                Latest result
                                            </p>
                                            <h2 className="mt-2 font-display text-4xl uppercase">
                                                {lastMatch.team_name} vs{" "}
                                                {lastMatch.opponent_name}
                                            </h2>
                                            <p className="mt-4 font-semibold">
                                                {lastMatch.result_summary}
                                            </p>
                                            <p className="mt-1 text-zinc-600">
                                                {lastMatch.venue?.name}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="font-display text-4xl uppercase">
                                                No upcoming matches
                                            </h2>
                                            <p className="mt-3 text-zinc-600">
                                                Stay tuned for the next
                                                scheduled fixture.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </aside>
                        </div>
                    </section>

                    <section id="teams" className="bg-white py-16 sm:py-24">
                        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
                            <SectionHeading
                                title="Meet the teams"
                                copy="From the nets to match day, these are the teams driving Evergreen forward."
                            />
                            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {teams.map((team) => (
                                    <Link
                                        key={team.id}
                                        href={`/teams/${team.id}`}
                                        className="group block"
                                    >
                                        {team.logo ? (
                                            <img
                                                src={
                                                    "assets/images/teams/" +
                                                    team.logo
                                                }
                                                alt={team.name}
                                                className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                            />
                                        ) : (
                                            <div className="grid aspect-square place-items-center bg-[#e8f2eb] font-display text-3xl uppercase text-[#1f7a3d]">
                                                {team.name.split(" ").at(-1)}
                                            </div>
                                        )}
                                        <h3 className="mt-4 text-center font-display text-3xl uppercase transition group-hover:text-[#1f7a3d]">
                                            {team.name}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="members" className="py-16 sm:py-24">
                        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
                            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                                <SectionHeading
                                    title="Team members"
                                    copy="Meet the individuals who make Evergreen Cricket Club stronger every day."
                                />
                                <p className="text-sm font-bold uppercase tracking-widest text-zinc-600">
                                    Active: {playerCount}{" "}
                                    <span className="mx-1">|</span> Pending:{" "}
                                    {pendingCount}
                                </p>
                            </div>
                            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                                {players.map((player) => (
                                    <a
                                        href={`/players/${player.id}`}
                                        key={player.id}
                                        className="group relative aspect-3/4 overflow-hidden bg-zinc-900"
                                        style={{
                                            backgroundImage:
                                                "url('/assets/images/empty-male.png')",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent px-4 pb-4 pt-16 text-white">
                                            <h3 className="mt-1 font-display text-3xl uppercase leading-none">
                                                {player.name}
                                            </h3>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section id="gallery" className="bg-white py-16 sm:py-24">
                        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
                            <SectionHeading
                                title="Event gallery"
                                copy="A visual showcase of our matches, tournaments, celebrations, and team spirit."
                            />
                            {events.length ? (
                                <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                        {activeImages.length ? (
                                            activeImages.map(
                                                (image: any, index: number) => (
                                                    <a
                                                        key={
                                                            image.id ??
                                                            image.src ??
                                                            index
                                                        }
                                                        href={imageSource(
                                                            image,
                                                        )}
                                                        className="group aspect-4/3 overflow-hidden bg-zinc-100"
                                                    >
                                                        <img
                                                            src={imageSource(
                                                                image,
                                                            )}
                                                            alt={
                                                                image.description ??
                                                                events[
                                                                    activeEvent
                                                                ]?.event_name ??
                                                                "Event photo"
                                                            }
                                                            className="size-full object-cover transition duration-300 group-hover:scale-105"
                                                        />
                                                    </a>
                                                ),
                                            )
                                        ) : (
                                            <p className="col-span-full py-10 text-zinc-500">
                                                No images uploaded for this
                                                event yet.
                                            </p>
                                        )}
                                    </div>
                                    <div className="border-l border-green-900/15 pl-0 lg:pl-6">
                                        {events.map((event, index) => (
                                            <button
                                                type="button"
                                                key={event.id ?? index}
                                                onClick={() =>
                                                    setActiveEvent(index)
                                                }
                                                className={`mb-1 w-full border-l-4 px-4 py-3 text-left transition ${activeEvent === index ? "border-[#1f7a3d] bg-[#e8f2eb]" : "border-transparent hover:bg-zinc-50"}`}
                                            >
                                                <span className="font-display text-2xl uppercase">
                                                    {event.event_name}
                                                </span>
                                                <span className="mt-1 block text-xs font-bold uppercase tracking-widest text-[#1f7a3d]">
                                                    {event.images?.length ?? 0}{" "}
                                                    photos
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="mt-8 text-zinc-500">
                                    No events have been added yet.
                                </p>
                            )}
                        </div>
                    </section>

                    <section
                        id="join"
                        className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24"
                    >
                        <SectionHeading
                            title="Join Evergreen Team"
                            copy="Send your player details here. We will save your request with pending status for admin review."
                        />
                        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
                            <Form
                                {...store.form()}
                                resetOnSuccess
                                disableWhileProcessing
                                options={{
                                    preserveScroll: true,
                                    preserveState: true,
                                }}
                                className="bg-white p-6 shadow-[0_5px_18px_rgba(0,0,0,.08)] sm:p-8"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        {[
                                            {
                                                id: "name",
                                                label: "Name",
                                                type: "text",
                                                required: true,
                                                placeholder: "Full name",
                                                autoComplete: "name",
                                            },
                                            {
                                                id: "organization",
                                                label: "Organization",
                                                type: "text",
                                                placeholder:
                                                    "Organization name",
                                            },
                                            {
                                                id: "email",
                                                label: "Email address",
                                                type: "email",
                                                placeholder:
                                                    "email@example.com",
                                                autoComplete: "email",
                                            },
                                            {
                                                id: "phone",
                                                label: "Phone",
                                                type: "tel",
                                                required: true,
                                                placeholder: "Phone number",
                                                autoComplete: "tel",
                                            },
                                            {
                                                id: "address",
                                                label: "Address",
                                                type: "text",
                                                required: true,
                                                placeholder: "Street address",
                                                autoComplete: "street-address",
                                            },
                                        ].map((field) => (
                                            <label
                                                key={field.id}
                                                className="mb-5 block text-sm font-bold uppercase tracking-widest"
                                            >
                                                {field.label}
                                                <input
                                                    required={field.required}
                                                    name={field.id}
                                                    type={field.type}
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                    autoComplete={
                                                        field.autoComplete
                                                    }
                                                    className="mt-2 block w-full border border-zinc-300 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal outline-none transition placeholder:text-zinc-400 focus:border-[#1f7a3d] focus:ring-1 focus:ring-[#1f7a3d]"
                                                />
                                                <InputError
                                                    message={errors[field.id]}
                                                />
                                            </label>
                                        ))}
                                        {status && (
                                            <p
                                                role="status"
                                                className="mb-5 border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800"
                                            >
                                                {status}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="btn-71"
                                            >
                                                {processing && <Spinner />}
                                                Submit registration
                                            </button>
                                            <span className="text-xs text-zinc-500">
                                                Required fields are marked by
                                                your browser
                                            </span>
                                        </div>
                                    </>
                                )}
                            </Form>
                            <img
                                src="/assets/images/logo/logo.svg"
                                alt="Join Evergreen Team"
                                className="mx-auto w-full max-w-sm"
                            />
                        </div>
                    </section>
                </main>

                <footer className="border-t-[5px] border-[#1f7a3d] bg-white py-7 text-center text-sm text-zinc-600">
                    Copyright 2026 Evergreen Team. All rights reserved.
                </footer>
                <a
                    href="#home"
                    aria-label="Back to top"
                    className="fixed bottom-5 right-5 z-20 grid size-11 place-items-center bg-[#1f7a3d] text-white shadow-lg transition hover:bg-green-900"
                >
                    <ArrowUp size={21} />
                </a>
            </div>
        </>
    );
}

function SectionHeading({ title, copy }: { title: string; copy: string }) {
    return (
        <div>
            <h2 className="font-display text-5xl uppercase leading-none sm:text-6xl">
                {title}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                {copy}
            </p>
        </div>
    );
}
