import { Form, Link } from '@inertiajs/react';
import { ArrowLeft, Check, ShoppingCart, Trash2 } from 'lucide-react';
import CartController from '@/actions/App/Http/Controllers/CartController';
import ProductController from '@/actions/App/Http/Controllers/ProductController';

type CartItem = {
    key: string;
    product_id: number;
    product_name: string;
    variant_id: number | null;
    variant_name: string | null;
    attributes: { name: string; value: string }[];
    sku: string | null;
    image_url: string | null;
    quantity: number;
    stock_quantity: number;
    unit_price: number;
    line_total: number;
    is_available: boolean;
};

type PageProps = {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
};

function formatPrice(amount: number): string {
    return `$${amount.toFixed(2)}`;
}

export default function CartIndex({ items, itemCount, subtotal }: PageProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <Link
                    href={ProductController.index.url()}
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Continue shopping
                </Link>

                <div className="mb-8 flex items-end justify-between gap-4 border-b border-zinc-200 pb-5">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-950">
                            Your cart
                        </h1>
                        <p className="mt-1 text-sm text-zinc-600">
                            {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        </p>
                    </div>
                    <ShoppingCart
                        className="mb-1 size-6 text-[#1f7a3d]"
                        aria-hidden="true"
                    />
                </div>

                {items.length === 0 ? (
                    <div className="py-16 text-center">
                        <h2 className="text-xl font-semibold text-zinc-900">
                            Your cart is empty
                        </h2>
                        <p className="mt-2 text-zinc-600">
                            Find something you would like to take home.
                        </p>
                        <Link
                            href={ProductController.index.url()}
                            className="mt-6 inline-flex items-center justify-center rounded-md bg-[#1f7a3d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#176331]"
                        >
                            Browse products
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
                        <section
                            aria-label="Cart items"
                            className="divide-y divide-zinc-200 border-y border-zinc-200"
                        >
                            {items.map((item) => (
                                <article
                                    key={item.key}
                                    className="grid gap-4 py-6 sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:items-start"
                                >
                                    <Link
                                        href={ProductController.show.url(
                                            item.product_id,
                                        )}
                                        className="aspect-square w-24 overflow-hidden rounded-md bg-zinc-100"
                                        aria-label={`View ${item.product_name}`}
                                    >
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.product_name}
                                                className="size-full object-cover"
                                            />
                                        ) : (
                                            <span className="grid size-full place-items-center px-2 text-center text-xs text-zinc-500">
                                                No image
                                            </span>
                                        )}
                                    </Link>

                                    <div className="min-w-0 space-y-3">
                                        <div>
                                            <Link
                                                href={ProductController.show.url(
                                                    item.product_id,
                                                )}
                                                className="font-semibold text-zinc-950 hover:text-[#1f7a3d]"
                                            >
                                                {item.product_name}
                                            </Link>
                                            {item.variant_name && (
                                                <p className="mt-1 text-sm text-zinc-700">
                                                    {item.variant_name}
                                                </p>
                                            )}
                                            {item.attributes.length > 0 && (
                                                <p className="mt-1 text-sm text-zinc-600">
                                                    {item.attributes
                                                        .map(
                                                            (attribute) =>
                                                                `${attribute.name}: ${attribute.value}`,
                                                        )
                                                        .join(' · ')}
                                                </p>
                                            )}
                                            {item.sku && (
                                                <p className="mt-1 text-xs text-zinc-500">
                                                    SKU: {item.sku}
                                                </p>
                                            )}
                                        </div>

                                        {item.is_available ? (
                                            <Form
                                                action={CartController.update.url(
                                                    item.key,
                                                )}
                                                method="patch"
                                                options={{
                                                    preserveScroll: true,
                                                }}
                                                className="flex flex-wrap items-start gap-2"
                                            >
                                                {({ processing, errors }) => (
                                                    <>
                                                        <label
                                                            className="sr-only"
                                                            htmlFor={`quantity-${item.key}`}
                                                        >
                                                            Quantity for{' '}
                                                            {item.product_name}
                                                        </label>
                                                        <input
                                                            id={`quantity-${item.key}`}
                                                            type="number"
                                                            name="quantity"
                                                            min={1}
                                                            max={
                                                                item.stock_quantity
                                                            }
                                                            defaultValue={
                                                                item.quantity
                                                            }
                                                            required
                                                            className="h-9 w-20 rounded-md border border-zinc-300 bg-white px-2 text-sm text-zinc-950"
                                                        />
                                                        <button
                                                            type="submit"
                                                            disabled={
                                                                processing
                                                            }
                                                            aria-label="Update quantity"
                                                            title="Update quantity"
                                                            className="grid size-9 place-items-center rounded-md border border-zinc-300 text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50"
                                                        >
                                                            <Check
                                                                size={16}
                                                                aria-hidden="true"
                                                            />
                                                        </button>
                                                        {errors.quantity && (
                                                            <p
                                                                className="basis-full text-sm text-red-700"
                                                                role="alert"
                                                            >
                                                                {
                                                                    errors.quantity
                                                                }
                                                            </p>
                                                        )}
                                                    </>
                                                )}
                                            </Form>
                                        ) : (
                                            <p
                                                className="text-sm font-medium text-red-700"
                                                role="status"
                                            >
                                                This item is no longer
                                                available.
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                        <div className="text-right">
                                            <p className="font-semibold text-zinc-950">
                                                {formatPrice(item.line_total)}
                                            </p>
                                            <p className="text-sm text-zinc-600">
                                                {formatPrice(item.unit_price)}{' '}
                                                each
                                            </p>
                                        </div>
                                        <Form
                                            action={CartController.destroy.url(
                                                item.key,
                                            )}
                                            method="delete"
                                            options={{ preserveScroll: true }}
                                        >
                                            {({ processing }) => (
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    aria-label={`Remove ${item.product_name}`}
                                                    title="Remove item"
                                                    className="grid size-9 place-items-center rounded-md text-zinc-600 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                                                >
                                                    <Trash2
                                                        size={17}
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            )}
                                        </Form>
                                    </div>
                                </article>
                            ))}
                        </section>

                        <aside className="h-fit border border-zinc-200 bg-white p-5">
                            <h2 className="text-lg font-semibold text-zinc-950">
                                Summary
                            </h2>
                            <div className="mt-5 flex items-center justify-between border-b border-zinc-200 pb-4 text-sm text-zinc-700">
                                <span>Items</span>
                                <span>{itemCount}</span>
                            </div>
                            <div className="flex items-center justify-between py-4 font-semibold text-zinc-950">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}
