import { Form } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { AdminCustomer } from '@/types';

type Props = {
    formProps: Pick<ComponentProps<typeof Form>, 'action' | 'method'>;
    customer?: AdminCustomer;
    submitLabel: string;
};

export default function CustomerForm({
    formProps,
    customer,
    submitLabel,
}: Props) {
    return (
        <Form {...formProps} className="max-w-xl space-y-6">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={customer?.name}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={customer?.email}
                            required
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            defaultValue={customer?.phone ?? ''}
                        />
                        <InputError message={errors.phone} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder={
                                customer ? 'Leave blank to keep current' : ''
                            }
                            required={!customer}
                        />
                        <InputError message={errors.password} />
                    </div>
                    <Button disabled={processing}>{submitLabel}</Button>
                </>
            )}
        </Form>
    );
}
