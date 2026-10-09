export type Category = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    parent_id: number | null;
    image_url: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string | null;
    updated_at: string | null;
    parent?: Pick<Category, "id" | "name"> | null;
};
