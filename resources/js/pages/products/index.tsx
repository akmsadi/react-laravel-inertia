import { Link } from "@inertiajs/react";

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

type PageProps = {
    products: {
        data: Product[];
        links: PaginationLink[];
    };
};

export default function ProductsIndex({ products }: PageProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Products
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Browse our collection of products
                    </p>
                </div>

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
