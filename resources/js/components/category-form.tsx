import { Form } from "@inertiajs/react";
import type { ComponentProps } from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Category } from "@/types";

type Props = {
    formProps: Pick<ComponentProps<typeof Form>, "action" | "method">;
    category?: Category;
    parents: Pick<Category, "id" | "name">[];
    submitLabel: string;
};

const selectClassName =
    "border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

export default function CategoryForm({
    formProps,
    category,
    parents,
    submitLabel,
}: Props) {
    return (
        <Form {...formProps} className="max-w-xl space-y-6">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={category?.name}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            name="slug"
                            defaultValue={category?.slug}
                            placeholder="Generated from the name if left empty"
                        />
                        <InputError message={errors.slug} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            defaultValue={category?.description ?? ""}
                            className="border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="parent_id">Parent category</Label>
                        <select
                            id="parent_id"
                            name="parent_id"
                            defaultValue={category?.parent_id ?? ""}
                            className={selectClassName}
                        >
                            <option value="">None</option>
                            {parents.map((parent) => (
                                <option key={parent.id} value={parent.id}>
                                    {parent.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.parent_id} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="image_url">Image URL</Label>
                        <Input
                            id="image_url"
                            name="image_url"
                            defaultValue={category?.image_url ?? ""}
                        />
                        <InputError message={errors.image_url} />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="sort_order">Sort order</Label>
                            <Input
                                id="sort_order"
                                name="sort_order"
                                type="number"
                                defaultValue={category?.sort_order ?? 0}
                            />
                            <InputError message={errors.sort_order} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="is_active">Status</Label>
                            <select
                                id="is_active"
                                name="is_active"
                                defaultValue={
                                    category && !category.is_active ? "0" : "1"
                                }
                                className={selectClassName}
                            >
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                            <InputError message={errors.is_active} />
                        </div>
                    </div>

                    <Button disabled={processing}>{submitLabel}</Button>
                </>
            )}
        </Form>
    );
}
