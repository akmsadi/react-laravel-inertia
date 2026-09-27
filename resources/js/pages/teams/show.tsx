type TeamProps = {
    team: any;
};

type player = {
    id: number;
    name: string;
    linked_player_name?: string;
};
type achievement = any;

export default function Show({ team }: TeamProps) {
    console.log(team);
    return (
        <>
            {/* Team Banner */}
            <section className="relative overflow-hidden">
                <img
                    src={`/assets/images/teams/${team.banner}`}
                    className="h-100 w-full object-cover sm:h-125 lg:h-137.5"
                    alt="Team Banner"
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-white">
                    <div>
                        <img
                            src={`/assets/images/teams/${team.logo}`}
                            className="mx-auto mb-4 h-28 w-28 rounded-full object-cover shadow-xl sm:h-37.5 sm:w-37.5"
                            alt={team.name}
                        />
                        <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl font-display">
                            {team.name}
                        </h1>
                        <p className="mb-6 mt-2 text-lg sm:text-xl lg:text-2xl">
                            {team.slogan}
                        </p>
                        <a
                            href="#players"
                            className="inline-block rounded-lg bg-green-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-green-700 sm:text-lg"
                        >
                            View Squad
                        </a>
                    </div>
                </div>
            </section>

            {/* Team Stats */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { value: team.established, label: "Founded" },
                            { value: team.matches, label: "Matches" },
                            { value: team.wins, label: "Wins" },
                            { value: team.titles, label: "Titles" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="flex h-full flex-col items-center justify-center rounded-xl bg-white p-6 text-center shadow-sm"
                            >
                                <h2 className="text-3xl font-bold text-green-600 font-display">
                                    {stat.value}
                                </h2>

                                <p className="mt-1 text-gray-600">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Team */}
            <section className="bg-gray-100 py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid items-center gap-10 lg:grid-cols-2">
                        <div>
                            <img
                                src={`/assets/images/teams/${team.logo}`}
                                className="w-full rounded-xl object-contain shadow-lg"
                                alt={team.name}
                            />
                        </div>

                        <div>
                            <h2 className="mb-6 text-3xl font-bold text-gray-900 font-display">
                                {team.name}
                            </h2>

                            <p className="text-gray-600">{team.about}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 font-display">
                            Team Leadership
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Captain */}
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                            <img
                                src="/assets/images/empty-male.png"
                                className="h-auto w-full object-cover"
                                alt="Captain"
                            />

                            <div className="p-6 text-center">
                                <h4 className="text-xl font-semibold text-gray-900">
                                    {team.captain.name ?? "Not Assigned"}
                                </h4>

                                <p className="mt-1 font-semibold text-green-600">
                                    Captain
                                </p>
                            </div>
                        </div>

                        {/* Vice Captain */}
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                            <img
                                src="/assets/images/empty-male.png"
                                className="h-auto w-full object-cover"
                                alt="Vice Captain"
                            />

                            <div className="p-6 text-center">
                                <h4 className="text-xl font-semibold text-gray-900">
                                    {team.vice_captain.name ?? "Not Assigned"}
                                </h4>

                                <p className="mt-1 font-semibold text-green-600">
                                    Vice Captain
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Players */}
            <section id="players" className="bg-gray-100 py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 font-display">
                            Squad
                        </h2>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {team.players.map((member: player) => (
                            <div
                                key={member.id}
                                className="overflow-hidden rounded-xl bg-white shadow-sm"
                            >
                                <img
                                    src="/assets/images/empty-male.png"
                                    className="h-75 w-full object-cover"
                                    alt={
                                        member.linked_player_name ?? member.name
                                    }
                                />

                                <div className="p-5 text-center">
                                    <h5 className="text-lg font-semibold text-gray-900">
                                        {member.linked_player_name ??
                                            member.name}
                                    </h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 font-display">
                            Achievements
                        </h2>
                    </div>

                    {team.achievements?.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-3">
                            {team.achievements.map(
                                (achievement: achievement) => (
                                    <div
                                        key={achievement.id}
                                        className="rounded-xl border border-green-600 bg-white shadow-sm"
                                    >
                                        <div className="p-6">
                                            <h4 className="text-xl font-semibold text-green-600">
                                                {achievement.title}
                                            </h4>

                                            <p className="mt-3 text-gray-700">
                                                {achievement.description}
                                            </p>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">
                            No achievements recorded for this team yet.
                        </p>
                    )}
                </div>
            </section>
        </>
    );
}
