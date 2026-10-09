import React, { useState } from "react";
import { Form, Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import CartController from "@/actions/App/Http/Controllers/CartController";
import type { Category } from "@/types";

type ProductImage = {
    id: number;
    image_url: string;
};

type ProductVariant = {
    id: number;
    name: string | null;
    sku: string;
    price: string | null;
    stock_quantity: number;
    is_active: boolean;
};

type Product = {
    id: number;
    name: string;
    category: Pick<Category, "name">;
    images: ProductImage[];
    variants: ProductVariant[];
    base_price: string;
    tax_rate: number;
    stock_quantity: number;
    description: string | null;
    short_description: string | null;
};

type PageProps = {
    product: Product;
};

export default function ProductShow({ product }: PageProps) {
    const [selectedImage, setSelectedImage] = useState<ProductImage | null>(
        product.images.length > 0 ? product.images[0] : null,
    );
    const [selectedVariant, setSelectedVariant] =
        useState<ProductVariant | null>(null);
    const hasVariants = product.variants.length > 0;
    const canAddToCart = selectedVariant
        ? selectedVariant.is_active && selectedVariant.stock_quantity > 0
        : !hasVariants && product.stock_quantity > 0;
    const displayedStock = selectedVariant
        ? selectedVariant.stock_quantity
        : hasVariants
          ? null
          : product.stock_quantity;
    const displayedPrice = selectedVariant?.price ?? product.base_price;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-[1600px] px-4 py-8">
                <Link
                    href="/products"
                    className="mb-8 flex items-center text-blue-600 hover:text-blue-800"
                >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 gap-8 rounded-lg bg-white p-8 shadow-md lg:grid-cols-2">
                    <div>
                        <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gray-200">
                            {selectedImage ? (
                                <img
                                    src={selectedImage.image_url}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>

                        {product.images.length > 1 && (
                            <div className="flex gap-2">
                                {product.images.map((image) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setSelectedImage(image)}
                                        className={`h-20 w-20 overflow-hidden rounded border-2 ${
                                            selectedImage?.id === image.id
                                                ? "border-blue-600"
                                                : "border-gray-200 hover:border-gray-400"
                                        }`}
                                    >
                                        <img
                                            src={image.image_url}
                                            alt="thumbnail"
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="mb-6">
                            <h1 className="mb-2 text-3xl font-bold text-gray-900">
                                {product.name}
                            </h1>
                            <p className="text-gray-600">
                                Category: {product.category.name}
                            </p>
                        </div>

                        <div className="mb-6">
                            <span className="text-4xl font-bold text-gray-900">
                                ${parseFloat(displayedPrice).toFixed(2)}
                            </span>
                            {product.tax_rate > 0 && (
                                <p className="mt-2 text-sm text-gray-500">
                                    Tax: {product.tax_rate}%
                                </p>
                            )}
                        </div>

                        <div className="mb-6">
                            {displayedStock === null ? (
                                <span className="text-sm text-gray-600">
                                    Select a variant to check availability.
                                </span>
                            ) : displayedStock > 0 &&
                              (!selectedVariant ||
                                  selectedVariant.is_active) ? (
                                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                    In Stock ({displayedStock} available)
                                </span>
                            ) : (
                                <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        <div className="mb-8">
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                Description
                            </h3>
                            <p className="leading-relaxed text-gray-700">
                                {product.description ||
                                    product.short_description}
                            </p>
                        </div>

                        {product.variants.length > 0 && (
                            <div className="mb-8">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                                    Variants
                                </h3>
                                <div className="space-y-3">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            type="button"
                                            onClick={() =>
                                                setSelectedVariant(variant)
                                            }
                                            disabled={
                                                !variant.is_active ||
                                                variant.stock_quantity === 0
                                            }
                                            aria-pressed={
                                                selectedVariant?.id ===
                                                variant.id
                                            }
                                            className={`w-full rounded-lg border-2 p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                                selectedVariant?.id ===
                                                variant.id
                                                    ? "border-blue-600 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-400"
                                            }`}
                                        >
                                            <p className="font-medium text-gray-900">
                                                {variant.name ||
                                                    `Variant #${variant.id}`}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                SKU: {variant.sku}
                                            </p>
                                            {variant.price && (
                                                <p className="mt-1 text-sm font-semibold text-blue-600">
                                                    $
                                                    {parseFloat(
                                                        variant.price,
                                                    ).toFixed(2)}
                                                </p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Form
                            action={CartController.store.url(product.id)}
                            method="post"
                            options={{ preserveScroll: true }}
                            className="space-y-3"
                        >
                            {({ processing, errors, recentlySuccessful }) => (
                                <>
                                    <input
                                        type="hidden"
                                        name="variant_id"
                                        value={selectedVariant?.id ?? ""}
                                        readOnly
                                    />
                                    {errors.variant_id && (
                                        <p
                                            className="text-sm text-red-600"
                                            role="alert"
                                        >
                                            {errors.variant_id}
                                        </p>
                                    )}
                                    {errors.cart && (
                                        <p
                                            className="text-sm text-red-600"
                                            role="alert"
                                        >
                                            {errors.cart}
                                        </p>
                                    )}
                                    <button
                                        type="submit"
                                        className={`w-full rounded-lg px-6 py-3 font-semibold text-white transition ${
                                            canAddToCart
                                                ? "bg-blue-600 hover:bg-blue-700"
                                                : "cursor-not-allowed bg-gray-400"
                                        }`}
                                        disabled={!canAddToCart || processing}
                                    >
                                        {processing
                                            ? "Adding..."
                                            : canAddToCart
                                              ? "Add to Cart"
                                              : hasVariants && !selectedVariant
                                                ? "Select a Variant"
                                                : "Out of Stock"}
                                    </button>
                                    {recentlySuccessful && (
                                        <p
                                            className="text-sm text-green-700"
                                            role="status"
                                        >
                                            Added to cart.
                                        </p>
                                    )}
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
