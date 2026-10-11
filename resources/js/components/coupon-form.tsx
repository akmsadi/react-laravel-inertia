import { Form } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Coupon } from '@/types';

type Props = {
    formProps: Pick<ComponentProps<typeof Form>, 'action' | 'method'>;
    coupon?: Coupon;
    submitLabel: string;
};

const selectClassName =
    'border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

// datetime-local inputs need "YYYY-MM-DDTHH:mm"
const toInputValue = (value: string | null | undefined) =>
    value ? value.slice(0, 16) : '';

export default function CouponForm({ formProps, coupon, submitLabel }: Props) {
    return (
        <Form {...formProps} className="max-w-2xl space-y-6">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="code">Code</Label>
                            <Input
                                id="code"
                                name="code"
                                defaultValue={coupon?.code}
                                className="uppercase"
                                required
                            />
                            <InputError message={errors.code} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="is_active">Status</Label>
                            <select
                                id="is_active"
                                name="is_active"
                                defaultValue={
                                    coupon && !coupon.is_active ? '0' : '1'
                                }
                                className={selectClassName}
                            >
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                            <InputError message={errors.is_active} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            name="description"
                            rows={2}
                            defaultValue={coupon?.description ?? ''}
                            className={`${selectClassName} h-auto py-2`}
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="discount_type">Discount type</Label>
                            <select
                                id="discount_type"
                                name="discount_type"
                                defaultValue={coupon?.discount_type ?? 'fixed'}
                                className={selectClassName}
                            >
                                <option value="fixed">Fixed amount</option>
                                <option value="percentage">Percentage</option>
                            </select>
                            <InputError message={errors.discount_type} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="discount_value">
                                Discount value
                            </Label>
                            <Input
                                id="discount_value"
                                name="discount_value"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={coupon?.discount_value}
                                required
                            />
                            <InputError message={errors.discount_value} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="min_order_amount">
                                Minimum order amount
                            </Label>
                            <Input
                                id="min_order_amount"
                                name="min_order_amount"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={coupon?.min_order_amount ?? ''}
                            />
                            <InputError message={errors.min_order_amount} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="max_usage">Max usage</Label>
                            <Input
                                id="max_usage"
                                name="max_usage"
                                type="number"
                                min="1"
                                placeholder="Unlimited"
                                defaultValue={coupon?.max_usage ?? ''}
                            />
                            <InputError message={errors.max_usage} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="starts_at">Starts at</Label>
                            <Input
                                id="starts_at"
                                name="starts_at"
                                type="datetime-local"
                                defaultValue={toInputValue(coupon?.starts_at)}
                            />
                            <InputError message={errors.starts_at} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="expires_at">Expires at</Label>
                            <Input
                                id="expires_at"
                                name="expires_at"
                                type="datetime-local"
                                defaultValue={toInputValue(coupon?.expires_at)}
                            />
                            <InputError message={errors.expires_at} />
                        </div>
                    </div>

                    <Button disabled={processing}>{submitLabel}</Button>
                </>
            )}
        </Form>
    );
}
