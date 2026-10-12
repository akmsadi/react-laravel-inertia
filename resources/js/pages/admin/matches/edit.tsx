import { Head } from '@inertiajs/react';
import MatchManagementController from '@/actions/App/Http/Controllers/MatchManagementController';
import MatchPlayerController from '@/actions/App/Http/Controllers/MatchPlayerController';
import MatchForm from '@/components/match-form';
import PlayerChecklistForm from '@/components/player-checklist-form';
import matches from '@/routes/admin/matches';
import type { MatchRecord, PlayerOption, Venue } from '@/types';

type Props = {
    match: MatchRecord;
    venues: Venue[];
    playerOptions: PlayerOption[];
    playerIds: number[];
};

export default function EditMatch({ match, venues, playerOptions, playerIds }: Props) {
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
                <PlayerChecklistForm
                    formProps={MatchPlayerController.update.form(match.id)}
                    title="Players"
                    description="Approved players taking part in this match."
                    players={playerOptions}
                    selectedIds={playerIds}
                    emptyMessage="No approved players yet."
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
