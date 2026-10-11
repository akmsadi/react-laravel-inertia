export type ProductImage = {
    id: number;
    image_url: string;
    alt_text: string | null;
    sort_order: number;
    is_primary: boolean;
};

export type ProductVariant = {
    id: number;
    name: string | null;
    sku: string;
    price: string | null;
    cost_price: string | null;
    tax_rate: string | null;
    stock_quantity: number;
    weight: string | null;
    dimensions: string | null;
    barcode: string | null;
    is_active: boolean;
    attributes?: {
        id: number;
        value: string;
        pivot: { attribute_id: number };
    }[];
};

export type Product = {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    short_description: string | null;
    description: string | null;
    sku: string | null;
    base_price: string;
    cost_price: string | null;
    tax_rate: string;
    is_active: boolean;
    is_featured: boolean;
    stock_quantity: number;
    category?: { id: number; name: string };
    images?: ProductImage[];
    variants?: ProductVariant[];
};

export type ProductCategoryOption = {
    id: number;
    name: string;
};

export type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
};

export type AttributeOption = {
    id: number;
    name: string;
    values: { id: number; value: string }[];
};
