import { Form, Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import ExpenseManagementController from '@/actions/App/Http/Controllers/ExpenseManagementController';
import ResourcePagination from '@/components/resource-pagination';
import { Button } from '@/components/ui/button';
import { matchLabel } from '@/lib/match-label';
import expenses from '@/routes/admin/expenses';
import type { Expense, MatchOption, Paginated } from '@/types';

type Props = {
    expenses: Paginated<Expense>;
    total: string | number;
    matches: MatchOption[];
    match: string | null;
};

const formatAmount = (amount: string | number): string =>
    Number(amount).toLocaleString();

export default function ExpensesIndex({
    expenses: paginated,
    total,
    matches,
    match,
}: Props) {
    return (
        <>
            <Head title="Expenses" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Expenses</h1>
                    <Button asChild>
                        <Link href={expenses.create()}>New expense</Link>
                    </Button>
                </div>
                <div className="flex items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-2">
                        <label htmlFor="match-filter">Match</label>
                        <select
                            id="match-filter"
                            value={match ?? ''}
                            onChange={(event) =>
                                router.get(
                                    expenses.index.url(),
                                    event.target.value
                                        ? { match: event.target.value }
                                        : {},
                                    { preserveState: true },
                                )
                            }
                            className="h-9 rounded-md border bg-background px-3"
                        >
                            <option value="">All</option>
                            <option value="none">No match</option>
                            {matches.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {matchLabel(option)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <span className="font-medium">
                        Total: {formatAmount(total)}
                    </span>
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Title</th>
                                <th className="px-4 py-2 font-medium">
                                    Amount
                                </th>
                                <th className="px-4 py-2 font-medium">Match</th>
                                <th className="px-4 py-2 font-medium">Notes</th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.data.map((expense) => (
                                <tr key={expense.id} className="border-t">
                                    <td className="px-4 py-2 font-medium">
                                        {expense.title}
                                    </td>
                                    <td className="px-4 py-2">
                                        {formatAmount(expense.amount)}
                                    </td>
                                    <td className="px-4 py-2">
                                        {expense.match
                                            ? matchLabel(expense.match)
                                            : '-'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {expense.notes ?? '-'}
                                    </td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit expense"
                                        >
                                            <Link
                                                href={expenses.edit(expense.id)}
                                                aria-label="Edit expense"
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>
                                        <Form
                                            {...ExpenseManagementController.destroy.form(
                                                expense.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete "${expense.title}"?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    title="Delete expense"
                                                    aria-label="Delete expense"
                                                    disabled={processing}
                                                >
                                                    <Trash2 />
                                                </Button>
                                            )}
                                        </Form>
                                    </td>
                                </tr>
                            ))}
                            {paginated.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No expenses yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ResourcePagination data={paginated} label="expenses" />
            </div>
        </>
    );
}

ExpensesIndex.layout = {
    breadcrumbs: [{ title: 'Expenses', href: expenses.index() }],
};
