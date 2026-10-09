import { Head } from "@inertiajs/react";
import CategoryController from "@/actions/App/Http/Controllers/CategoryController";
import CategoryForm from "@/components/category-form";
import categories from "@/routes/categories";
import type { Category } from "@/types";

type Props = {
    parents: Pick<Category, "id" | "name">[];
};

export default function CreateCategory({ parents }: Props) {
    return (
        <>
            <Head title="Create category" />
            <div className="p-4">
                <CategoryForm
                    formProps={CategoryController.store.form()}
                    parents={parents}
                    submitLabel="Create category"
                />
            </div>
        </>
    );
}

CreateCategory.layout = {
    breadcrumbs: [
        { title: "Categories", href: categories.index() },
        { title: "Create", href: categories.create() },
    ],
};
