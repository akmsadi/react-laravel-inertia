import type { BatsmanLeaderboardRow, BowlerLeaderboardRow } from '@/types';

type Props = {
    batsmen: BatsmanLeaderboardRow[];
    bowlers: BowlerLeaderboardRow[];
};

type Column<Row> = {
    label: string;
    render: (row: Row) => string | number;
    highlight?: boolean;
};

const batsmenColumns: Column<BatsmanLeaderboardRow>[] = [
    { label: 'Mat', render: (row) => row.matches },
    { label: 'Inn', render: (row) => row.innings },
    { label: 'Runs', render: (row) => row.runs, highlight: true },
    { label: 'Balls', render: (row) => row.balls },
    { label: '4s', render: (row) => row.fours },
    { label: '6s', render: (row) => row.sixes },
    { label: 'R (B)', render: (row) => row.highest },
    { label: 'SR', render: (row) => row.strike_rate },
    { label: 'Avg', render: (row) => row.average },
];

const bowlersColumns: Column<BowlerLeaderboardRow>[] = [
    { label: 'Matches', render: (row) => row.matches },
    { label: 'Inn', render: (row) => row.innings },
    { label: 'Wickets', render: (row) => row.wickets, highlight: true },
    { label: 'Overs', render: (row) => row.overs },
    { label: 'Runs', render: (row) => row.runs },
    { label: 'W / R', render: (row) => row.best },
    { label: 'Economy', render: (row) => row.economy },
];

type BoardProps<Row extends { id: number; name: string }> = {
    title: string;
    subtitle: string;
    rows: Row[];
    columns: Column<Row>[];
    panelClassName: string;
    rankClassName: string;
};

function Board<Row extends { id: number; name: string }>({
    title,
    subtitle,
    rows,
    columns,
    panelClassName,
    rankClassName,
}: BoardProps<Row>) {
    return (
        <section
            className={`overflow-x-auto rounded-xl p-4 text-white ${panelClassName}`}
        >
            <h2 className="text-center text-2xl font-extrabold tracking-wide uppercase">
                {title}
            </h2>
            <p className="mb-4 text-center text-[10px] font-bold tracking-wider text-yellow-400 uppercase">
                {subtitle}
            </p>
            <table className="w-full min-w-[34rem] text-left text-sm">
                <thead>
                    <tr className="bg-white/10 text-xs tracking-wider text-white/80 uppercase">
                        <th className="rounded-l-md px-3 py-2">#</th>
                        <th className="px-3 py-2">Name</th>
                        {columns.map((column, index) => (
                            <th
                                key={column.label}
                                className={`px-3 py-2 ${index === columns.length - 1 ? 'rounded-r-md' : ''}`}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={row.id}
                            className="border-t border-white/5 odd:bg-white/5"
                        >
                            <td className="px-3 py-2">
                                <span
                                    className={`inline-flex size-7 items-center justify-center rounded-md text-xs font-bold ${rankClassName}`}
                                >
                                    {index + 1}
                                </span>
                            </td>
                            <td className="px-3 py-2 font-semibold">
                                {row.name}
                            </td>
                            {columns.map((column) => (
                                <td
                                    key={column.label}
                                    className={`px-3 py-2 ${column.highlight ? 'text-base font-extrabold text-yellow-400' : ''}`}
                                >
                                    {column.render(row)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {rows.length === 0 && (
                        <tr>
                            <td
                                colSpan={columns.length + 2}
                                className="px-3 py-6 text-center text-white/60"
                            >
                                No recorded matches yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default function ClubLeaderboards({ batsmen, bowlers }: Props) {
    return (
        <div className="grid gap-4 xl:grid-cols-2">
            <Board
                title="Top 10 Batsmen"
                subtitle="Ranked by total runs across recorded matches"
                rows={batsmen}
                columns={batsmenColumns}
                panelClassName="bg-gradient-to-br from-[#0b1a4a] to-[#12245f]"
                rankClassName="bg-blue-600"
            />
            <Board
                title="Top 10 Bowlers"
                subtitle="Ranked by wickets, then economy rate"
                rows={bowlers}
                columns={bowlersColumns}
                panelClassName="bg-gradient-to-br from-[#0a1f10] to-[#14331b]"
                rankClassName="bg-green-600"
            />
        </div>
    );
}
