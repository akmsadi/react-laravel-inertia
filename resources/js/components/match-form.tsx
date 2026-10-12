import { Form } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { MatchRecord, Venue } from '@/types';

type Props = {
    formProps: Pick<ComponentProps<typeof Form>, 'action' | 'method'>;
    match?: MatchRecord;
    venues: Venue[];
    submitLabel: string;
};

const selectClassName =
    'border-input bg-transparent h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';
const textareaClassName =
    'border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50';

const matchTypes = ['t10', 't20', 'odi', 'test', 'football'];
const statuses = ['scheduled', 'live', 'completed', 'abandoned', 'archived'];

export default function MatchForm({
    formProps,
    match,
    venues,
    submitLabel,
}: Props) {
    return (
        <Form {...formProps} className="max-w-2xl space-y-6">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="team_name">Team</Label>
                            <Input
                                id="team_name"
                                name="team_name"
                                defaultValue={match?.team_name ?? ''}
                                required
                            />
                            <InputError message={errors.team_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="opponent_name">Opponent</Label>
                            <Input
                                id="opponent_name"
                                name="opponent_name"
                                defaultValue={match?.opponent_name}
                                required
                            />
                            <InputError message={errors.opponent_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="match_type">Match type</Label>
                            <select
                                id="match_type"
                                name="match_type"
                                defaultValue={match?.match_type ?? 't20'}
                                className={selectClassName}
                            >
                                {matchTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.match_type} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="format_overs">Overs</Label>
                            <Input
                                id="format_overs"
                                name="format_overs"
                                type="number"
                                min={0}
                                defaultValue={match?.format_overs ?? 20}
                                required
                            />
                            <InputError message={errors.format_overs} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="venue_id">Venue</Label>
                            <select
                                id="venue_id"
                                name="venue_id"
                                defaultValue={match?.venue_id ?? ''}
                                className={selectClassName}
                            >
                                <option value="">No venue</option>
                                {venues.map((venue) => (
                                    <option key={venue.id} value={venue.id}>
                                        {venue.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.venue_id} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="scheduled_at">Scheduled at</Label>
                            <Input
                                id="scheduled_at"
                                name="scheduled_at"
                                type="datetime-local"
                                defaultValue={match?.scheduled_at
                                    ?.slice(0, 16)
                                    .replace(' ', 'T')}
                            />
                            <InputError message={errors.scheduled_at} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="match_status">Status</Label>
                            <select
                                id="match_status"
                                name="match_status"
                                defaultValue={
                                    match?.match_status ?? 'scheduled'
                                }
                                className={selectClassName}
                            >
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.match_status} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="result_type">Result type</Label>
                            <Input
                                id="result_type"
                                name="result_type"
                                defaultValue={match?.result_type ?? ''}
                            />
                            <InputError message={errors.result_type} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="toss_winner">Toss winner</Label>
                            <Input
                                id="toss_winner"
                                name="toss_winner"
                                defaultValue={match?.toss_winner ?? ''}
                            />
                            <InputError message={errors.toss_winner} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="toss_decision">Toss decision</Label>
                            <select
                                id="toss_decision"
                                name="toss_decision"
                                defaultValue={match?.toss_decision ?? ''}
                                className={selectClassName}
                            >
                                <option value="">-</option>
                                <option value="bat">Bat</option>
                                <option value="bowl">Bowl</option>
                            </select>
                            <InputError message={errors.toss_decision} />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="result_summary">Result summary</Label>
                        <textarea
                            id="result_summary"
                            name="result_summary"
                            rows={3}
                            defaultValue={match?.result_summary ?? ''}
                            className={textareaClassName}
                        />
                        <InputError message={errors.result_summary} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            defaultValue={match?.notes ?? ''}
                            className={textareaClassName}
                        />
                        <InputError message={errors.notes} />
                    </div>
                    <Button disabled={processing}>{submitLabel}</Button>
                </>
            )}
        </Form>
    );
}
