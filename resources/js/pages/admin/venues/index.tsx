import { Form, Head, Link } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import VenueManagementController from '@/actions/App/Http/Controllers/VenueManagementController';
import ResourcePagination from '@/components/resource-pagination';
import { Button } from '@/components/ui/button';
import venues from '@/routes/admin/venues';
import type { Paginated, Venue } from '@/types';

type Props = {
    venues: Paginated<Venue>;
};

export default function VenuesIndex({ venues: paginated }: Props) {
    return (
        <>
            <Head title="Venues" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Venues</h1>
                    <Button asChild>
                        <Link href={venues.create()}>New venue</Link>
                    </Button>
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Name</th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.data.map((venue) => (
                                <tr key={venue.id} className="border-t">
                                    <td className="px-4 py-2">{venue.name}</td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit venue"
                                        >
                                            <Link
                                                href={venues.edit(venue.id)}
                                                aria-label="Edit venue"
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>
                                        <Form
                                            {...VenueManagementController.destroy.form(
                                                venue.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete "${venue.name}"?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    title="Delete venue"
                                                    aria-label="Delete venue"
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
                                        colSpan={2}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No venues yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ResourcePagination data={paginated} label="venues" />
            </div>
        </>
    );
}

VenuesIndex.layout = {
    breadcrumbs: [{ title: 'Venues', href: venues.index() }],
};
