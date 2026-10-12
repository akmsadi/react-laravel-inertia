import { useForm } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import MatchPlayerController from '@/actions/App/Http/Controllers/MatchPlayerController';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type {
    MatchRecord,
    MatchSquadEntry,
    SquadPlayerOption,
} from '@/types';

type Props = {
    match: MatchRecord;
    playerOptions: SquadPlayerOption[];
    squad: MatchSquadEntry[];
};

type Side = MatchSquadEntry['side'];

const selectClassName =
    'border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export default function MatchSquadForm({ match, playerOptions, squad }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        players: squad,
    });

    const optionFor = (playerId: number) =>
        playerOptions.find((option) => option.id === playerId);

    const available = playerOptions.filter(
        (option) =>
            !data.players.some((entry) => entry.player_id === option.id),
    );

    const addPlayer = (side: Side, playerId: number) =>
        setData('players', [
            ...data.players,
            { player_id: playerId, side, is_captain: false },
        ]);

    const removePlayer = (playerId: number) =>
        setData(
            'players',
            data.players.filter((entry) => entry.player_id !== playerId),
        );

    const toggleCaptain = (playerId: number, side: Side) =>
        setData(
            'players',
            data.players.map((entry) =>
                entry.side !== side
                    ? entry
                    : {
                          ...entry,
                          is_captain:
                              entry.player_id === playerId
                                  ? !entry.is_captain
                                  : false,
                      },
            ),
        );

    const sides: { side: Side; title: string }[] = [
        { side: 'team_a', title: match.team_name },
        { side: 'team_b', title: match.opponent_name },
    ];

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                put(MatchPlayerController.update.url(match.id), {
                    preserveScroll: true,
                });
            }}
            className="space-y-4 border-t pt-6"
        >
            <h2 className="text-lg font-semibold">Participants</h2>
            <div className="grid gap-4 lg:grid-cols-2">
                {sides.map(({ side, title }) => (
                    <div key={side} className="rounded-lg border p-4">
                        <h3 className="mb-2 font-medium">{title}</h3>
                        <ul>
                            {data.players
                                .filter((entry) => entry.side === side)
                                .map((entry) => {
                                    const option = optionFor(entry.player_id);

                                    return (
                                        <li
                                            key={entry.player_id}
                                            className="flex items-center justify-between gap-2 border-b py-2 text-sm last:border-b-0"
                                        >
                                            <span>
                                                {option?.name}
                                                {option?.guest_of_name && (
                                                    <span className="ml-1 text-xs text-muted-foreground">
                                                        (Guest -{' '}
                                                        {option.guest_of_name})
                                                    </span>
                                                )}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleCaptain(
                                                            entry.player_id,
                                                            side,
                                                        )
                                                    }
                                                    title="Toggle captain"
                                                >
                                                    {entry.is_captain ? (
                                                        <Badge>Captain</Badge>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground hover:underline">
                                                            Make captain
                                                        </span>
                                                    )}
                                                </button>
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="ghost"
                                                    title="Remove player"
                                                    aria-label="Remove player"
                                                    onClick={() =>
                                                        removePlayer(
                                                            entry.player_id,
                                                        )
                                                    }
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </span>
                                        </li>
                                    );
                                })}
                        </ul>
                        <select
                            aria-label={`Add player to ${title}`}
                            value=""
                            onChange={(event) =>
                                event.target.value &&
                                addPlayer(side, Number(event.target.value))
                            }
                            className={`${selectClassName} mt-3`}
                        >
                            <option value="">Add player…</option>
                            {available.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                    {option.guest_of_name
                                        ? ` (Guest - ${option.guest_of_name})`
                                        : ''}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            <InputError message={errors.players} />
            <Button disabled={processing}>Save participants</Button>
        </form>
    );
}
