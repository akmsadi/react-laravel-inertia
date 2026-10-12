import { Head } from '@inertiajs/react';
import VenueManagementController from '@/actions/App/Http/Controllers/VenueManagementController';
import VenueForm from '@/components/venue-form';
import venues from '@/routes/admin/venues';
import type { Venue } from '@/types';

export default function EditVenue({ venue }: { venue: Venue }) {
    return (
        <>
            <Head title={`Edit ${venue.name}`} />
            <div className="p-4">
                <VenueForm
                    formProps={VenueManagementController.update.form(venue.id)}
                    venue={venue}
                    submitLabel="Save changes"
                />
            </div>
        </>
    );
}

EditVenue.layout = {
    breadcrumbs: [
        { title: 'Venues', href: venues.index() },
        { title: 'Edit', href: venues.index() },
    ],
};
