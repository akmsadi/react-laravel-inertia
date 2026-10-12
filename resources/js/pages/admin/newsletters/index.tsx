import { Form, Head, Link } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import NewsletterManagementController from '@/actions/App/Http/Controllers/NewsletterManagementController';
import ResourcePagination from '@/components/resource-pagination';
import { Button } from '@/components/ui/button';
import newsletters from '@/routes/admin/newsletters';
import type { NewsletterSubscriber, Paginated } from '@/types';

type Props = {
    newsletters: Paginated<NewsletterSubscriber>;
};

export default function NewslettersIndex({ newsletters: paginated }: Props) {
    return (
        <>
            <Head title="Newsletter" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Newsletter</h1>
                    <Button asChild>
                        <Link href={newsletters.create()}>Add subscriber</Link>
                    </Button>
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Email</th>
                                <th className="px-4 py-2 font-medium">
                                    Subscribed
                                </th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.data.map((subscriber) => (
                                <tr key={subscriber.id} className="border-t">
                                    <td className="px-4 py-2 font-medium">
                                        {subscriber.email}
                                    </td>
                                    <td className="px-4 py-2">
                                        {subscriber.created_at?.slice(0, 10) ??
                                            '-'}
                                    </td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit subscriber"
                                        >
                                            <Link
                                                href={newsletters.edit(
                                                    subscriber.id,
                                                )}
                                                aria-label="Edit subscriber"
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>
                                        <Form
                                            {...NewsletterManagementController.destroy.form(
                                                subscriber.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete "${subscriber.email}"?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    title="Delete subscriber"
                                                    aria-label="Delete subscriber"
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
                                        No subscribers yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ResourcePagination data={paginated} label="subscribers" />
            </div>
        </>
    );
}

NewslettersIndex.layout = {
    breadcrumbs: [{ title: 'Newsletter', href: newsletters.index() }],
};
