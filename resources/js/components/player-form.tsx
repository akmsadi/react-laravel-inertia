import { Form } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Player, PlayerOption } from '@/types';

type Props = {
    formProps: Pick<ComponentProps<typeof Form>, 'action' | 'method'>;
    player?: Player;
    players: PlayerOption[];
    submitLabel: string;
};

const selectClassName =
    'border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export default function PlayerForm({
    formProps,
    player,
    players,
    submitLabel,
}: Props) {
    return (
        <Form {...formProps} className="max-w-xl space-y-6">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={player?.name}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="nickname">Nickname</Label>
                        <Input
                            id="nickname"
                            name="nickname"
                            defaultValue={player?.nickname}
                            required
                        />
                        <InputError message={errors.nickname} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="organization">Organization</Label>
                        <Input
                            id="organization"
                            name="organization"
                            defaultValue={player?.organization ?? ''}
                        />
                        <InputError message={errors.organization} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={player?.email ?? ''}
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            defaultValue={player?.phone}
                            required
                        />
                        <InputError message={errors.phone} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <textarea
                            id="address"
                            name="address"
                            rows={3}
                            defaultValue={player?.address}
                            required
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                        <InputError message={errors.address} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                            id="status"
                            name="status"
                            defaultValue={player?.status ?? 'pending'}
                            className={selectClassName}
                        >
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                            <option value="guest">Guest</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <InputError message={errors.status} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="guest_of_player_id">Guest of</Label>
                        <select
                            id="guest_of_player_id"
                            name="guest_of_player_id"
                            defaultValue={player?.guest_of_player_id ?? ''}
                            className={selectClassName}
                        >
                            <option value="">None</option>
                            {players.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.guest_of_player_id} />
                    </div>
                    <Button disabled={processing}>{submitLabel}</Button>
                </>
            )}
        </Form>
    );
}
