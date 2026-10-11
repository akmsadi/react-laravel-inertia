import { Head } from '@inertiajs/react';
import CustomerManagementController from '@/actions/App/Http/Controllers/CustomerManagementController';
import CustomerForm from '@/components/customer-form';
import customers from '@/routes/admin/customers';

export default function CreateCustomer() {
    return (
        <>
            <Head title="Create customer" />
            <div className="p-4">
                <CustomerForm
                    formProps={CustomerManagementController.store.form()}
                    submitLabel="Create customer"
                />
            </div>
        </>
    );
}

CreateCustomer.layout = {
    breadcrumbs: [
        { title: 'Customers', href: customers.index() },
        { title: 'Create', href: customers.create() },
    ],
};
