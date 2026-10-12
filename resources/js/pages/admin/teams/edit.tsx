import { Head } from '@inertiajs/react';
import TeamManagementController from '@/actions/App/Http/Controllers/TeamManagementController';
import TeamForm from '@/components/team-form';
import teams from '@/routes/admin/teams';
import type { PlayerOption, Team } from '@/types';

type Props = {
    team: Team;
    players: PlayerOption[];
    selectedPlayers: number[];
};

export default function EditTeam({ team, players, selectedPlayers }: Props) {
    return (
        <>
            <Head title={`Edit ${team.name}`} />
            <div className="p-4">
                <TeamForm
                    formProps={TeamManagementController.update.form(team.id)}
                    team={team}
                    players={players}
                    selectedPlayers={selectedPlayers}
                    submitLabel="Save changes"
                />
            </div>
        </>
    );
}

EditTeam.layout = {
    breadcrumbs: [
        { title: 'Teams', href: teams.index() },
        { title: 'Edit', href: teams.index() },
    ],
};
