import { Head } from '@inertiajs/react';
import CouponController from '@/actions/App/Http/Controllers/CouponController';
import CouponForm from '@/components/coupon-form';
import coupons from '@/routes/coupons';

export default function CreateCoupon() {
    return (
        <>
            <Head title="Create coupon" />
            <div className="p-4">
                <CouponForm
                    formProps={CouponController.store.form()}
                    submitLabel="Create coupon"
                />
            </div>
        </>
    );
}

CreateCoupon.layout = {
    breadcrumbs: [
        { title: 'Coupons', href: coupons.index() },
        { title: 'Create', href: coupons.create() },
    ],
};
