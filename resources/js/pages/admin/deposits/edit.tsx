import { Head } from '@inertiajs/react';
import DepositManagementController from '@/actions/App/Http/Controllers/DepositManagementController';
import DepositForm from '@/components/deposit-form';
import depositsRoute from '@/routes/admin/deposits';
import type { PlayerDeposit, PlayerOption } from '@/types';

type Props = {
    deposit: PlayerDeposit;
    players: PlayerOption[];
};

export default function EditDeposit({ deposit, players }: Props) {
    return (
        <>
            <Head title={`Edit deposit #${deposit.id}`} />
            <div className="p-4">
                <DepositForm
                    formProps={DepositManagementController.update.form(
                        deposit.id,
                    )}
                    deposit={deposit}
                    players={players}
                    submitLabel="Save changes"
                />
            </div>
        </>
    );
}

EditDeposit.layout = {
    breadcrumbs: [
        { title: 'Deposits', href: depositsRoute.index() },
        { title: 'Edit', href: depositsRoute.index() },
    ],
};
