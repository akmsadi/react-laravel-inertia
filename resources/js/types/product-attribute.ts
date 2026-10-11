export type ProductAttribute = {
    id: number;
    name: string;
    slug: string;
    created_at: string | null;
    updated_at: string | null;
    values?: ProductAttributeValue[];
};

export type ProductAttributeValue = {
    id: number;
    value: string;
};
