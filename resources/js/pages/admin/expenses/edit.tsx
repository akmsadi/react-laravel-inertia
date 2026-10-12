import { Head } from '@inertiajs/react';
import ExpenseContributorController from '@/actions/App/Http/Controllers/ExpenseContributorController';
import ExpenseManagementController from '@/actions/App/Http/Controllers/ExpenseManagementController';
import ExpenseForm from '@/components/expense-form';
import PlayerChecklistForm from '@/components/player-checklist-form';
import expensesRoute from '@/routes/admin/expenses';
import type { Expense, MatchOption, PlayerOption } from '@/types';

type Props = {
    expense: Expense;
    matches: MatchOption[];
    contributorOptions: PlayerOption[];
    contributorIds: number[];
};

export default function EditExpense({
    expense,
    matches,
    contributorOptions,
    contributorIds,
}: Props) {
    return (
        <>
            <Head title={`Edit ${expense.title}`} />
            <div className="space-y-6 p-4">
                <ExpenseForm
                    formProps={ExpenseManagementController.update.form(
                        expense.id,
                    )}
                    expense={expense}
                    matches={matches}
                    submitLabel="Save changes"
                />
                <PlayerChecklistForm
                    formProps={ExpenseContributorController.update.form(
                        expense.id,
                    )}
                    title="Contributors"
                    description={
                        expense.match_id
                            ? 'Approved players in this match.'
                            : 'All approved players.'
                    }
                    players={contributorOptions}
                    selectedIds={contributorIds}
                    emptyMessage="No eligible players. Add players to the match first."
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
