import { Head } from '@inertiajs/react';
import NewsletterManagementController from '@/actions/App/Http/Controllers/NewsletterManagementController';
import NewsletterForm from '@/components/newsletter-form';
import newsletters from '@/routes/admin/newsletters';
import type { NewsletterSubscriber } from '@/types';

export default function EditNewsletter({
    newsletter,
}: {
    newsletter: NewsletterSubscriber;
}) {
    return (
        <>
            <Head title={`Edit ${newsletter.email}`} />
            <div className="p-4">
                <NewsletterForm
                    formProps={NewsletterManagementController.update.form(
                        newsletter.id,
                    )}
                    newsletter={newsletter}
                    submitLabel="Save changes"
                />
            </div>
        </>
    );
}

EditNewsletter.layout = {
    breadcrumbs: [
        { title: 'Newsletter', href: newsletters.index() },
        { title: 'Edit', href: newsletters.index() },
    ],
};
