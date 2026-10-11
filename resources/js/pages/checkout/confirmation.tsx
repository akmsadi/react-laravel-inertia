import { Head, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { index as productsIndex } from '@/routes/products';

type OrderItem = {
    id: number;
    product_name: string;
    sku: string | null;
    quantity: number;
    unit_price: string | number;
    total_price: string | number;
};

type ShippingAddress = {
    first_name: string;
    last_name: string;
    street_address: string;
    city: string;
    state: string | null;
    postal_code: string;
    country: string;
};

type Order = {
    order_number: string;
    status: string;
    payment_status: string;
    subtotal: string | number;
    discount_amount: string | number;
    total_amount: string | number;
    notes: string | null;
    items: OrderItem[];
    shipping_address: ShippingAddress[];
};

function formatPrice(amount: string | number): string {
    return `$${Number(amount).toFixed(2)}`;
}

export default function CheckoutConfirmation({ order }: { order: Order }) {
    const address = order.shipping_address[0];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
                <Head title="Order confirmed" />

                <div className="border border-zinc-200 bg-white p-6 text-center sm:p-10">
                    <CheckCircle2
                        className="mx-auto size-12 text-[#1f7a3d]"
                        aria-hidden="true"
                    />
                    <h1 className="mt-4 text-2xl font-bold text-zinc-950">
                        Thank you for your order!
                    </h1>
                    <p className="mt-2 text-sm text-zinc-600">
                        Order{' '}
                        <span className="font-medium">
                            {order.order_number}
                        </span>{' '}
                        has been placed and is now {order.status}.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <section className="border border-zinc-200 bg-white p-5">
                        <h2 className="text-lg font-semibold text-zinc-950">
                            Items
                        </h2>
                        <div className="mt-4 divide-y divide-zinc-200">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start justify-between gap-3 py-3 text-sm"
                                >
                                    <div>
                                        <p className="font-medium text-zinc-950">
                                            {item.product_name}
                                        </p>
                                        <p className="text-zinc-600">
                                            Qty {item.quantity}
                                        </p>
                                    </div>
                                    <p className="font-medium text-zinc-950">
                                        {formatPrice(item.total_price)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {Number(order.discount_amount) > 0 && (
                            <div className="mt-4 flex items-center justify-between text-sm text-zinc-600">
                                <span>Discount</span>
                                <span>
                                    -{formatPrice(order.discount_amount)}
                                </span>
                            </div>
                        )}
                        <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-4 font-semibold text-zinc-950">
                            <span>Total</span>
                            <span>{formatPrice(order.total_amount)}</span>
                        </div>
                    </section>

                    {address && (
                        <section className="border border-zinc-200 bg-white p-5">
                            <h2 className="text-lg font-semibold text-zinc-950">
                                Shipping to
                            </h2>
                            <p className="mt-4 text-sm text-zinc-700">
                                {address.first_name} {address.last_name}
                                <br />
                                {address.street_address}
                                <br />
                                {address.city}
                                {address.state ? `, ${address.state}` : ''}{' '}
                                {address.postal_code}
                                <br />
                                {address.country}
                            </p>
                        </section>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href={productsIndex().url}
                        className="inline-flex items-center justify-center rounded-md bg-[#1f7a3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#176331]"
                    >
                        Continue shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
