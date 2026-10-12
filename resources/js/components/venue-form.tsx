import { Form } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Venue } from '@/types';

type Props = {
    formProps: Pick<ComponentProps<typeof Form>, 'action' | 'method'>;
    venue?: Venue;
    submitLabel: string;
};

export default function VenueForm({ formProps, venue, submitLabel }: Props) {
    return (
        <Form {...formProps} className="max-w-xl space-y-6">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={venue?.name}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>
                    <Button disabled={processing}>{submitLabel}</Button>
                </>
            )}
        </Form>
    );
}
