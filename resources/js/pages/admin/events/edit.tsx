import { Head } from '@inertiajs/react';
import EventManagementController from '@/actions/App/Http/Controllers/EventManagementController';
import EventForm from '@/components/event-form';
import events from '@/routes/admin/events';
import type { SportsEvent } from '@/types';

export default function EditEvent({ event }: { event: SportsEvent }) {
    return (
        <>
            <Head title={`Edit ${event.title}`} />
            <div className="p-4">
                <EventForm
                    formProps={EventManagementController.update.form(event.id)}
                    event={event}
                    submitLabel="Save changes"
                />
            </div>
        </>
    );
}

EditEvent.layout = {
    breadcrumbs: [
        { title: 'Events', href: events.index() },
        { title: 'Edit', href: events.index() },
    ],
};
