import { Form, Head, Link, usePage } from "@inertiajs/react";
import CategoryController from "@/actions/App/Http/Controllers/CategoryController";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import categories from "@/routes/categories";
import type { Category } from "@/types";

type Props = {
    categories: Category[];
};

export default function Categories({ categories: items }: Props) {
    const { errors } = usePage().props;

    return (
        <>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Categories</h1>
                    <Button asChild>
                        <Link href={categories.create()}>New category</Link>
                    </Button>
                </div>

                <InputError message={errors.category} />

                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Name</th>
                                <th className="px-4 py-2 font-medium">Slug</th>
                                <th className="px-4 py-2 font-medium">Parent</th>
                                <th className="px-4 py-2 font-medium">Order</th>
                                <th className="px-4 py-2 font-medium">Status</th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((category) => (
                                <tr key={category.id} className="border-t">
                                    <td className="px-4 py-2">{category.name}</td>
                                    <td className="px-4 py-2">{category.slug}</td>
                                    <td className="px-4 py-2">
                                        {category.parent?.name ?? "—"}
                                    </td>
                                    <td className="px-4 py-2">
                                        {category.sort_order}
                                    </td>
                                    <td className="px-4 py-2">
                                        {category.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button asChild size="sm" variant="outline">
                                            <Link
                                                href={categories.edit(category.id)}
                                            >
                                                Edit
                                            </Link>
                                        </Button>
                                        <Form
                                            {...CategoryController.destroy.form(
                                                category.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete "${category.name}"?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    disabled={processing}
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                        </Form>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No categories yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

Categories.layout = {
    breadcrumbs: [
        {
            title: "Categories",
            href: categories.index(),
        },
    ],
};
