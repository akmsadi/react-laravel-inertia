import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CouponController from '@/actions/App/Http/Controllers/CouponController';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import coupons from '@/routes/coupons';
import type { Coupon, Paginated } from '@/types';

type Props = {
    coupons: Paginated<Coupon>;
    filters: { search: string };
};

const formatDiscount = (coupon: Coupon) =>
    coupon.discount_type === 'percentage'
        ? `${Number(coupon.discount_value)}%`
        : coupon.discount_value;

export default function CouponsIndex({ coupons: paginated, filters }: Props) {
    const [search, setSearch] = useState(filters.search);
    const { errors } = usePage().props as { errors: Record<string, string> };

    return (
        <>
            <Head title="Coupons" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Coupons</h1>
                    <Button asChild>
                        <Link href={coupons.create()}>New coupon</Link>
                    </Button>
                </div>

                <form
                    className="flex gap-2"
                    onSubmit={(event) => {
                        event.preventDefault();
                        router.get(
                            coupons.index.url(),
                            { search },
                            { preserveState: true, replace: true },
                        );
                    }}
                >
                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search code"
                        className="max-w-xs"
                    />
                    <Button variant="outline">Search</Button>
                </form>

                <InputError message={errors.coupon} />

                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Code</th>
                                <th className="px-4 py-2 font-medium">
                                    Discount
                                </th>
                                <th className="px-4 py-2 font-medium">
                                    Min order
                                </th>
                                <th className="px-4 py-2 font-medium">Usage</th>
                                <th className="px-4 py-2 font-medium">
                                    Expires
                                </th>
                                <th className="px-4 py-2 font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.data.map((coupon) => (
                                <tr key={coupon.id} className="border-t">
                                    <td className="px-4 py-2 font-medium">
                                        {coupon.code}
                                    </td>
                                    <td className="px-4 py-2">
                                        {formatDiscount(coupon)}
                                    </td>
                                    <td className="px-4 py-2">
                                        {coupon.min_order_amount ?? '—'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {coupon.usage_count} /{' '}
                                        {coupon.max_usage ?? '∞'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {coupon.expires_at
                                            ? new Date(
                                                  coupon.expires_at,
                                              ).toLocaleDateString()
                                            : '—'}
                                    </td>
                                    <td className="px-4 py-2">
                                        <Badge
                                            variant={
                                                coupon.is_active
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {coupon.is_active
                                                ? 'Active'
                                                : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit coupon"
                                            aria-label="Edit coupon"
                                        >
                                            <Link
                                                href={coupons.edit(coupon.id)}
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>
                                        <Form
                                            {...CouponController.destroy.form(
                                                coupon.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete coupon "${coupon.code}"?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    title="Delete coupon"
                                                    aria-label="Delete coupon"
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
                                        No coupons found.
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
                            {paginated.last_page} ({paginated.total} coupons)
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

CouponsIndex.layout = {
    breadcrumbs: [{ title: 'Coupons', href: coupons.index() }],
};
