import { Form, Head } from '@inertiajs/react';
import OrderManagementController from '@/actions/App/Http/Controllers/OrderManagementController';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import OrderItemsManager from '@/components/order-items-manager';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import orders from '@/routes/admin/orders';
import type { Order, OrderProductOption } from '@/types';

type Props = {
    order: Order;
    statuses: string[];
    paymentStatuses: string[];
    products: OrderProductOption[];
};

const selectClassName =
    'border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export default function OrderEdit({
    order,
    statuses,
    paymentStatuses,
    products,
}: Props) {
    const address = order.shipping_address?.[0];
    const totals = [
        ['Subtotal', order.subtotal],
        ['Tax', order.tax_amount],
        ['Shipping', order.shipping_amount],
        ['Discount', `-${order.discount_amount}`],
    ];

    return (
        <>
            <Head title={`Order ${order.order_number}`} />
            <div className="space-y-6 p-4">
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-xl font-semibold">
                        {order.order_number}
                    </h1>
                    <Badge variant="secondary">{order.status}</Badge>
                    <Badge
                        variant={
                            order.payment_status === 'paid'
                                ? 'default'
                                : 'outline'
                        }
                    >
                        {order.payment_status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleString()}
                    </span>
                </div>

                <Form
                    {...OrderManagementController.update.form(order.id)}
                    className="space-y-4 rounded-lg border p-4"
                >
                    {({ processing, errors, recentlySuccessful }) => (
                        <>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Order status</Label>
                                    <select
                                        id="status"
                                        name="status"
                                        defaultValue={order.status}
                                        className={selectClassName}
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.status} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="payment_status">
                                        Payment status
                                    </Label>
                                    <select
                                        id="payment_status"
                                        name="payment_status"
                                        defaultValue={order.payment_status}
                                        className={selectClassName}
                                    >
                                        {paymentStatuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.payment_status}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="payment_method">
                                        Payment method
                                    </Label>
                                    <Input
                                        id="payment_method"
                                        name="payment_method"
                                        defaultValue={
                                            order.payment_method ?? ''
                                        }
                                    />
                                    <InputError
                                        message={errors.payment_method}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="transaction_id">
                                        Transaction ID
                                    </Label>
                                    <Input
                                        id="transaction_id"
                                        name="transaction_id"
                                        defaultValue={
                                            order.transaction_id ?? ''
                                        }
                                    />
                                    <InputError
                                        message={errors.transaction_id}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes</Label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows={3}
                                    defaultValue={order.notes ?? ''}
                                    className={`${selectClassName} h-auto py-2`}
                                />
                                <InputError message={errors.notes} />
                            </div>
                            <div className="flex items-center gap-3">
                                <Button disabled={processing}>
                                    Save changes
                                </Button>
                                {recentlySuccessful && (
                                    <span className="text-sm text-muted-foreground">
                                        Saved.
                                    </span>
                                )}
                            </div>
                        </>
                    )}
                </Form>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4 text-sm">
                        <h2 className="mb-2 font-medium">Customer</h2>
                        <div>{order.customer?.name ?? 'Guest'}</div>
                        <div className="text-muted-foreground">
                            {order.customer?.email}
                        </div>
                        <div className="text-muted-foreground">
                            {order.customer?.phone}
                        </div>
                    </div>
                    <div className="rounded-lg border p-4 text-sm">
                        <h2 className="mb-2 font-medium">Shipping address</h2>
                        {address ? (
                            <>
                                <div>
                                    {address.first_name} {address.last_name}
                                </div>
                                <div className="text-muted-foreground">
                                    {address.street_address}, {address.city}
                                    {address.state
                                        ? `, ${address.state}`
                                        : ''}{' '}
                                    {address.postal_code}, {address.country}
                                </div>
                                <div className="text-muted-foreground">
                                    {address.phone}
                                </div>
                            </>
                        ) : (
                            <span className="text-muted-foreground">—</span>
                        )}
                    </div>
                </div>

                <OrderItemsManager order={order} products={products} />

                <div className="ml-auto max-w-xs space-y-1 text-sm">
                    {totals.map(([label, value]) => (
                        <div key={label} className="flex justify-between">
                            <span className="text-muted-foreground">
                                {label}
                            </span>
                            <span>{value}</span>
                        </div>
                    ))}
                    <div className="flex justify-between border-t pt-1 font-semibold">
                        <span>Total</span>
                        <span>{order.total_amount}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

OrderEdit.layout = {
    breadcrumbs: [
        { title: 'Orders', href: orders.index() },
        { title: 'Edit', href: orders.index() },
    ],
};
