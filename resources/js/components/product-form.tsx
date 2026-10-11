import { Form } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Product, ProductCategoryOption } from '@/types';

type Props = {
    formProps: Pick<ComponentProps<typeof Form>, 'action' | 'method'>;
    product?: Product;
    categories: ProductCategoryOption[];
    submitLabel: string;
};

const selectClassName =
    'border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export default function ProductForm({
    formProps,
    product,
    categories,
    submitLabel,
}: Props) {
    return (
        <Form {...formProps} className="max-w-2xl space-y-6">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={product?.name}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                name="slug"
                                defaultValue={product?.slug}
                                placeholder="Generated from the name if empty"
                            />
                            <InputError message={errors.slug} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="sku">SKU</Label>
                            <Input
                                id="sku"
                                name="sku"
                                defaultValue={product?.sku ?? ''}
                            />
                            <InputError message={errors.sku} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category_id">Category</Label>
                        <select
                            id="category_id"
                            name="category_id"
                            defaultValue={product?.category_id ?? ''}
                            className={selectClassName}
                            required
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.category_id} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="short_description">
                            Short description
                        </Label>
                        <Input
                            id="short_description"
                            name="short_description"
                            defaultValue={product?.short_description ?? ''}
                        />
                        <InputError message={errors.short_description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            defaultValue={product?.description ?? ''}
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="base_price">Price</Label>
                            <Input
                                id="base_price"
                                name="base_price"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={product?.base_price}
                                required
                            />
                            <InputError message={errors.base_price} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="cost_price">Cost price</Label>
                            <Input
                                id="cost_price"
                                name="cost_price"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={product?.cost_price ?? ''}
                            />
                            <InputError message={errors.cost_price} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tax_rate">Tax rate (%)</Label>
                            <Input
                                id="tax_rate"
                                name="tax_rate"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                defaultValue={product?.tax_rate ?? 0}
                            />
                            <InputError message={errors.tax_rate} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="stock_quantity">Stock</Label>
                            <Input
                                id="stock_quantity"
                                name="stock_quantity"
                                type="number"
                                min="0"
                                defaultValue={product?.stock_quantity ?? 0}
                            />
                            <InputError message={errors.stock_quantity} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="is_active">Status</Label>
                            <select
                                id="is_active"
                                name="is_active"
                                defaultValue={
                                    product && !product.is_active ? '0' : '1'
                                }
                                className={selectClassName}
                            >
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                            <InputError message={errors.is_active} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="is_featured">Featured</Label>
                            <select
                                id="is_featured"
                                name="is_featured"
                                defaultValue={product?.is_featured ? '1' : '0'}
                                className={selectClassName}
                            >
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                            <InputError message={errors.is_featured} />
                        </div>
                    </div>

                    <Button disabled={processing}>{submitLabel}</Button>
                </>
            )}
        </Form>
    );
}
