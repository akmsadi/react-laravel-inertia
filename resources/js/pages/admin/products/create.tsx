import { Head } from '@inertiajs/react';
import ProductManagementController from '@/actions/App/Http/Controllers/ProductManagementController';
import ProductForm from '@/components/product-form';
import products from '@/routes/admin/products';
import type { ProductCategoryOption } from '@/types';

type Props = {
    categories: ProductCategoryOption[];
};

export default function CreateProduct({ categories }: Props) {
    return (
        <>
            <Head title="Create product" />
            <div className="p-4">
                <ProductForm
                    formProps={ProductManagementController.store.form()}
                    categories={categories}
                    submitLabel="Create product"
                />
            </div>
        </>
    );
}

CreateProduct.layout = {
    breadcrumbs: [
        { title: 'Products', href: products.index() },
        { title: 'Create', href: products.create() },
    ],
};
