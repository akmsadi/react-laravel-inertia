import { Form, Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import CheckoutController from "@/actions/App/Http/Controllers/CheckoutController";
import { index as cartIndex } from "@/routes/cart";

type CheckoutItem = {
    product_id: number;
    product_name: string;
    variant_id: number | null;
    variant_name: string | null;
    sku: string | null;
    quantity: number;
    unit_price: number;
    line_total: number;
    is_available: boolean;
};

type PageProps = {
    items: CheckoutItem[];
    subtotal: number;
    customer: {
        name: string;
        email: string;
        phone: string | null;
    };
};

function formatPrice(amount: number): string {
    return `$${amount.toFixed(2)}`;
}

export default function CheckoutIndex({
    items,
    subtotal,
    customer,
}: PageProps) {
    const [firstName, ...lastNameParts] = customer.name.split(" ");
    const lastName = lastNameParts.join(" ");

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <Link
                    href={cartIndex().url}
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
                >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to cart
                </Link>

                <h1 className="mb-8 border-b border-zinc-200 pb-5 text-3xl font-bold text-zinc-950">
                    Checkout
                </h1>

                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem]">
                    <Form
                        {...CheckoutController.store.form()}
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <InputError message={errors.cart} />

                                <section className="border border-zinc-200 bg-white p-5">
                                    <h2 className="text-lg font-semibold text-zinc-950">
                                        Shipping address
                                    </h2>
                                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label htmlFor="first_name">
                                                First name
                                            </Label>
                                            <Input
                                                id="first_name"
                                                name="first_name"
                                                defaultValue={firstName}
                                                required
                                                autoFocus
                                            />
                                            <InputError
                                                message={errors.first_name}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="last_name">
                                                Last name
                                            </Label>
                                            <Input
                                                id="last_name"
                                                name="last_name"
                                                defaultValue={lastName}
                                                required
                                            />
                                            <InputError
                                                message={errors.last_name}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                defaultValue={customer.email}
                                                required
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                name="phone"
                                                defaultValue={
                                                    customer.phone ?? ""
                                                }
                                            />
                                            <InputError
                                                message={errors.phone}
                                            />
                                        </div>
                                        <div className="grid gap-2 sm:col-span-2">
                                            <Label htmlFor="street_address">
                                                Street address
                                            </Label>
                                            <Input
                                                id="street_address"
                                                name="street_address"
                                                required
                                            />
                                            <InputError
                                                message={errors.street_address}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                required
                                            />
                                            <InputError message={errors.city} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="state">
                                                State / Province
                                            </Label>
                                            <Input id="state" name="state" />
                                            <InputError
                                                message={errors.state}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="postal_code">
                                                Postal code
                                            </Label>
                                            <Input
                                                id="postal_code"
                                                name="postal_code"
                                                required
                                            />
                                            <InputError
                                                message={errors.postal_code}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="country">
                                                Country
                                            </Label>
                                            <Input
                                                id="country"
                                                name="country"
                                                required
                                            />
                                            <InputError
                                                message={errors.country}
                                            />
                                        </div>
                                        <div className="grid gap-2 sm:col-span-2">
                                            <Label htmlFor="notes">
                                                Order notes (optional)
                                            </Label>
                                            <textarea
                                                id="notes"
                                                name="notes"
                                                rows={3}
                                                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950"
                                            />
                                            <InputError
                                                message={errors.notes}
                                            />
                                        </div>
                                    </div>
                                </section>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-[#1f7a3d] hover:bg-[#176331] sm:w-auto"
                                >
                                    {processing && (
                                        <Spinner className="size-4 animate-spin" />
                                    )}
                                    Place order
                                </Button>
                            </>
                        )}
                    </Form>

                    <aside className="h-fit border border-zinc-200 bg-white p-5">
                        <h2 className="text-lg font-semibold text-zinc-950">
                            Order summary
                        </h2>
                        <div className="mt-4 divide-y divide-zinc-200">
                            {items.map((item) => (
                                <div
                                    key={`${item.product_id}-${item.variant_id ?? "base"}`}
                                    className="flex items-start justify-between gap-3 py-3 text-sm"
                                >
                                    <div>
                                        <p className="font-medium text-zinc-950">
                                            {item.product_name}
                                        </p>
                                        {item.variant_name && (
                                            <p className="text-zinc-600">
                                                {item.variant_name}
                                            </p>
                                        )}
                                        <p className="text-zinc-600">
                                            Qty {item.quantity}
                                        </p>
                                    </div>
                                    <p className="font-medium text-zinc-950">
                                        {formatPrice(item.line_total)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-zinc-200 pt-4 font-semibold text-zinc-950">
                            <span>Total</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
