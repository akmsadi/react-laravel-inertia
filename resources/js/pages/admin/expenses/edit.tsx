import { Head } from '@inertiajs/react';
import ExpenseManagementController from '@/actions/App/Http/Controllers/ExpenseManagementController';
import ExpenseForm from '@/components/expense-form';
import expensesRoute from '@/routes/admin/expenses';
import type { Expense, MatchOption } from '@/types';

type Props = {
    expense: Expense;
    matches: MatchOption[];
};

export default function EditExpense({ expense, matches }: Props) {
    return (
        <>
            <Head title={`Edit ${expense.title}`} />
            <div className="p-4">
                <ExpenseForm
                    formProps={ExpenseManagementController.update.form(
                        expense.id,
                    )}
                    expense={expense}
                    matches={matches}
                    submitLabel="Save changes"
                />
            </div>
        </>
    );
}

EditExpense.layout = {
    breadcrumbs: [
        { title: 'Expenses', href: expensesRoute.index() },
        { title: 'Edit', href: expensesRoute.index() },
    ],
};
