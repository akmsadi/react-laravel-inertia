export type Coupon = {
    id: number;
    code: string;
    description: string | null;
    discount_type: 'fixed' | 'percentage';
    discount_value: string;
    min_order_amount: string | null;
    max_usage: number | null;
    usage_count: number;
    is_active: boolean;
    starts_at: string | null;
    expires_at: string | null;
};
