import type { MatchOption } from '@/types';

export const matchLabel = (match: MatchOption): string => {
    const title = `${match.team_name} vs ${match.opponent_name}`;

    return match.scheduled_at
        ? `${title} (${new Date(match.scheduled_at).toLocaleDateString()})`
        : title;
};
