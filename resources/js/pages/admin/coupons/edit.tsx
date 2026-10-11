import { Head } from '@inertiajs/react';
import CouponController from '@/actions/App/Http/Controllers/CouponController';
import CouponForm from '@/components/coupon-form';
import coupons from '@/routes/coupons';
import type { Coupon } from '@/types';

export default function EditCoupon({ coupon }: { coupon: Coupon }) {
    return (
        <>
            <Head title={`Edit ${coupon.code}`} />
            <div className="p-4">
                <CouponForm
                    formProps={CouponController.update.form(coupon.id)}
                    coupon={coupon}
                    submitLabel="Save changes"
                />
            </div>
        </>
    );
}

EditCoupon.layout = {
    breadcrumbs: [
        { title: 'Coupons', href: coupons.index() },
        { title: 'Edit', href: coupons.index() },
    ],
};
