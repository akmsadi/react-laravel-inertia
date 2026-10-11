import { Form } from '@inertiajs/react';
import { Pencil, Plus, Star } from 'lucide-react';
import { useState } from 'react';
import ProductImageController from '@/actions/App/Http/Controllers/ProductImageController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Product, ProductImage } from '@/types';

type Props = {
    product: Product;
};

const selectClassName =
    'border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

export default function ProductImagesManager({ product }: Props) {
    const images = product.images ?? [];
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<ProductImage | null>(null);

    const openCreate = () => {
        setEditing(null);
        setOpen(true);
    };

    const openEdit = (image: ProductImage) => {
        setEditing(image);
        setOpen(true);
    };

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Images</h2>
                <Button type="button" size="sm" onClick={openCreate}>
                    <Plus /> Add image
                </Button>
            </div>

            {images.length === 0 ? (
                <p className="text-sm text-muted-foreground">No images yet.</p>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {images.map((image) => (
                        <button
                            key={image.id}
                            type="button"
                            onClick={() => openEdit(image)}
                            className="group relative aspect-square overflow-hidden rounded-lg border"
                            title="Edit image"
                        >
                            <img
                                src={image.image_url}
                                alt={image.alt_text ?? ''}
                                className="h-full w-full object-cover"
                            />
                            {image.is_primary && (
                                <span className="absolute top-2 left-2 flex items-center gap-1 rounded bg-background/90 px-2 py-0.5 text-xs">
                                    <Star className="size-3" /> Primary
                                </span>
                            )}
                            <span className="absolute right-2 bottom-2 rounded bg-background/90 p-1 opacity-0 group-hover:opacity-100">
                                <Pencil className="size-3" />
                            </span>
                        </button>
                    ))}
                </div>
            )}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editing ? 'Edit image' : 'Add image'}
                        </DialogTitle>
                        <DialogDescription>
                            {editing
                                ? 'Update the details of this image.'
                                : 'Upload a file or provide an image URL.'}
                        </DialogDescription>
                    </DialogHeader>

                    {editing ? (
                        <>
                            <Form
                                id="delete-image-form"
                                {...ProductImageController.destroy.form({
                                    product: product.id,
                                    image: editing.id,
                                })}
                                onBefore={() => confirm('Delete this image?')}
                                onSuccess={() => setOpen(false)}
                            >
                                {() => null}
                            </Form>
                            <Form
                                {...ProductImageController.update.form({
                                    product: product.id,
                                    image: editing.id,
                                })}
                                onSuccess={() => setOpen(false)}
                            >
                                {({ processing, errors }) => (
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="image-alt">
                                                Alt text
                                            </Label>
                                            <Input
                                                id="image-alt"
                                                name="alt_text"
                                                defaultValue={
                                                    editing.alt_text ?? ''
                                                }
                                            />
                                            <InputError
                                                message={errors.alt_text}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="image-sort">
                                                    Sort order
                                                </Label>
                                                <Input
                                                    id="image-sort"
                                                    name="sort_order"
                                                    type="number"
                                                    min="0"
                                                    defaultValue={
                                                        editing.sort_order
                                                    }
                                                />
                                                <InputError
                                                    message={errors.sort_order}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="image-primary">
                                                    Primary
                                                </Label>
                                                <select
                                                    id="image-primary"
                                                    name="is_primary"
                                                    defaultValue={
                                                        editing.is_primary
                                                            ? '1'
                                                            : '0'
                                                    }
                                                    className={selectClassName}
                                                >
                                                    <option value="0">
                                                        No
                                                    </option>
                                                    <option value="1">
                                                        Yes
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="submit"
                                                variant="destructive"
                                                form="delete-image-form"
                                            >
                                                Delete
                                            </Button>
                                            <Button disabled={processing}>
                                                Save changes
                                            </Button>
                                        </DialogFooter>
                                    </div>
                                )}
                            </Form>
                        </>
                    ) : (
                        <Form
                            {...ProductImageController.store.form(product.id)}
                            resetOnSuccess
                            onSuccess={() => setOpen(false)}
                        >
                            {({ processing, errors }) => (
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="image-file">File</Label>
                                        <Input
                                            id="image-file"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                        />
                                        <InputError message={errors.image} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="image-url">
                                            or image URL
                                        </Label>
                                        <Input
                                            id="image-url"
                                            name="image_url"
                                            type="url"
                                            placeholder="https://"
                                        />
                                        <InputError
                                            message={errors.image_url}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="image-alt-new">
                                            Alt text
                                        </Label>
                                        <Input
                                            id="image-alt-new"
                                            name="alt_text"
                                        />
                                        <InputError message={errors.alt_text} />
                                    </div>
                                    <DialogFooter>
                                        <Button disabled={processing}>
                                            Add image
                                        </Button>
                                    </DialogFooter>
                                </div>
                            )}
                        </Form>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
