import { Head } from '@inertiajs/react';
import MatchManagementController from '@/actions/App/Http/Controllers/MatchManagementController';
import MatchForm from '@/components/match-form';
import MatchSquadForm from '@/components/match-squad-form';
import matches from '@/routes/admin/matches';
import type {
    MatchRecord,
    MatchSquadEntry,
    SquadPlayerOption,
    Venue,
} from '@/types';

type Props = {
    match: MatchRecord;
    venues: Venue[];
    playerOptions: SquadPlayerOption[];
    squad: MatchSquadEntry[];
};

export default function EditMatch({ match, venues, playerOptions, squad }: Props) {
    return (
        <>
            <Head title={`Edit ${match.team_name} vs ${match.opponent_name}`} />
            <div className="space-y-6 p-4">
                <MatchForm
                    formProps={MatchManagementController.update.form(match.id)}
                    match={match}
                    venues={venues}
                    submitLabel="Save changes"
                />
                <MatchSquadForm
                    match={match}
                    playerOptions={playerOptions}
                    squad={squad}
                />
            </div>
        </>
    );
}

EditMatch.layout = {
    breadcrumbs: [
        { title: 'Matches', href: matches.index() },
        { title: 'Edit', href: matches.index() },
    ],
};
