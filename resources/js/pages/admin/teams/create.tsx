import { Head } from '@inertiajs/react';
import TeamManagementController from '@/actions/App/Http/Controllers/TeamManagementController';
import TeamForm from '@/components/team-form';
import teams from '@/routes/admin/teams';
import type { PlayerOption } from '@/types';

export default function CreateTeam({ players }: { players: PlayerOption[] }) {
    return (
        <>
            <Head title="Create team" />
            <div className="p-4">
                <TeamForm
                    formProps={TeamManagementController.store.form()}
                    players={players}
                    submitLabel="Create team"
                />
            </div>
        </>
    );
}

CreateTeam.layout = {
    breadcrumbs: [
        { title: 'Teams', href: teams.index() },
        { title: 'Create', href: teams.create() },
    ],
};
