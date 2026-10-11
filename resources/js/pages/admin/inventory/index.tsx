import { Form, Head, Link, router } from '@inertiajs/react';
import { SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import InventoryController from '@/actions/App/Http/Controllers/InventoryController';
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
import inventory from '@/routes/admin/inventory';
import type { InventoryTransaction, Paginated, StockRow } from '@/types';

type Props = {
    stock: Paginated<StockRow>;
    transactions: InventoryTransaction[];
    filters: { search: string; low: boolean };
    threshold: number;
};

export default function InventoryIndex({
    stock,
    transactions,
    filters,
    threshold,
}: Props) {
    const [search, setSearch] = useState(filters.search);
    const [open, setOpen] = useState(false);
    const [adjusting, setAdjusting] = useState<StockRow | null>(null);

    const applyFilters = (next: Partial<Props['filters']>) => {
        const merged = { ...filters, ...next };

        router.get(
            inventory.index.url(),
            {
                search: merged.search || undefined,
                low: merged.low ? 1 : undefined,
            },
            { preserveState: true, replace: true },
        );
    };

    const openAdjust = (row: StockRow) => {
        setAdjusting(row);
        setOpen(true);
    };

    return (
        <>
            <Head title="Inventory" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">Inventory</h1>

                <form
                    className="flex flex-wrap items-center gap-2"
                    onSubmit={(event) => {
                        event.preventDefault();
                        applyFilters({ search });
                    }}
                >
                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search product or SKU"
                        className="max-w-xs"
                    />
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={filters.low}
                            onChange={(event) =>
                                applyFilters({ low: event.target.checked })
                            }
                        />
                        Low stock only (≤ {threshold})
                    </label>
                    <Button variant="outline">Search</Button>
                </form>

                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Item</th>
                                <th className="px-4 py-2 font-medium">SKU</th>
                                <th className="px-4 py-2 font-medium">Stock</th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {stock.data.map((row) => (
                                <tr key={row.key} className="border-t">
                                    <td className="px-4 py-2">{row.name}</td>
                                    <td className="px-4 py-2">
                                        {row.sku ?? '—'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {row.stock_quantity}{' '}
                                        {row.stock_quantity <= threshold && (
                                            <Badge variant="destructive">
                                                Low
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            title="Adjust stock"
                                            aria-label="Adjust stock"
                                            onClick={() => openAdjust(row)}
                                        >
                                            <SlidersHorizontal />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {stock.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No items found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {stock.last_page > 1 && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Page {stock.current_page} of {stock.last_page} (
                            {stock.total} items)
                        </span>
                        <div className="flex gap-2">
                            {stock.prev_page_url && (
                                <Button asChild variant="outline" size="sm">
                                    <Link href={stock.prev_page_url}>
                                        Previous
                                    </Link>
                                </Button>
                            )}
                            {stock.next_page_url && (
                                <Button asChild variant="outline" size="sm">
                                    <Link href={stock.next_page_url}>Next</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                <section className="space-y-2">
                    <h2 className="font-medium">Recent stock movements</h2>
                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-2 font-medium">
                                        Date
                                    </th>
                                    <th className="px-4 py-2 font-medium">
                                        Item
                                    </th>
                                    <th className="px-4 py-2 font-medium">
                                        Type
                                    </th>
                                    <th className="px-4 py-2 font-medium">
                                        Change
                                    </th>
                                    <th className="px-4 py-2 font-medium">
                                        Notes
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="border-t"
                                    >
                                        <td className="px-4 py-2">
                                            {new Date(
                                                transaction.created_at,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2">
                                            {transaction.product?.name ?? '—'}
                                            {transaction.variant?.name
                                                ? ` - ${transaction.variant.name}`
                                                : ''}
                                        </td>
                                        <td className="px-4 py-2">
                                            <Badge variant="secondary">
                                                {transaction.transaction_type}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-2">
                                            {transaction.quantity > 0
                                                ? `+${transaction.quantity}`
                                                : transaction.quantity}
                                        </td>
                                        <td className="px-4 py-2 text-muted-foreground">
                                            {transaction.notes}
                                        </td>
                                    </tr>
                                ))}
                                {transactions.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-6 text-center text-muted-foreground"
                                        >
                                            No stock movements yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adjust stock</DialogTitle>
                        <DialogDescription>
                            {adjusting?.name} — currently{' '}
                            {adjusting?.stock_quantity}. Use a negative number
                            to remove stock.
                        </DialogDescription>
                    </DialogHeader>
                    {adjusting && (
                        <Form
                            key={adjusting.key}
                            {...InventoryController.adjust.form()}
                            onSuccess={() => setOpen(false)}
                            className="space-y-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <input
                                        type="hidden"
                                        name="product_id"
                                        value={adjusting.product_id}
                                    />
                                    <input
                                        type="hidden"
                                        name="variant_id"
                                        value={adjusting.variant_id ?? ''}
                                    />
                                    <div className="grid gap-2">
                                        <Label htmlFor="quantity">Change</Label>
                                        <Input
                                            id="quantity"
                                            name="quantity"
                                            type="number"
                                            step={1}
                                            required
                                        />
                                        <InputError message={errors.quantity} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="notes">Notes</Label>
                                        <Input id="notes" name="notes" />
                                        <InputError message={errors.notes} />
                                    </div>
                                    <DialogFooter>
                                        <Button disabled={processing}>
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </>
                            )}
                        </Form>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

InventoryIndex.layout = {
    breadcrumbs: [{ title: 'Inventory', href: inventory.index() }],
};
