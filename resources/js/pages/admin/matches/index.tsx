import { Form, Head, Link } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import MatchManagementController from '@/actions/App/Http/Controllers/MatchManagementController';
import ResourcePagination from '@/components/resource-pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import matches from '@/routes/admin/matches';
import type { MatchRecord, Paginated } from '@/types';

type Props = {
    matches: Paginated<MatchRecord>;
};

export default function MatchesIndex({ matches: paginated }: Props) {
    return (
        <>
            <Head title="Matches" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Matches</h1>
                    <Button asChild>
                        <Link href={matches.create()}>New match</Link>
                    </Button>
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Match</th>
                                <th className="px-4 py-2 font-medium">Type</th>
                                <th className="px-4 py-2 font-medium">Venue</th>
                                <th className="px-4 py-2 font-medium">Date</th>
                                <th className="px-4 py-2 font-medium">
                                    Status
                                </th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.data.map((match) => (
                                <tr key={match.id} className="border-t">
                                    <td className="px-4 py-2 font-medium">
                                        {match.team_name} vs{' '}
                                        {match.opponent_name}
                                    </td>
                                    <td className="px-4 py-2 uppercase">
                                        {match.match_type}
                                    </td>
                                    <td className="px-4 py-2">
                                        {match.venue?.name ?? '-'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {match.scheduled_at?.slice(0, 16) ??
                                            '-'}
                                    </td>
                                    <td className="px-4 py-2">
                                        <Badge variant="secondary">
                                            {match.match_status}
                                        </Badge>
                                    </td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit match"
                                        >
                                            <Link
                                                href={matches.edit(match.id)}
                                                aria-label="Edit match"
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>
                                        <Form
                                            {...MatchManagementController.destroy.form(
                                                match.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete "${match.team_name} vs ${match.opponent_name}"?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    title="Delete match"
                                                    aria-label="Delete match"
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
                                        colSpan={6}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No matches yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ResourcePagination data={paginated} label="matches" />
            </div>
        </>
    );
}

MatchesIndex.layout = {
    breadcrumbs: [{ title: 'Matches', href: matches.index() }],
};
