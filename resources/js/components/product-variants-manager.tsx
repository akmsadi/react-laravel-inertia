import { Form } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ProductVariantController from '@/actions/App/Http/Controllers/ProductVariantController';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AttributeOption, Product, ProductVariant } from '@/types';

type Props = {
    product: Product;
    attributes: AttributeOption[];
};

const selectClassName =
    'border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export default function ProductVariantsManager({ product, attributes }: Props) {
    const variants = product.variants ?? [];
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<ProductVariant | null>(null);

    const openCreate = () => {
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (variant: ProductVariant) => {
        setEditing(variant);
        setOpen(true);
    };

    const selectedValue = (attributeId: number) =>
        editing?.attributes?.find(
            (value) => value.pivot.attribute_id === attributeId,
        )?.id ?? '';

    const formProps = editing
        ? ProductVariantController.update.form({
              product: product.id,
              variant: editing.id,
          })
        : ProductVariantController.store.form(product.id);

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Variants</h2>
                <Button type="button" size="sm" onClick={openCreate}>
                    <Plus /> Add variant
                </Button>
            </div>

            <div className="overflow-hidden rounded-lg border">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 text-muted-foreground">
                        <tr>
                            <th className="px-4 py-2 font-medium">Variant</th>
                            <th className="px-4 py-2 font-medium">SKU</th>
                            <th className="px-4 py-2 font-medium">Options</th>
                            <th className="px-4 py-2 font-medium">Price</th>
                            <th className="px-4 py-2 font-medium">Stock</th>
                            <th className="px-4 py-2 font-medium">Status</th>
                            <th className="px-4 py-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {variants.map((variant) => (
                            <tr key={variant.id} className="border-t">
                                <td className="px-4 py-2">
                                    {variant.name ?? '—'}
                                </td>
                                <td className="px-4 py-2">{variant.sku}</td>
                                <td className="px-4 py-2">
                                    <div className="flex flex-wrap gap-1">
                                        {variant.attributes?.map((value) => (
                                            <Badge
                                                key={value.id}
                                                variant="outline"
                                            >
                                                {value.value}
                                            </Badge>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    {variant.price ?? product.base_price}
                                </td>
                                <td className="px-4 py-2">
                                    {variant.stock_quantity}
                                </td>
                                <td className="px-4 py-2">
                                    <Badge
                                        variant={
                                            variant.is_active
                                                ? 'default'
                                                : 'secondary'
                                        }
                                    >
                                        {variant.is_active
                                            ? 'Active'
                                            : 'Inactive'}
                                    </Badge>
                                </td>
                                <td className="flex justify-end gap-2 px-4 py-2">
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="outline"
                                        title="Edit variant"
                                        aria-label="Edit variant"
                                        onClick={() => openEdit(variant)}
                                    >
                                        <Pencil />
                                    </Button>
                                    <Form
                                        {...ProductVariantController.destroy.form(
                                            {
                                                product: product.id,
                                                variant: variant.id,
                                            },
                                        )}
                                        onBefore={() =>
                                            confirm(
                                                `Delete variant "${variant.sku}"?`,
                                            )
                                        }
                                    >
                                        {({ processing }) => (
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                title="Delete variant"
                                                aria-label="Delete variant"
                                                disabled={processing}
                                            >
                                                <Trash2 />
                                            </Button>
                                        )}
                                    </Form>
                                </td>
                            </tr>
                        ))}
                        {variants.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-4 py-6 text-center text-muted-foreground"
                                >
                                    No variants yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit variant' : 'Add variant'}
                        </DialogTitle>
                        <DialogDescription>
                            Pick a value for each attribute that distinguishes
                            this variant.
                        </DialogDescription>
                    </DialogHeader>

                    <Form
                        key={editing?.id ?? 'new'}
                        {...formProps}
                        resetOnSuccess
                        onSuccess={() => setOpen(false)}
                    >
                        {({ processing, errors }) => (
                            <div className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="variant-name">
                                            Name
                                        </Label>
                                        <Input
                                            id="variant-name"
                                            name="name"
                                            defaultValue={editing?.name ?? ''}
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="variant-sku">SKU</Label>
                                        <Input
                                            id="variant-sku"
                                            name="sku"
                                            defaultValue={editing?.sku ?? ''}
                                            required
                                        />
                                        <InputError message={errors.sku} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="variant-price">
                                            Price
                                        </Label>
                                        <Input
                                            id="variant-price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder={product.base_price}
                                            defaultValue={editing?.price ?? ''}
                                        />
                                        <InputError message={errors.price} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="variant-cost">
                                            Cost price
                                        </Label>
                                        <Input
                                            id="variant-cost"
                                            name="cost_price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            defaultValue={
                                                editing?.cost_price ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.cost_price}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="variant-tax">
                                            Tax rate (%)
                                        </Label>
                                        <Input
                                            id="variant-tax"
                                            name="tax_rate"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="100"
                                            defaultValue={
                                                editing?.tax_rate ?? ''
                                            }
                                        />
                                        <InputError message={errors.tax_rate} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="variant-stock">
                                            Stock
                                        </Label>
                                        <Input
                                            id="variant-stock"
                                            name="stock_quantity"
                                            type="number"
                                            min="0"
                                            defaultValue={
                                                editing?.stock_quantity ?? 0
                                            }
                                        />
                                        <InputError
                                            message={errors.stock_quantity}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="variant-weight">
                                            Weight
                                        </Label>
                                        <Input
                                            id="variant-weight"
                                            name="weight"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            defaultValue={editing?.weight ?? ''}
                                        />
                                        <InputError message={errors.weight} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="variant-dimensions">
                                            Dimensions
                                        </Label>
                                        <Input
                                            id="variant-dimensions"
                                            name="dimensions"
                                            defaultValue={
                                                editing?.dimensions ?? ''
                                            }
                                        />
                                        <InputError
                                            message={errors.dimensions}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="variant-barcode">
                                            Barcode
                                        </Label>
                                        <Input
                                            id="variant-barcode"
                                            name="barcode"
                                            defaultValue={
                                                editing?.barcode ?? ''
                                            }
                                        />
                                        <InputError message={errors.barcode} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="variant-active">
                                            Status
                                        </Label>
                                        <select
                                            id="variant-active"
                                            name="is_active"
                                            defaultValue={
                                                editing && !editing.is_active
                                                    ? '0'
                                                    : '1'
                                            }
                                            className={selectClassName}
                                        >
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                {attributes.some(
                                    (attribute) => attribute.values.length > 0,
                                ) && (
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium">
                                            Attributes
                                        </h3>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {attributes
                                                .filter(
                                                    (attribute) =>
                                                        attribute.values
                                                            .length > 0,
                                                )
                                                .map((attribute) => (
                                                    <div
                                                        key={attribute.id}
                                                        className="grid gap-2"
                                                    >
                                                        <Label
                                                            htmlFor={`attribute-${attribute.id}`}
                                                        >
                                                            {attribute.name}
                                                        </Label>
                                                        <select
                                                            id={`attribute-${attribute.id}`}
                                                            name={`attribute_values[${attribute.id}]`}
                                                            defaultValue={selectedValue(
                                                                attribute.id,
                                                            )}
                                                            className={
                                                                selectClassName
                                                            }
                                                        >
                                                            <option value="">
                                                                None
                                                            </option>
                                                            {attribute.values.map(
                                                                (value) => (
                                                                    <option
                                                                        key={
                                                                            value.id
                                                                        }
                                                                        value={
                                                                            value.id
                                                                        }
                                                                    >
                                                                        {
                                                                            value.value
                                                                        }
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                        <InputError
                                                            message={
                                                                errors[
                                                                    `attribute_values.${attribute.id}`
                                                                ]
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                <DialogFooter>
                                    <Button disabled={processing}>
                                        {editing
                                            ? 'Save changes'
                                            : 'Add variant'}
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
