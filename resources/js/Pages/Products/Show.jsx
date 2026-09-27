import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

export default function ProductShow() {
    const { product } = usePage().props
    const [selectedImage, setSelectedImage] = useState(
        product.images.length > 0 ? product.images[0] : null
    )
    const [selectedVariant, setSelectedVariant] = useState(null)

    const handleAddToCart = () => {
        alert('Add to cart functionality coming soon!')
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Link
                    href="/products"
                    className="flex items-center text-blue-600 hover:text-blue-800 mb-8"
                >
                    <ChevronLeftIcon className="w-5 h-5 mr-2" />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg shadow-md p-8">
                    {/* Images */}
                    <div>
                        <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
                            {selectedImage ? (
                                <img
                                    src={selectedImage.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {product.images.length > 1 && (
                            <div className="flex gap-2">
                                {product.images.map((image) => (
                                    <button
                                        key={image.id}
                                        onClick={() => setSelectedImage(image)}
                                        className={`w-20 h-20 rounded border-2 overflow-hidden ${\n                                            selectedImage?.id === image.id
                                                ? 'border-blue-600'
                                                : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                    >
                                        <img
                                            src={image.image_url}
                                            alt="thumbnail"
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div>
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {product.name}
                            </h1>
                            <p className="text-gray-600">
                                Category: {product.category.name}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-gray-900">
                                ${parseFloat(product.base_price).toFixed(2)}
                            </span>
                            {product.tax_rate > 0 && (
                                <p className="text-sm text-gray-500 mt-2">
                                    Tax: {product.tax_rate}%
                                </p>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="mb-6">
                            {product.stock_quantity > 0 ? (
                                <div>
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        In Stock ({product.stock_quantity} available)
                                    </span>
                                </div>
                            ) : (
                                <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Description
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {product.description || product.short_description}
                            </p>
                        </div>

                        {/* Variants */}
                        {product.variants.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Variants
                                </h3>
                                <div className="space-y-3">
                                    {product.variants.map((variant) => (
                                        <button
                                            key={variant.id}
                                            onClick={() => setSelectedVariant(variant)}
                                            className={`w-full p-3 border-2 rounded-lg text-left transition ${
                                                selectedVariant?.id === variant.id
                                                    ? 'border-blue-600 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                        >
                                            <p className="font-medium text-gray-900">
                                                {variant.name || `Variant #${variant.id}`}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                SKU: {variant.sku}
                                            </p>
                                            {variant.price && (
                                                <p className="text-sm font-semibold text-blue-600 mt-1">
                                                    ${parseFloat(variant.price).toFixed(2)}
                                                </p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock_quantity === 0}
                            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition ${
                                product.stock_quantity > 0
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {product.stock_quantity > 0
                                ? 'Add to Cart'
                                : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
