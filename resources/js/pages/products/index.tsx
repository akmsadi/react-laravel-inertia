import { Link, router } from "@inertiajs/react";

type Product = {
    id: number;
    name: string;
    images: { image_url: string }[];
    category: { name: string };
    base_price: string;
    stock_quantity: number;
    variants: { id: number }[];
};

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type Filters = {
    category: string | number;
    attributes: Record<string, string | number>;
};

type PageProps = {
    categories: { id: number; name: string }[];
    attributes: {
        id: number;
        name: string;
        values: { id: number; value: string }[];
    }[];
    filters: Filters;
    products: {
        data: Product[];
        links: PaginationLink[];
    };
};

export default function ProductsIndex({
    products,
    categories,
    attributes,
    filters,
}: PageProps) {
    const selectedAttributes = filters.attributes ?? {};
    const hasFilters =
        Boolean(filters.category) || Object.keys(selectedAttributes).length > 0;

    const applyFilters = (category: string, attrs: Record<string, string>) => {
        const cleaned = Object.fromEntries(
            Object.entries(attrs).filter(([, value]) => value !== ""),
        );

        router.get(
            "/products",
            {
                ...(category ? { category } : {}),
                ...(Object.keys(cleaned).length ? { attributes: cleaned } : {}),
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const currentAttributes = Object.fromEntries(
        Object.entries(selectedAttributes).map(([key, value]) => [
            key,
            String(value),
        ]),
    );
    const selectClass =
        "rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700";

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-[1600px] px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Products
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Browse our collection of products
                    </p>
                </div>

                <div className="mb-8 flex flex-wrap items-center gap-3 rounded-lg bg-white p-4 shadow">
                    <select
                        aria-label="Category"
                        className={selectClass}
                        value={String(filters.category ?? "")}
                        onChange={(event) =>
                            applyFilters(event.target.value, currentAttributes)
                        }
                    >
                        <option value="">All categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {attributes.map((attribute) => (
                        <select
                            key={attribute.id}
                            aria-label={attribute.name}
                            className={selectClass}
                            value={currentAttributes[attribute.id] ?? ""}
                            onChange={(event) =>
                                applyFilters(String(filters.category ?? ""), {
                                    ...currentAttributes,
                                    [attribute.id]: event.target.value,
                                })
                            }
                        >
                            <option value="">All {attribute.name}</option>
                            {attribute.values.map((value) => (
                                <option key={value.id} value={value.id}>
                                    {value.value}
                                </option>
                            ))}
                        </select>
                    ))}

                    {hasFilters && (
                        <Link
                            href="/products"
                            className="text-sm font-semibold text-red-600"
                        >
                            Clear filters
                        </Link>
                    )}
                </div>

                {products.data.length === 0 && (
                    <p className="py-12 text-center text-gray-500">
                        No products match these filters.
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.data.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition"
                        >
                            <div className="aspect-square bg-gray-200 rounded-t-lg overflow-hidden">
                                {product.images.length > 0 ? (
                                    <img
                                        src={product.images[0].image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover hover:scale-105 transition"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 line-clamp-2">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {product.category.name}
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-lg font-bold text-gray-900">
                                        $
                                        {parseFloat(product.base_price).toFixed(
                                            2,
                                        )}
                                    </span>
                                    {product.stock_quantity > 0 ? (
                                        <span className="text-sm text-green-600 font-medium">
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="text-sm text-red-600 font-medium">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>

                                {product.variants.length > 0 && (
                                    <p className="text-xs text-gray-400 mt-2">
                                        {product.variants.length} variant(s)
                                        available
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {products.links && (
                    <div className="mt-8 flex justify-center gap-2">
                        {products.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || "#"}
                                className={`px-4 py-2 rounded ${
                                    link.active
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
