import { Form } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import OrderCouponController from '@/actions/App/Http/Controllers/OrderCouponController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Order } from '@/types';

export default function OrderCouponManager({ order }: { order: Order }) {
    const coupon = order.coupons?.[0];

    return (
        <div className="space-y-2 rounded-lg border p-4 text-sm">
            <h2 className="font-medium">Coupon</h2>
            {coupon && (
                <Form
                    {...OrderCouponController.destroy.form(order.id)}
                    className="flex items-center gap-3"
                >
                    {({ processing }) => (
                        <>
                            <span className="font-mono">{coupon.code}</span>
                            <span className="text-muted-foreground">
                                -{coupon.pivot.discount_amount}
                            </span>
                            <Button
                                size="icon"
                                variant="outline"
                                disabled={processing}
                                title="Remove coupon"
                                aria-label="Remove coupon"
                            >
                                <Trash2 />
                            </Button>
                        </>
                    )}
                </Form>
            )}
            <Form
                key={coupon?.id ?? 'none'}
                {...OrderCouponController.store.form(order.id)}
                resetOnSuccess
                className="flex flex-wrap items-start gap-2"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-1">
                            <Input
                                name="coupon_code"
                                placeholder={
                                    coupon ? 'Replace coupon' : 'Coupon code'
                                }
                                className="uppercase"
                                autoComplete="off"
                            />
                            <InputError message={errors.coupon_code} />
                        </div>
                        <Button variant="outline" disabled={processing}>
                            Apply
                        </Button>
                    </>
                )}
            </Form>
        </div>
    );
}
