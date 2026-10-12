import { Form, Head, Link } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import EventManagementController from '@/actions/App/Http/Controllers/EventManagementController';
import ResourcePagination from '@/components/resource-pagination';
import { Button } from '@/components/ui/button';
import events from '@/routes/admin/events';
import type { Paginated, SportsEvent } from '@/types';

type Props = {
    events: Paginated<SportsEvent>;
};

export default function EventsIndex({ events: paginated }: Props) {
    return (
        <>
            <Head title="Events" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Events</h1>
                    <Button asChild>
                        <Link href={events.create()}>New event</Link>
                    </Button>
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Title</th>
                                <th className="px-4 py-2 font-medium">
                                    Description
                                </th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.data.map((event) => (
                                <tr key={event.id} className="border-t">
                                    <td className="px-4 py-2">{event.title}</td>
                                    <td className="max-w-xl truncate px-4 py-2">
                                        {event.description ?? '-'}
                                    </td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit event"
                                        >
                                            <Link
                                                href={events.edit(event.id)}
                                                aria-label="Edit event"
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>
                                        <Form
                                            {...EventManagementController.destroy.form(
                                                event.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete "${event.title}"?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    title="Delete event"
                                                    aria-label="Delete event"
                                                    disabled={processing}
                                                >
                                                    <Trash2 />
                                                </Button>
                                            )}
                                        </Form>
                                    </td>
                                </tr>
                            ))}
                            {paginated.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No events yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ResourcePagination data={paginated} label="events" />
            </div>
        </>
    );
}

EventsIndex.layout = {
    breadcrumbs: [{ title: 'Events', href: events.index() }],
};
