import { Head } from '@inertiajs/react';
import EventManagementController from '@/actions/App/Http/Controllers/EventManagementController';
import EventForm from '@/components/event-form';
import events from '@/routes/admin/events';

export default function CreateEvent() {
    return (
        <>
            <Head title="Create event" />
            <div className="p-4">
                <EventForm
                    formProps={EventManagementController.store.form()}
                    submitLabel="Create event"
                />
            </div>
        </>
    );
}

CreateEvent.layout = {
    breadcrumbs: [
        { title: 'Events', href: events.index() },
        { title: 'Create', href: events.create() },
    ],
};
