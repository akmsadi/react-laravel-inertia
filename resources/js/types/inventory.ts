export type StockRow = {
    key: string;
    product_id: number;
    variant_id: number | null;
    name: string;
    sku: string | null;
    stock_quantity: number;
};

export type InventoryTransaction = {
    id: number;
    transaction_type: 'in' | 'out' | 'adjustment' | 'return';
    quantity: number;
    notes: string | null;
    created_at: string;
    product: { id: number; name: string } | null;
    variant: { id: number; name: string | null } | null;
};
