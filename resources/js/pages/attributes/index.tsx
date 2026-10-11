import { Form, Head, Link, usePage } from "@inertiajs/react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import AttributeController from "@/actions/App/Http/Controllers/AttributeController";
import ProductAttributeValueController from "@/actions/App/Http/Controllers/ProductAttributeValueController";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import attributes from "@/routes/attributes";
import type { ProductAttribute, ProductAttributeValue } from "@/types";

type Props = {
    attributes: ProductAttribute[];
};

export default function ProductAttributesIndex({ attributes: items }: Props) {
    const { errors } = usePage().props;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [valueDialog, setValueDialogState] = useState<
        | {
              mode: "create";
              attributeId: number;
          }
        | {
              mode: "edit";
              attributeId: number;
              value: ProductAttributeValue;
          }
        | null
    >(null);

    const dialogAttribute = items.find(
        (attribute) => attribute.id === valueDialog?.attributeId,
    );
    const isCreateDialog = valueDialog?.mode === "create";
    const editingValue =
        valueDialog?.mode === "edit" ? valueDialog.value : null;

    const setValueDialog = (state: NonNullable<typeof valueDialog>) => {
        setValueDialogState(state);
        setDialogOpen(true);
    };

    // Keep the payload so the content doesn't change during the close animation.
    const closeValueDialog = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <Head title="Product attributes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">
                        Product attributes
                    </h1>
                    <Button asChild>
                        <Link href={attributes.create()}>
                            <Plus /> Attribute
                        </Link>
                    </Button>
                </div>

                <InputError message={errors.attribute} />

                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Name</th>
                                <th className="px-4 py-2 font-medium">Slug</th>
                                <th className="px-4 py-2 font-medium">
                                    Values
                                </th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((attribute) => (
                                <tr key={attribute.id} className="border-t">
                                    <td className="px-4 py-2">
                                        {attribute.name}
                                    </td>
                                    <td className="px-4 py-2">
                                        {attribute.slug}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-wrap gap-1">
                                            {attribute.values?.map((value) => (
                                                <Button
                                                    key={value.id}
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        setValueDialog({
                                                            mode: "edit",
                                                            attributeId:
                                                                attribute.id,
                                                            value,
                                                        })
                                                    }
                                                >
                                                    {value.value}
                                                </Button>
                                            ))}
                                            {attribute.values?.length === 0 && (
                                                <span className="text-muted-foreground">
                                                    —
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button
                                            type="button"
                                            title="Add value"
                                            aria-label="Add value"
                                            onClick={() =>
                                                setValueDialog({
                                                    mode: "create",
                                                    attributeId: attribute.id,
                                                })
                                            }
                                        >
                                            <Plus /> {attribute.name}
                                        </Button>
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit attribute"
                                        >
                                            <Link
                                                href={attributes.edit(
                                                    attribute.id,
                                                )}
                                                aria-label="Edit attribute"
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>
                                        <Form
                                            {...AttributeController.destroy.form(
                                                attribute.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete "${attribute.name}" and its configured values and product variant selections?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    title="Delete attribute"
                                                    aria-label="Delete attribute"
                                                    disabled={processing}
                                                >
                                                    <Trash2 />
                                                </Button>
                                            )}
                                        </Form>
                                    </td>
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No product attributes yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => !open && closeValueDialog()}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isCreateDialog ? "Add value" : "Edit value"}
                            {dialogAttribute
                                ? ` - ${dialogAttribute.name}`
                                : ""}
                        </DialogTitle>
                        <DialogDescription>
                            {isCreateDialog
                                ? "Add a value that can be assigned to product variants."
                                : "Update or remove this product attribute value."}
                        </DialogDescription>
                    </DialogHeader>

                    {isCreateDialog && dialogAttribute && (
                        <Form
                            {...ProductAttributeValueController.store.form(
                                dialogAttribute.id,
                            )}
                            resetOnSuccess
                            onSuccess={closeValueDialog}
                        >
                            {({ processing, errors: formErrors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="new-value">Value</Label>
                                        <Input
                                            id="new-value"
                                            name="value"
                                            placeholder="For example, Red"
                                            autoFocus
                                            required
                                        />
                                        <InputError
                                            message={formErrors.value}
                                        />
                                    </div>
                                    <DialogFooter className="mt-4">
                                        <Button disabled={processing}>
                                            Add value
                                        </Button>
                                    </DialogFooter>
                                </>
                            )}
                        </Form>
                    )}

                    {!isCreateDialog && editingValue && dialogAttribute && (
                        <>
                            <Form
                                id="delete-value-form"
                                {...ProductAttributeValueController.destroy.form(
                                    {
                                        attribute: dialogAttribute.id,
                                        value: editingValue.id,
                                    },
                                )}
                                onBefore={() =>
                                    confirm(
                                        `Delete "${editingValue.value}"? Any product variant using it will lose this selection.`,
                                    )
                                }
                                onSuccess={closeValueDialog}
                            >
                                {() => null}
                            </Form>
                            <Form
                                {...ProductAttributeValueController.update.form(
                                    {
                                        attribute: dialogAttribute.id,
                                        value: editingValue.id,
                                    },
                                )}
                                onSuccess={closeValueDialog}
                            >
                                {({ processing, errors: formErrors }) => (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="edit-value">
                                                Value
                                            </Label>
                                            <Input
                                                id="edit-value"
                                                name="value"
                                                defaultValue={
                                                    editingValue.value
                                                }
                                                autoFocus
                                                required
                                            />
                                            <InputError
                                                message={formErrors.value}
                                            />
                                        </div>
                                        <DialogFooter className="mt-4">
                                            <Button
                                                type="submit"
                                                variant="destructive"
                                                form="delete-value-form"
                                            >
                                                Delete
                                            </Button>
                                            <Button disabled={processing}>
                                                Save changes
                                            </Button>
                                        </DialogFooter>
                                    </>
                                )}
                            </Form>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}

ProductAttributesIndex.layout = {
    breadcrumbs: [
        {
            title: "Product attributes",
            href: attributes.index(),
        },
    ],
};
