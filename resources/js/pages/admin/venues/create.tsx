import { Head } from '@inertiajs/react';
import VenueManagementController from '@/actions/App/Http/Controllers/VenueManagementController';
import VenueForm from '@/components/venue-form';
import venues from '@/routes/admin/venues';

export default function CreateVenue() {
    return (
        <>
            <Head title="Create venue" />
            <div className="p-4">
                <VenueForm
                    formProps={VenueManagementController.store.form()}
                    submitLabel="Create venue"
                />
            </div>
        </>
    );
}

CreateVenue.layout = {
    breadcrumbs: [
        { title: 'Venues', href: venues.index() },
        { title: 'Create', href: venues.create() },
    ],
};
