import { Form, Head, Link, usePage } from "@inertiajs/react";
import InputError from "@/components/input-error";
import { Spinner } from "@/components/ui/spinner";
import { matchCenter } from "@/routes";
import { store as newsletterStore } from "@/routes/newsletter";
import { store } from "@/routes/player-registration";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Countdown from "@/layouts/public/countdown";
import SectionHeading from "@/layouts/public/section-heading";
import Slider from "@/layouts/public/slider";

function imageSource(image: { image_path?: string; src?: string }) {
    return image.src ?? `/${image.image_path}`;
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
    const { flash } = usePage().props;
    const status = (flash as { status?: string } | undefined)?.status;

    const [activeEvent, setActiveEvent] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    const activeImages = events[activeEvent]?.images ?? [];

    return (
        <>
            <Head title="Welcome" />

            <Slider />

            {/* Hero section */}
            <section
                id="hero"
                className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24"
            >
                <div className="grid gap-10 lg:grid-cols-[1.35fr_.95fr] lg:items-stretch">
                    <div>
                        <p className="text-sm font-bold tracking-[0.14em] text-[#1f7a3d] uppercase">
                            Cricket. Commitment. Community.
                        </p>
                        <h2 className="mt-3 font-display text-6xl leading-[0.86] uppercase sm:text-7xl">
                            Play bold with
                            <br />
                            <span className="text-[#1f7a3d]">
                                Evergreen Team
                            </span>
                        </h2>
                        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600">
                            We value smart cricket, high standards, and a
                            team-first culture that keeps improving every
                            season. Every session is designed to feel like match
                            preparation, not just attendance.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <a href="#join" className="btn-71">
                                Join the squad
                            </a>
                            <a href="#gallery" className="btn-71">
                                Events gallery
                            </a>
                            <Link
                                href={matchCenter()}
                                className="btn-71 bg-[#1f7a3d]"
                            >
                                Match center
                            </Link>
                        </div>
                    </div>
                    <Link
                        href={matchCenter()}
                        className="relative flex h-full flex-col justify-center overflow-hidden border border-green-900/10 bg-white p-7 text-center shadow-[0_5px_18px_rgba(0,0,0,.08)] sm:p-10"
                    >
                        <img
                            src="/assets/images/logo/logo.svg"
                            alt=""
                            aria-hidden="true"
                            className="absolute inset-0 m-auto w-2/3 opacity-[0.06]"
                        />
                        <div className="relative">
                            {nextMatch ? (
                                <>
                                    <p className="text-xs font-bold tracking-[0.16em] text-[#1f7a3d] uppercase">
                                        Next fixture
                                    </p>
                                    <h2 className="mt-2 font-display text-4xl leading-none uppercase sm:text-5xl">
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
                                        scheduledAt={nextMatch.scheduled_at}
                                    />
                                </>
                            ) : lastMatch ? (
                                <>
                                    <p className="text-xs font-bold tracking-[0.16em] text-[#1f7a3d] uppercase">
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
                                        Stay tuned for the next scheduled
                                        fixture.
                                    </p>
                                </>
                            )}
                        </div>
                    </Link>
                </div>
            </section>
            {/* Hero section */}

            {/* Teams section */}
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
                                        src={"assets/images/teams/" + team.logo}
                                        alt={team.name}
                                        className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                    />
                                ) : (
                                    <div className="grid aspect-square place-items-center bg-[#e8f2eb] font-display text-3xl text-[#1f7a3d] uppercase">
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
            {/* Teams section */}

            {/* Members section */}
            <section id="members" className="py-16 sm:py-24">
                <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <SectionHeading
                            title="Team members"
                            copy="Meet the individuals who make Evergreen Cricket Club stronger every day."
                        />
                        <p className="text-sm font-bold tracking-widest text-zinc-600 uppercase">
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
                                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent px-4 pt-16 pb-4 text-white">
                                    <h3 className="mt-1 font-display text-3xl leading-none uppercase">
                                        {player.name}
                                    </h3>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
            {/* Members section */}

            {/* Gallery section */}
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
                                                href={imageSource(image)}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setLightboxIndex(index);
                                                }}
                                                className="group aspect-4/3 overflow-hidden bg-zinc-100"
                                            >
                                                <img
                                                    src={imageSource(image)}
                                                    alt={
                                                        image.description ??
                                                        events[activeEvent]
                                                            ?.title ??
                                                        "Event photo"
                                                    }
                                                    className="size-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                            </a>
                                        ),
                                    )
                                ) : (
                                    <p className="col-span-full py-10 text-zinc-500">
                                        No images uploaded for this event yet.
                                    </p>
                                )}
                            </div>
                            <div className="border-l border-green-900/15 pl-0 lg:pl-6">
                                {events.map((event, index) => (
                                    <button
                                        type="button"
                                        key={event.id ?? index}
                                        onClick={() => setActiveEvent(index)}
                                        className={`mb-1 w-full border-l-4 px-4 py-3 text-left transition ${activeEvent === index ? "border-[#1f7a3d] bg-[#e8f2eb]" : "border-transparent hover:bg-zinc-50"}`}
                                    >
                                        <span className="font-display text-2xl uppercase">
                                            {event.title}
                                        </span>
                                        <span className="mt-1 block text-xs font-bold tracking-widest text-[#1f7a3d] uppercase">
                                            {event.images?.length ?? 0} photos
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
                <Lightbox
                    open={lightboxIndex >= 0}
                    index={lightboxIndex}
                    close={() => setLightboxIndex(-1)}
                    plugins={[Fullscreen, Zoom, Thumbnails]}
                    slides={activeImages.map((image: any) => ({
                        src: imageSource(image),
                        alt: image.description ?? "Event photo",
                    }))}
                />
            </section>
            {/* Gallery section */}

            {/* Join section */}
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
                                        placeholder: "Organization name",
                                    },
                                    {
                                        id: "email",
                                        label: "Email address",
                                        type: "email",
                                        placeholder: "email@example.com",
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
                                        className="mb-5 block text-sm font-bold tracking-widest uppercase"
                                    >
                                        {field.label}
                                        <input
                                            required={field.required}
                                            name={field.id}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            autoComplete={field.autoComplete}
                                            className="mt-2 block w-full border border-zinc-300 bg-white px-4 py-3 text-base font-normal tracking-normal normal-case transition outline-none placeholder:text-zinc-400 focus:border-[#1f7a3d] focus:ring-1 focus:ring-[#1f7a3d]"
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
                                        Required fields are marked by your
                                        browser
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
            {/* Join section */}

            {/* Newsletter section */}
            <section id="newsletter" className="bg-white py-16 sm:py-24">
                <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20">
                    <div>
                        <p className="text-sm font-bold tracking-[0.14em] uppercase">
                            Stay in the game
                        </p>
                        <h2 className="mt-3 font-display text-5xl leading-none uppercase sm:text-6xl">
                            Join our newsletter
                        </h2>
                        <p className="mt-5 max-w-xl text-base leading-8">
                            Get match updates, club news, event invitations, and
                            the latest Evergreen products delivered to your
                            inbox.
                        </p>
                    </div>
                    <Form
                        {...newsletterStore.form()}
                        resetOnSuccess
                        disableWhileProcessing
                        options={{
                            preserveScroll: true,
                            preserveState: true,
                        }}
                        className="bg-white p-6 text-zinc-950 shadow-[0_5px_18px_rgba(0,0,0,.12)] sm:p-8"
                    >
                        {({ processing, errors, wasSuccessful }) => (
                            <>
                                <label
                                    htmlFor="newsletter-email"
                                    className="text-sm font-bold tracking-widest uppercase"
                                >
                                    Email address
                                </label>
                                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                                    <input
                                        id="newsletter-email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="email@example.com"
                                        autoComplete="email"
                                        className="min-w-0 flex-1 border border-zinc-300 bg-white px-4 py-3 text-base transition outline-none placeholder:text-zinc-400 focus:border-[#1f7a3d] focus:ring-1 focus:ring-[#1f7a3d]"
                                    />
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="btn-71 shrink-0"
                                    >
                                        {processing && <Spinner />}
                                        Subscribe
                                    </button>
                                </div>
                                <InputError message={errors.email} />
                                {(wasSuccessful || status) && (
                                    <p
                                        role="status"
                                        className="mt-4 text-sm font-semibold text-[#1f7a3d]"
                                    >
                                        {status ?? "Thanks for subscribing."}
                                    </p>
                                )}
                                <p className="mt-4 text-xs text-zinc-500">
                                    We will only send you useful club updates.
                                    Unsubscribe whenever you like.
                                </p>
                            </>
                        )}
                    </Form>
                </div>
            </section>
            {/* Newsletter section */}
        </>
    );
}
