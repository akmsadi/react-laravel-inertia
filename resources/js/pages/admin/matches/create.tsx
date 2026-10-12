import { Head } from '@inertiajs/react';
import MatchManagementController from '@/actions/App/Http/Controllers/MatchManagementController';
import MatchForm from '@/components/match-form';
import matches from '@/routes/admin/matches';
import type { Venue } from '@/types';

export default function CreateMatch({ venues }: { venues: Venue[] }) {
    return (
        <>
            <Head title="Create match" />
            <div className="p-4">
                <MatchForm
                    formProps={MatchManagementController.store.form()}
                    venues={venues}
                    submitLabel="Create match"
                />
            </div>
        </>
    );
}

CreateMatch.layout = {
    breadcrumbs: [
        { title: 'Matches', href: matches.index() },
        { title: 'Create', href: matches.create() },
    ],
};
