import { Head } from '@inertiajs/react';
import CustomerManagementController from '@/actions/App/Http/Controllers/CustomerManagementController';
import CustomerForm from '@/components/customer-form';
import customers from '@/routes/admin/customers';
import type { AdminCustomer } from '@/types';

export default function EditCustomer({
    customer,
}: {
    customer: AdminCustomer;
}) {
    return (
        <>
            <Head title={`Edit ${customer.name}`} />
            <div className="p-4">
                <CustomerForm
                    formProps={CustomerManagementController.update.form(
                        customer.id,
                    )}
                    customer={customer}
                    submitLabel="Save changes"
                />
            </div>
        </>
    );
}

EditCustomer.layout = {
    breadcrumbs: [
        { title: 'Customers', href: customers.index() },
        { title: 'Edit', href: customers.index() },
    ],
};
