import { Head } from '@inertiajs/react';
import AttributeController from '@/actions/App/Http/Controllers/AttributeController';
import ProductAttributeForm from '@/components/product-attribute-form';
import attributes from '@/routes/attributes';
import type { ProductAttribute } from '@/types';

type Props = {
    attribute: ProductAttribute;
};

export default function EditProductAttribute({ attribute }: Props) {
    return (
        <>
            <Head title={`Edit ${attribute.name}`} />
            <div className="p-4">
                <ProductAttributeForm
                    formProps={AttributeController.update.form(attribute.id)}
                    attribute={attribute}
                    submitLabel="Save changes"
                />
            </div>
        </>
    );
}

EditProductAttribute.layout = {
    breadcrumbs: [
        { title: 'Product attributes', href: attributes.index() },
        { title: 'Edit', href: attributes.index() },
    ],
};
