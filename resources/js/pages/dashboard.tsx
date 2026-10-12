import { Head, Link } from '@inertiajs/react';
import ClubLeaderboards from '@/components/club-leaderboards';
import { Badge } from '@/components/ui/badge';
import { dashboard } from '@/routes';
import inventory from '@/routes/admin/inventory';
import orders from '@/routes/admin/orders';
import type { BatsmanLeaderboardRow, BowlerLeaderboardRow } from '@/types';

type Props = {
    leaderboards: {
        batsmen: BatsmanLeaderboardRow[];
        bowlers: BowlerLeaderboardRow[];
    };
    shop: {
        stats: {
            revenue: string;
            revenue_30_days: string;
            orders_today: number;
            pending_orders: number;
            customers: number;
            products: number;
            low_stock: number;
        };
        recent_orders: {
            id: number;
            order_number: string;
            status: string;
            payment_status: string;
            total_amount: string;
            customer: { id: number; name: string } | null;
        }[];
        low_stock_items: {
            name: string;
            sku: string | null;
            stock_quantity: number;
        }[];
    };
};

export default function Dashboard({ shop, leaderboards }: Props) {
    const { stats } = shop;
    const cards = [
        { label: 'Paid revenue', value: stats.revenue },
        { label: 'Revenue (30 days)', value: stats.revenue_30_days },
        { label: 'Orders today', value: stats.orders_today },
        { label: 'Pending orders', value: stats.pending_orders },
        { label: 'Customers', value: stats.customers },
        { label: 'Products', value: stats.products },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

                <div className="grid gap-4 lg:grid-cols-2">
                    <section className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <h2 className="font-medium">Recent orders</h2>
                            <Link
                                href={orders.index()}
                                className="text-sm text-muted-foreground underline"
                            >
                                View all
                            </Link>
                        </div>
                        <ul className="divide-y text-sm">
                            {shop.recent_orders.map((order) => (
                                <li
                                    key={order.id}
                                    className="flex items-center justify-between gap-2 py-2"
                                >
                                    <Link
                                        href={orders.show(order.id)}
                                        className="font-medium"
                                    >
                                        {order.order_number}
                                    </Link>
                                    <span className="text-muted-foreground">
                                        {order.customer?.name ?? 'Guest'}
                                    </span>
                                    <Badge variant="secondary">
                                        {order.status}
                                    </Badge>
                                    <span>{order.total_amount}</span>
                                </li>
                            ))}
                            {shop.recent_orders.length === 0 && (
                                <li className="py-2 text-muted-foreground">
                                    No orders yet.
                                </li>
                            )}
                        </ul>
                    </section>

                    <section className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <h2 className="font-medium">
                                Low stock ({stats.low_stock})
                            </h2>
                            <Link
                                href={inventory.index({ query: { low: 1 } })}
                                className="text-sm text-muted-foreground underline"
                            >
                                Manage
                            </Link>
                        </div>
                        <ul className="divide-y text-sm">
                            {shop.low_stock_items.map((item) => (
                                <li
                                    key={`${item.sku}-${item.name}`}
                                    className="flex items-center justify-between py-2"
                                >
                                    <span>{item.name}</span>
                                    <Badge variant="destructive">
                                        {item.stock_quantity}
                                    </Badge>
                                </li>
                            ))}
                            {shop.low_stock_items.length === 0 && (
                                <li className="py-2 text-muted-foreground">
                                    Everything is well stocked.
                                </li>
                            )}
                        </ul>
                    </section>
                </div>

                <ClubLeaderboards
                    batsmen={leaderboards.batsmen}
                    bowlers={leaderboards.bowlers}
                />
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
