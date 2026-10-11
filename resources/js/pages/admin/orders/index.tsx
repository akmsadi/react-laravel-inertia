import { Head, Link, router } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import orders from '@/routes/admin/orders';
import type { Order, Paginated } from '@/types';

type Props = {
    orders: Paginated<Order>;
    filters: { status: string; search: string };
    statuses: string[];
    stats: {
        total_orders: number;
        pending_orders: number;
        paid_revenue: string;
        unpaid_orders: number;
    };
};

const selectClassName =
    'border-input bg-transparent h-9 rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export default function OrdersIndex({
    orders: paginated,
    filters,
    statuses,
    stats,
}: Props) {
    const [search, setSearch] = useState(filters.search);

    const applyFilters = (next: Partial<Props['filters']>) => {
        router.get(
            orders.index.url(),
            { ...filters, ...next },
            { preserveState: true, replace: true },
        );
    };

    const cards = [
        { label: 'Total orders', value: stats.total_orders },
        { label: 'Pending orders', value: stats.pending_orders },
        { label: 'Unpaid orders', value: stats.unpaid_orders },
        { label: 'Paid revenue', value: stats.paid_revenue },
    ];

    return (
        <>
            <Head title="Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">Orders</h1>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => (
                        <div key={card.label} className="rounded-lg border p-4">
                            <div className="text-sm text-muted-foreground">
                                {card.label}
                            </div>
                            <div className="mt-1 text-2xl font-semibold">
                                {card.value}
                            </div>
                        </div>
                    ))}
                </div>

                <form
                    className="flex flex-wrap gap-2"
                    onSubmit={(event) => {
                        event.preventDefault();
                        applyFilters({ search });
                    }}
                >
                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search order # or customer"
                        className="max-w-xs"
                    />
                    <select
                        value={filters.status}
                        onChange={(event) =>
                            applyFilters({ status: event.target.value })
                        }
                        className={selectClassName}
                        aria-label="Filter by status"
                    >
                        <option value="">All statuses</option>
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <Button variant="outline">Search</Button>
                </form>

                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Order</th>
                                <th className="px-4 py-2 font-medium">
                                    Customer
                                </th>
                                <th className="px-4 py-2 font-medium">Date</th>
                                <th className="px-4 py-2 font-medium">Items</th>
                                <th className="px-4 py-2 font-medium">Total</th>
                                <th className="px-4 py-2 font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-2 font-medium">
                                    Payment
                                </th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.data.map((order) => (
                                <tr key={order.id} className="border-t">
                                    <td className="px-4 py-2">
                                        {order.order_number}
                                    </td>
                                    <td className="px-4 py-2">
                                        {order.customer?.name ?? 'Guest'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {new Date(
                                            order.created_at,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2">
                                        {order.items_count}
                                    </td>
                                    <td className="px-4 py-2">
                                        {order.total_amount}
                                    </td>
                                    <td className="px-4 py-2">
                                        <Badge variant="secondary">
                                            {order.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-2">
                                        <Badge
                                            variant={
                                                order.payment_status === 'paid'
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                        >
                                            {order.payment_status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit order"
                                            aria-label="Edit order"
                                        >
                                            <Link href={orders.show(order.id)}>
                                                <Pencil />
                                            </Link>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {paginated.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No orders found.
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
                            {paginated.last_page} ({paginated.total} orders)
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

OrdersIndex.layout = {
    breadcrumbs: [{ title: 'Orders', href: orders.index() }],
};
