import { Form } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { PlayerOption, Team } from '@/types';

type Props = {
    formProps: Pick<ComponentProps<typeof Form>, 'action' | 'method'>;
    team?: Team;
    players: PlayerOption[];
    selectedPlayers?: number[];
    submitLabel: string;
};

const selectClassName =
    'border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export default function TeamForm({
    formProps,
    team,
    players,
    selectedPlayers = [],
    submitLabel,
}: Props) {
    return (
        <Form {...formProps} className="max-w-2xl space-y-6">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={team?.name}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                name="slug"
                                defaultValue={team?.slug}
                                required
                            />
                            <InputError message={errors.slug} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="slogan">Slogan</Label>
                        <Input
                            id="slogan"
                            name="slogan"
                            defaultValue={team?.slogan}
                            required
                        />
                        <InputError message={errors.slogan} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="about">About</Label>
                        <textarea
                            id="about"
                            name="about"
                            rows={5}
                            defaultValue={team?.about}
                            required
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                        <InputError message={errors.about} />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="logo">Logo URL</Label>
                            <Input
                                id="logo"
                                name="logo"
                                defaultValue={team?.logo ?? ''}
                            />
                            <InputError message={errors.logo} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="banner">Banner URL</Label>
                            <Input
                                id="banner"
                                name="banner"
                                defaultValue={team?.banner}
                                required
                            />
                            <InputError message={errors.banner} />
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="established">Established</Label>
                            <Input
                                id="established"
                                name="established"
                                type="number"
                                min="0"
                                defaultValue={team?.established}
                                required
                            />
                            <InputError message={errors.established} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="is_external">Team type</Label>
                            <select
                                id="is_external"
                                name="is_external"
                                defaultValue={team?.is_external ? '1' : '0'}
                                className={selectClassName}
                            >
                                <option value="0">Club</option>
                                <option value="1">External</option>
                            </select>
                            <InputError message={errors.is_external} />
                        </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-3">
                        {(
                            [
                                ['matches', 'Matches'],
                                ['wins', 'Wins'],
                                ['titles', 'Titles'],
                            ] as const
                        ).map(([name, label]) => (
                            <div key={name} className="grid gap-2">
                                <Label htmlFor={name}>{label}</Label>
                                <Input
                                    id={name}
                                    name={name}
                                    type="number"
                                    min="0"
                                    defaultValue={team?.[name] ?? 0}
                                    required
                                />
                                <InputError message={errors[name]} />
                            </div>
                        ))}
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="captain_id">Captain</Label>
                            <select
                                id="captain_id"
                                name="captain_id"
                                defaultValue={team?.captain_id ?? ''}
                                className={selectClassName}
                            >
                                <option value="">None</option>
                                {players.map((player) => (
                                    <option key={player.id} value={player.id}>
                                        {player.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.captain_id} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="vice_captain_id">
                                Vice captain
                            </Label>
                            <select
                                id="vice_captain_id"
                                name="vice_captain_id"
                                defaultValue={team?.vice_captain_id ?? ''}
                                className={selectClassName}
                            >
                                <option value="">None</option>
                                {players.map((player) => (
                                    <option key={player.id} value={player.id}>
                                        {player.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.vice_captain_id} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="players">Roster</Label>
                        <select
                            id="players"
                            name="players[]"
                            multiple
                            size={8}
                            defaultValue={selectedPlayers.map(String)}
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        >
                            {players.map((player) => (
                                <option key={player.id} value={player.id}>
                                    {player.name}
                                </option>
                            ))}
                        </select>
                        <p className="text-sm text-muted-foreground">
                            Use Ctrl or Command to select multiple players.
                        </p>
                        <InputError
                            message={errors.players ?? errors['players.0']}
                        />
                    </div>
                    <Button disabled={processing}>{submitLabel}</Button>
                </>
            )}
        </Form>
    );
}
