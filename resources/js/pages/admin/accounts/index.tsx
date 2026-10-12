import { Head } from '@inertiajs/react';
import accounts from '@/routes/admin/accounts';
import type { PlayerAccount } from '@/types';

type Props = {
    accounts: PlayerAccount[];
    totals: Pick<PlayerAccount, 'deposited' | 'owed' | 'balance'>;
};

const formatAmount = (amount: number): string =>
    amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

const balanceClassName = (balance: number): string =>
    balance > 0
        ? 'text-green-600'
        : balance < 0
          ? 'text-red-600'
          : 'text-muted-foreground';

export default function AccountsIndex({ accounts: rows, totals }: Props) {
    return (
        <>
            <Head title="Accounts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-xl font-semibold">Accounts</h1>
                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-xs text-muted-foreground uppercase">
                            <tr>
                                <th className="px-4 py-2 font-medium">Name</th>
                                <th className="px-4 py-2 font-medium">Phone</th>
                                <th className="px-4 py-2 font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-2 font-medium">
                                    Matches
                                </th>
                                <th className="px-4 py-2 text-right font-medium">
                                    Deposited
                                </th>
                                <th className="px-4 py-2 text-right font-medium">
                                    Owed
                                </th>
                                <th className="px-4 py-2 text-right font-medium">
                                    Balance
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row) => (
                                <tr key={row.id} className="border-t">
                                    <td className="px-4 py-2">{row.name}</td>
                                    <td className="px-4 py-2">{row.phone}</td>
                                    <td className="px-4 py-2 capitalize">
                                        {row.status}
                                    </td>
                                    <td className="px-4 py-2">{row.matches}</td>
                                    <td className="px-4 py-2 text-right">
                                        {formatAmount(row.deposited)}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        {formatAmount(row.owed)}
                                    </td>
                                    <td
                                        className={`px-4 py-2 text-right ${balanceClassName(row.balance)}`}
                                    >
                                        {formatAmount(row.balance)}
                                    </td>
                                </tr>
                            ))}
                            {rows.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No players yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot className="border-t bg-muted/30 font-medium">
                            <tr>
                                <td className="px-4 py-2" colSpan={4}>
                                    Total
                                </td>
                                <td className="px-4 py-2 text-right">
                                    {formatAmount(totals.deposited)}
                                </td>
                                <td className="px-4 py-2 text-right">
                                    {formatAmount(totals.owed)}
                                </td>
                                <td
                                    className={`px-4 py-2 text-right ${balanceClassName(totals.balance)}`}
                                >
                                    {formatAmount(totals.balance)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    );
}

AccountsIndex.layout = {
    breadcrumbs: [{ title: 'Accounts', href: accounts.index() }],
};
