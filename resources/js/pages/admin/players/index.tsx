import { Form, Head, Link } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import PlayerManagementController from '@/actions/App/Http/Controllers/PlayerManagementController';
import { Badge } from '@/components/ui/badge';
import ResourcePagination from '@/components/resource-pagination';
import { Button } from '@/components/ui/button';
import players from '@/routes/admin/players';
import type { Paginated, Player } from '@/types';

type Props = {
    players: Paginated<Player>;
};

export default function PlayersIndex({ players: paginated }: Props) {
    return (
        <>
            <Head title="Players" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Players</h1>
                    <Button asChild>
                        <Link href={players.create()}>New player</Link>
                    </Button>
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Name</th>
                                <th className="px-4 py-2 font-medium">
                                    Organization
                                </th>
                                <th className="px-4 py-2 font-medium">Email</th>
                                <th className="px-4 py-2 font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.data.map((player) => (
                                <tr key={player.id} className="border-t">
                                    <td className="px-4 py-2">
                                        <div className="font-medium">
                                            {player.name}
                                        </div>
                                        <div className="text-muted-foreground">
                                            {player.nickname}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        {player.organization ?? '-'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {player.email ?? '-'}
                                    </td>
                                    <td className="px-4 py-2">
                                        <Badge
                                            variant={
                                                player.status === 'approved'
                                                    ? 'default'
                                                    : 'secondary'
                                            }
                                        >
                                            {player.status}
                                        </Badge>
                                    </td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit player"
                                        >
                                            <Link
                                                href={players.edit(player.id)}
                                                aria-label="Edit player"
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>
                                        <Form
                                            {...PlayerManagementController.destroy.form(
                                                player.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete "${player.name}"?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    title="Delete player"
                                                    aria-label="Delete player"
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
                                        No players yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ResourcePagination data={paginated} label="players" />
            </div>
        </>
    );
}

PlayersIndex.layout = {
    breadcrumbs: [{ title: 'Players', href: players.index() }],
};
