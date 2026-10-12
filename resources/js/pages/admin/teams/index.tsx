import { Form, Head, Link } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import TeamManagementController from '@/actions/App/Http/Controllers/TeamManagementController';
import ResourcePagination from '@/components/resource-pagination';
import { Button } from '@/components/ui/button';
import teams from '@/routes/admin/teams';
import type { Paginated, Team } from '@/types';

type Props = {
    teams: Paginated<Team>;
};

export default function TeamsIndex({ teams: paginated }: Props) {
    return (
        <>
            <Head title="Teams" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Teams</h1>
                    <Button asChild>
                        <Link href={teams.create()}>New team</Link>
                    </Button>
                </div>
                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2 font-medium">Name</th>
                                <th className="px-4 py-2 font-medium">
                                    Captain
                                </th>
                                <th className="px-4 py-2 font-medium">
                                    Record
                                </th>
                                <th className="px-4 py-2" />
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.data.map((team) => (
                                <tr key={team.id} className="border-t">
                                    <td className="px-4 py-2">
                                        <div className="font-medium">
                                            {team.name}
                                        </div>
                                        <div className="text-muted-foreground">
                                            {team.slug}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">
                                        {team.captain?.name ?? '-'}
                                    </td>
                                    <td className="px-4 py-2">
                                        {team.wins} wins / {team.matches}{' '}
                                        matches
                                    </td>
                                    <td className="flex justify-end gap-2 px-4 py-2">
                                        <Button
                                            asChild
                                            size="icon"
                                            variant="outline"
                                            title="Edit team"
                                        >
                                            <Link
                                                href={teams.edit(team.id)}
                                                aria-label="Edit team"
                                            >
                                                <Pencil />
                                            </Link>
                                        </Button>
                                        <Form
                                            {...TeamManagementController.destroy.form(
                                                team.id,
                                            )}
                                            onBefore={() =>
                                                confirm(
                                                    `Delete "${team.name}"?`,
                                                )
                                            }
                                        >
                                            {({ processing }) => (
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    title="Delete team"
                                                    aria-label="Delete team"
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
                                        colSpan={4}
                                        className="px-4 py-6 text-center text-muted-foreground"
                                    >
                                        No teams yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ResourcePagination data={paginated} label="teams" />
            </div>
        </>
    );
}

TeamsIndex.layout = {
    breadcrumbs: [{ title: 'Teams', href: teams.index() }],
};
