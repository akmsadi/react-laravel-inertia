import { Head } from '@inertiajs/react';
import DepositManagementController from '@/actions/App/Http/Controllers/DepositManagementController';
import DepositForm from '@/components/deposit-form';
import depositsRoute from '@/routes/admin/deposits';
import type { PlayerOption } from '@/types';

export default function CreateDeposit({ players }: { players: PlayerOption[] }) {
    return (
        <>
            <Head title="Create deposit" />
            <div className="p-4">
                <DepositForm
                    formProps={DepositManagementController.store.form()}
                    players={players}
                    submitLabel="Create deposit"
                />
            </div>
        </>
    );
}

CreateDeposit.layout = {
    breadcrumbs: [
        { title: 'Deposits', href: depositsRoute.index() },
        { title: 'Create', href: depositsRoute.create() },
    ],
};
