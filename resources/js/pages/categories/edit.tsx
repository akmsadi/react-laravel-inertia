import { Head } from "@inertiajs/react";
import CategoryController from "@/actions/App/Http/Controllers/CategoryController";
import CategoryForm from "@/components/category-form";
import categories from "@/routes/categories";
import type { Category } from "@/types";

type Props = {
    category: Category;
    parents: Pick<Category, "id" | "name">[];
};

export default function EditCategory({ category, parents }: Props) {
    return (
        <>
            <Head title={`Edit ${category.name}`} />
            <div className="p-4">
                <CategoryForm
                    formProps={CategoryController.update.form(category.id)}
                    category={category}
                    parents={parents}
                    submitLabel="Save changes"
                />
            </div>
        </>
    );
}

EditCategory.layout = {
    breadcrumbs: [
        { title: "Categories", href: categories.index() },
        { title: "Edit", href: categories.index() },
    ],
};
