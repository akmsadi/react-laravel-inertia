import { Form } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import type { PlayerOption } from '@/types';

type Props = {
    formProps: Pick<ComponentProps<typeof Form>, 'action' | 'method'>;
    title: string;
    description?: string;
    players: PlayerOption[];
    selectedIds: number[];
    emptyMessage: string;
};

export default function PlayerChecklistForm({
    formProps,
    title,
    description,
    players,
    selectedIds,
    emptyMessage,
}: Props) {
    return (
        <Form
            {...formProps}
            options={{ preserveScroll: true }}
            className="max-w-xl space-y-4 border-t pt-6"
        >
            {({ processing, errors }) => (
                <>
                    <div>
                        <h2 className="text-lg font-semibold">{title}</h2>
                        {description && (
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                    </div>
                    {players.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            {emptyMessage}
                        </p>
                    ) : (
                        <div className="grid gap-2 sm:grid-cols-2">
                            {players.map((player) => (
                                <label
                                    key={player.id}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        name="player_ids[]"
                                        value={player.id}
                                        defaultChecked={selectedIds.includes(
                                            player.id,
                                        )}
                                        className="size-4"
                                    />
                                    {player.name}
                                </label>
                            ))}
                        </div>
                    )}
                    <InputError message={errors.player_ids} />
                    <Button disabled={processing}>Save {title.toLowerCase()}</Button>
                </>
            )}
        </Form>
    );
}
