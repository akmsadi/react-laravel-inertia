import { Form, Head, Link } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import ProductManagementController from '@/actions/App/Http/Controllers/ProductManagementController';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import products from '@/routes/admin/products';
import type { Paginated, Product } from '@/types';

type Props = {
    products: Paginated<Product>;
};

export default function ProductsIndex({ products: paginated }: Props) {
    return (
        <>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Products</h1>
                    <Button asChild>
                        <Link href={products.create()}>New product</Link>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Name</th>
                                <th className="px-4 py-2 font-medium">
                                    Category
                                </th>
                                <th className="px-4 py-2 font-medium">SKU</th>
                                <th className="px-4 py-2 font-medium">Price</th>
                                <th className="px-4 py-2 font-medium">Stock</th>
                                <th className="px-4 py-2 font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.data.map((product) => (
                                <tr key={product.id} className="border-t">
                                    <td className="px-4 py-2">
                                        {product.name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.category?.name ?? '—'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.sku ?? '—'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.base_price}
                                    </td>
                                    <td className="px-4 py-2">
                                        {product.stock_quantity}
                                    </td>
                                    <td className="px-4 py-2">
                                        <Badge
                                            variant={
                                                product.is_active
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {product.is_active
                                                ? 'Active'
                                                : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit product"
                                        >
                                            <Link
                                                href={products.edit(product.id)}
                                                aria-label="Edit product"
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>
                                        <Form
                                            {...ProductManagementController.destroy.form(
                                                product.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete "${product.name}"?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    title="Delete product"
                                                    aria-label="Delete product"
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
                                        colSpan={7}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No products yet.
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
                            {paginated.last_page} ({paginated.total} products)
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

ProductsIndex.layout = {
    breadcrumbs: [{ title: 'Products', href: products.index() }],
};
