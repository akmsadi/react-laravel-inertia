import { Form } from '@inertiajs/react';
import OrderShippingAddressController from '@/actions/App/Http/Controllers/OrderShippingAddressController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Order } from '@/types';

type Address = NonNullable<Order['shipping_address']>[number];

const fields: { name: keyof Address; label: string; required?: boolean }[] = [
    { name: 'first_name', label: 'First name', required: true },
    { name: 'last_name', label: 'Last name', required: true },
    { name: 'phone', label: 'Phone' },
    { name: 'email', label: 'Email' },
    { name: 'street_address', label: 'Street address', required: true },
    { name: 'city', label: 'City', required: true },
    { name: 'state', label: 'State' },
    { name: 'postal_code', label: 'Postal code', required: true },
    { name: 'country', label: 'Country', required: true },
];

export default function OrderShippingAddressForm({ order }: { order: Order }) {
    const address = order.shipping_address?.[0];

    return (
        <Form
            {...OrderShippingAddressController.update.form(order.id)}
            className="space-y-3 rounded-lg border p-4 text-sm"
        >
            {({ processing, errors, recentlySuccessful }) => (
                <>
                    <h2 className="font-medium">Shipping address</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {fields.map((field) => (
                            <div key={field.name} className="grid gap-1">
                                <Label htmlFor={`address_${field.name}`}>
                                    {field.label}
                                </Label>
                                <Input
                                    id={`address_${field.name}`}
                                    name={field.name}
                                    defaultValue={
                                        (address?.[field.name] as
                                            | string
                                            | null
                                            | undefined) ?? ''
                                    }
                                    required={field.required}
                                />
                                <InputError message={errors[field.name]} />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <Button disabled={processing} size="sm">
                            Save address
                        </Button>
                        {recentlySuccessful && (
                            <span className="text-muted-foreground">
                                Saved.
                            </span>
                        )}
                    </div>
                </>
            )}
        </Form>
    );
}
