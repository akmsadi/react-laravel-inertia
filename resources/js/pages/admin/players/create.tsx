import { Head } from '@inertiajs/react';
import PlayerManagementController from '@/actions/App/Http/Controllers/PlayerManagementController';
import PlayerForm from '@/components/player-form';
import playersRoute from '@/routes/admin/players';
import type { PlayerOption } from '@/types';

export default function CreatePlayer({ players }: { players: PlayerOption[] }) {
    return (
        <>
            <Head title="Create player" />
            <div className="p-4">
                <PlayerForm
                    formProps={PlayerManagementController.store.form()}
                    players={players}
                    submitLabel="Create player"
                />
            </div>
        </>
    );
}

CreatePlayer.layout = {
    breadcrumbs: [
        { title: 'Players', href: playersRoute.index() },
        { title: 'Create', href: playersRoute.create() },
    ],
};
