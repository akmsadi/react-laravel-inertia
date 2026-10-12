import { Head } from '@inertiajs/react';
import ExpenseManagementController from '@/actions/App/Http/Controllers/ExpenseManagementController';
import ExpenseForm from '@/components/expense-form';
import expensesRoute from '@/routes/admin/expenses';
import type { MatchOption } from '@/types';

export default function CreateExpense({ matches }: { matches: MatchOption[] }) {
    return (
        <>
            <Head title="Create expense" />
            <div className="p-4">
                <ExpenseForm
                    formProps={ExpenseManagementController.store.form()}
                    matches={matches}
                    submitLabel="Create expense"
                />
            </div>
        </>
    );
}

CreateExpense.layout = {
    breadcrumbs: [
        { title: 'Expenses', href: expensesRoute.index() },
        { title: 'Create', href: expensesRoute.create() },
    ],
};
