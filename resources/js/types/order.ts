export type OrderItem = {
    id: number;
    product_name: string;
    sku: string | null;
    quantity: number;
    unit_price: string;
    tax_amount: string;
    total_price: string;
};

export type Order = {
    id: number;
    order_number: string;
    status: string;
    payment_status: string;
    subtotal: string;
    tax_amount: string;
    shipping_amount: string;
    discount_amount: string;
    total_amount: string;
    payment_method: string | null;
    transaction_id: string | null;
    notes: string | null;
    created_at: string;
    items_count?: number;
    customer?: {
        id: number;
        name: string;
        email: string;
        phone?: string | null;
    } | null;
    items?: OrderItem[];
    shipping_address?: {
        id: number;
        first_name: string;
        last_name: string;
        phone: string | null;
        email: string | null;
        street_address: string;
        city: string;
        state: string | null;
        postal_code: string;
        country: string;
    }[];
    coupons?: {
        id: number;
        code: string;
        pivot: { discount_amount: string };
    }[];
};

export type OrderProductOption = {
    id: number;
    name: string;
    sku: string | null;
    base_price: string;
    variants: {
        id: number;
        name: string | null;
        sku: string;
        price: string | null;
    }[];
};

export type AdminCustomer = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    created_at: string;
    orders_count?: number;
};
