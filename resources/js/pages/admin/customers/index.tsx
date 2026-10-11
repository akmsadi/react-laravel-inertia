import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CustomerManagementController from '@/actions/App/Http/Controllers/CustomerManagementController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import customers from '@/routes/admin/customers';
import type { AdminCustomer, Paginated } from '@/types';

type Props = {
    customers: Paginated<AdminCustomer>;
    filters: { search: string };
};

export default function CustomersIndex({
    customers: paginated,
    filters,
}: Props) {
    const [search, setSearch] = useState(filters.search);
    const { errors } = usePage().props as { errors: Record<string, string> };

    return (
        <>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Customers</h1>
                    <Button asChild>
                        <Link href={customers.create()}>New customer</Link>
                    </Button>
                </div>

                <form
                    className="flex gap-2"
                    onSubmit={(event) => {
                        event.preventDefault();
                        router.get(
                            customers.index.url(),
                            { search },
                            { preserveState: true, replace: true },
                        );
                    }}
                >
                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search name, email or phone"
                        className="max-w-xs"
                    />
                    <Button variant="outline">Search</Button>
                </form>

                <InputError message={errors.customer} />

                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Name</th>
                                <th className="px-4 py-2 font-medium">Email</th>
                                <th className="px-4 py-2 font-medium">Phone</th>
                                <th className="px-4 py-2 font-medium">
                                    Orders
                                </th>
                                <th className="px-4 py-2 font-medium">
                                    Joined
                                </th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.data.map((customer) => (
                                <tr key={customer.id} className="border-t">
                                    <td className="px-4 py-2">
                                        {customer.name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {customer.email}
                                    </td>
                                    <td className="px-4 py-2">
                                        {customer.phone ?? '—'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {customer.orders_count}
                                    </td>
                                    <td className="px-4 py-2">
                                        {new Date(
                                            customer.created_at,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit customer"
                                            aria-label="Edit customer"
                                        >
                                            <Link
                                                href={customers.edit(
                                                    customer.id,
                                                )}
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>
                                        <Form
                                            {...CustomerManagementController.destroy.form(
                                                customer.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete customer "${customer.name}"?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    title="Delete customer"
                                                    aria-label="Delete customer"
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
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {paginated.last_page > 1 && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Page {paginated.current_page} of{' '}
                            {paginated.last_page} ({paginated.total} customers)
                        </span>
                        <div className="flex gap-2">
                            {paginated.prev_page_url && (
                                <Button asChild variant="outline" size="sm">
                                    <Link href={paginated.prev_page_url}>
                                        Previous
                                    </Link>
                                </Button>
                            )}
                            {paginated.next_page_url && (
                                <Button asChild variant="outline" size="sm">
                                    <Link href={paginated.next_page_url}>
                                        Next
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

CustomersIndex.layout = {
    breadcrumbs: [{ title: 'Customers', href: customers.index() }],
};
