import { Head } from '@inertiajs/react';
import ProductManagementController from '@/actions/App/Http/Controllers/ProductManagementController';
import ProductForm from '@/components/product-form';
import ProductImagesManager from '@/components/product-images-manager';
import ProductVariantsManager from '@/components/product-variants-manager';
import products from '@/routes/admin/products';
import type { AttributeOption, Product, ProductCategoryOption } from '@/types';

type Props = {
    product: Product;
    categories: ProductCategoryOption[];
    attributes: AttributeOption[];
};

export default function EditProduct({
    product,
    categories,
    attributes,
}: Props) {
    return (
        <>
            <Head title={`Edit ${product.name}`} />
            <div className="space-y-10 p-4">
                <ProductForm
                    formProps={ProductManagementController.update.form(
                        product.id,
                    )}
                    product={product}
                    categories={categories}
                    submitLabel="Save changes"
                />
                <ProductImagesManager product={product} />
                <ProductVariantsManager
                    product={product}
                    attributes={attributes}
                />
            </div>
        </>
    );
}

EditProduct.layout = {
    breadcrumbs: [
        { title: 'Products', href: products.index() },
        { title: 'Edit', href: products.index() },
    ],
};
