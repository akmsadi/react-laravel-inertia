import { Form, Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import DepositManagementController from '@/actions/App/Http/Controllers/DepositManagementController';
import ResourcePagination from '@/components/resource-pagination';
import { Button } from '@/components/ui/button';
import deposits from '@/routes/admin/deposits';
import type { Paginated, PlayerDeposit, PlayerOption } from '@/types';

type Props = {
    deposits: Paginated<PlayerDeposit>;
    total: string | number;
    players: PlayerOption[];
    playerId: number | null;
};

const formatAmount = (amount: string | number): string =>
    Number(amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

export default function DepositsIndex({
    deposits: paginated,
    total,
    players,
    playerId,
}: Props) {
    return (
        <>
            <Head title="Deposits" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Deposits</h1>
                    <Button asChild>
                        <Link href={deposits.create()}>New deposit</Link>
                    </Button>
                </div>
                <div className="flex items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-2">
                        <label htmlFor="player-filter">Player</label>
                        <select
                            id="player-filter"
                            value={playerId ?? ''}
                            onChange={(event) =>
                                router.get(
                                    deposits.index.url(),
                                    event.target.value
                                        ? { player_id: event.target.value }
                                        : {},
                                    { preserveState: true },
                                )
                            }
                            className="h-9 rounded-md border bg-background px-3"
                        >
                            <option value="">All</option>
                            {players.map((player) => (
                                <option key={player.id} value={player.id}>
                                    {player.name}
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
                                <th className="px-4 py-2 font-medium">
                                    Player
                                </th>
                                <th className="px-4 py-2 font-medium">
                                    Amount
                                </th>
                                <th className="px-4 py-2 font-medium">Notes</th>
                                <th className="px-4 py-2 font-medium">Date</th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.data.map((deposit) => (
                                <tr key={deposit.id} className="border-t">
                                    <td className="px-4 py-2 font-medium">
                                        {deposit.player?.name ?? '-'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {formatAmount(deposit.amount)}
                                    </td>
                                    <td className="px-4 py-2">
                                        {deposit.notes ?? '-'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {deposit.created_at
                                            ? new Date(
                                                  deposit.created_at,
                                              ).toLocaleDateString()
                                            : '-'}
                                    </td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit deposit"
                                        >
                                            <Link
                                                href={deposits.edit(deposit.id)}
                                                aria-label="Edit deposit"
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>
                                        <Form
                                            {...DepositManagementController.destroy.form(
                                                deposit.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete deposit of ${formatAmount(deposit.amount)}?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    title="Delete deposit"
                                                    aria-label="Delete deposit"
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
                                        No deposits yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ResourcePagination data={paginated} label="deposits" />
            </div>
        </>
    );
}

DepositsIndex.layout = {
    breadcrumbs: [{ title: 'Deposits', href: deposits.index() }],
};
