import { Head } from '@inertiajs/react';
import NewsletterManagementController from '@/actions/App/Http/Controllers/NewsletterManagementController';
import NewsletterForm from '@/components/newsletter-form';
import newsletters from '@/routes/admin/newsletters';

export default function CreateNewsletter() {
    return (
        <>
            <Head title="Add subscriber" />
            <div className="p-4">
                <NewsletterForm
                    formProps={NewsletterManagementController.store.form()}
                    submitLabel="Add subscriber"
                />
            </div>
        </>
    );
}

CreateNewsletter.layout = {
    breadcrumbs: [
        { title: 'Newsletter', href: newsletters.index() },
        { title: 'Create', href: newsletters.create() },
    ],
};
