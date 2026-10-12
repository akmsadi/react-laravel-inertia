import { Head } from '@inertiajs/react';
import PlayerManagementController from '@/actions/App/Http/Controllers/PlayerManagementController';
import PlayerForm from '@/components/player-form';
import playersRoute from '@/routes/admin/players';
import type { Player, PlayerOption } from '@/types';

type Props = {
    player: Player;
    players: PlayerOption[];
};

export default function EditPlayer({ player, players }: Props) {
    return (
        <>
            <Head title={`Edit ${player.name}`} />
            <div className="p-4">
                <PlayerForm
                    formProps={PlayerManagementController.update.form(
                        player.id,
                    )}
                    player={player}
                    players={players}
                    submitLabel="Save changes"
                />
            </div>
        </>
    );
}

EditPlayer.layout = {
    breadcrumbs: [
        { title: 'Players', href: playersRoute.index() },
        { title: 'Edit', href: playersRoute.index() },
    ],
};
