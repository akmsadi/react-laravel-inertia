import { Head } from '@inertiajs/react';
import MatchManagementController from '@/actions/App/Http/Controllers/MatchManagementController';
import MatchForm from '@/components/match-form';
import matches from '@/routes/admin/matches';
import type { MatchRecord, Venue } from '@/types';

type Props = {
    match: MatchRecord;
    venues: Venue[];
};

export default function EditMatch({ match, venues }: Props) {
    return (
        <>
            <Head title={`Edit ${match.team_name} vs ${match.opponent_name}`} />
            <div className="p-4">
                <MatchForm
                    formProps={MatchManagementController.update.form(match.id)}
                    match={match}
                    venues={venues}
                    submitLabel="Save changes"
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
