import { Head } from '@inertiajs/react';
import AttributeController from '@/actions/App/Http/Controllers/AttributeController';
import ProductAttributeForm from '@/components/product-attribute-form';
import attributes from '@/routes/attributes';

export default function CreateProductAttribute() {
    return (
        <>
            <Head title="Create product attribute" />
            <div className="p-4">
                <ProductAttributeForm
                    formProps={AttributeController.store.form()}
                    submitLabel="Create attribute"
                />
            </div>
        </>
    );
}

CreateProductAttribute.layout = {
    breadcrumbs: [
        { title: 'Product attributes', href: attributes.index() },
        { title: 'Create', href: attributes.create() },
    ],
};
