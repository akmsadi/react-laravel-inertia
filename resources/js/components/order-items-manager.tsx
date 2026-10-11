import { Form } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import OrderItemController from '@/actions/App/Http/Controllers/OrderItemController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Order, OrderItem, OrderProductOption } from '@/types';

type Props = {
    order: Order;
    products: OrderProductOption[];
};

const selectClassName =
    'border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export default function OrderItemsManager({ order, products }: Props) {
    const items = order.items ?? [];
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<OrderItem | null>(null);
    const [productId, setProductId] = useState('');

    const selectedProduct = products.find(
        (product) => String(product.id) === productId,
    );

    const openCreate = () => {
        setEditing(null);
        setProductId('');
        setOpen(true);
    };

    const openEdit = (item: OrderItem) => {
        setEditing(item);
        setOpen(true);
    };

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Items</h2>
                <Button type="button" size="sm" onClick={openCreate}>
                    <Plus /> Add item
                </Button>
            </div>

            <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 text-muted-foreground">
                        <tr>
                            <th className="px-4 py-2 font-medium">Item</th>
                            <th className="px-4 py-2 font-medium">SKU</th>
                            <th className="px-4 py-2 font-medium">Qty</th>
                            <th className="px-4 py-2 font-medium">Price</th>
                            <th className="px-4 py-2 font-medium">Total</th>
                            <th className="px-4 py-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="px-4 py-2">
                                    {item.product_name}
                                </td>
                                <td className="px-4 py-2">{item.sku ?? '—'}</td>
                                <td className="px-4 py-2">{item.quantity}</td>
                                <td className="px-4 py-2">{item.unit_price}</td>
                                <td className="px-4 py-2">
                                    {item.total_price}
                                </td>
                                <td className="flex justify-end gap-2 px-4 py-2">
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="outline"
                                        title="Edit item"
                                        aria-label="Edit item"
                                        onClick={() => openEdit(item)}
                                    >
                                        <Pencil />
                                    </Button>
                                    <Form
                                        {...OrderItemController.destroy.form({
                                            order: order.id,
                                            item: item.id,
                                        })}
                                        onBefore={() =>
                                            confirm(
                                                `Remove "${item.product_name}" from this order?`,
                                            )
                                        }
                                    >
                                        {({ processing }) => (
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                title="Remove item"
                                                aria-label="Remove item"
                                                disabled={processing}
                                            >
                                                <Trash2 />
                                            </Button>
                                        )}
                                    </Form>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-6 text-center text-muted-foreground"
                                >
                                    No items.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? editing.product_name : 'Add item'}
                        </DialogTitle>
                        <DialogDescription>
                            {editing
                                ? 'Update the quantity or unit price.'
                                : 'Pick a product; the price defaults to the product or variant price.'}
                        </DialogDescription>
                    </DialogHeader>

                    <Form
                        key={editing?.id ?? 'new'}
                        {...(editing
                            ? OrderItemController.update.form({
                                  order: order.id,
                                  item: editing.id,
                              })
                            : OrderItemController.store.form(order.id))}
                        onSuccess={() => setOpen(false)}
                    >
                        {({ processing, errors }) => (
                            <div className="space-y-4">
                                {!editing && (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="item-product">
                                                Product
                                            </Label>
                                            <select
                                                id="item-product"
                                                name="product_id"
                                                value={productId}
                                                onChange={(event) =>
                                                    setProductId(
                                                        event.target.value,
                                                    )
                                                }
                                                className={selectClassName}
                                                required
                                            >
                                                <option value="">
                                                    Select a product
                                                </option>
                                                {products.map((product) => (
                                                    <option
                                                        key={product.id}
                                                        value={product.id}
                                                    >
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError
                                                message={errors.product_id}
                                            />
                                        </div>
                                        {selectedProduct &&
                                            selectedProduct.variants.length >
                                                0 && (
                                                <div className="grid gap-2">
                                                    <Label htmlFor="item-variant">
                                                        Variant
                                                    </Label>
                                                    <select
                                                        id="item-variant"
                                                        name="variant_id"
                                                        defaultValue=""
                                                        className={
                                                            selectClassName
                                                        }
                                                    >
                                                        <option value="">
                                                            No variant
                                                        </option>
                                                        {selectedProduct.variants.map(
                                                            (variant) => (
                                                                <option
                                                                    key={
                                                                        variant.id
                                                                    }
                                                                    value={
                                                                        variant.id
                                                                    }
                                                                >
                                                                    {variant.name ??
                                                                        variant.sku}{' '}
                                                                    (
                                                                    {
                                                                        variant.sku
                                                                    }
                                                                    )
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                    <InputError
                                                        message={
                                                            errors.variant_id
                                                        }
                                                    />
                                                </div>
                                            )}
                                    </>
                                )}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="item-quantity">
                                            Quantity
                                        </Label>
                                        <Input
                                            id="item-quantity"
                                            name="quantity"
                                            type="number"
                                            min="1"
                                            defaultValue={
                                                editing?.quantity ?? 1
                                            }
                                            required
                                        />
                                        <InputError message={errors.quantity} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="item-price">
                                            Unit price
                                        </Label>
                                        <Input
                                            id="item-price"
                                            name="unit_price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            defaultValue={
                                                editing?.unit_price ?? ''
                                            }
                                            placeholder={
                                                editing ? undefined : 'Default'
                                            }
                                            required={!!editing}
                                        />
                                        <InputError
                                            message={errors.unit_price}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button disabled={processing}>
                                        {editing ? 'Save changes' : 'Add item'}
                                    </Button>
                                </DialogFooter>
                            </div>
                        )}
                    </Form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
