<?php

namespace App\Services;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class LeaderboardService
{
    private const NOT_DISMISSED = [null, '', 'not_out', 'retired_hurt', 'did_not_bat'];

    private const DID_NOT_BAT = [null, '', 'did_not_bat'];

    /**
     * @return Collection<int, array{id: int, name: string, matches: int, innings: int, runs: int, balls: int, fours: int, sixes: int, highest: string, strike_rate: string, average: string}>
     */
    public function topBatsmen(int $limit = 10): Collection
    {
        $matchesByPlayer = $this->matchesByPlayer();

        return $this->summaryRows('match_summary_batsmen')
            ->reject(fn (object $row): bool => (int) $row->balls === 0
                && (int) $row->runs === 0
                && in_array($row->dismissal_mode, self::DID_NOT_BAT, true))
            ->groupBy('player_id')
            ->map(function (Collection $rows, int $playerId) use ($matchesByPlayer): array {
                $runs = (int) $rows->sum('runs');
                $balls = (int) $rows->sum('balls');
                $dismissals = $rows->reject(fn (object $row): bool => in_array($row->dismissal_mode, self::NOT_DISMISSED, true))->count();
                $best = $rows->sort(fn (object $a, object $b): int => [(int) $b->runs, (int) $a->balls] <=> [(int) $a->runs, (int) $b->balls])->first();
                $bestNotOut = in_array($best->dismissal_mode, ['not_out', 'retired_hurt'], true);

                return [
                    'id' => $playerId,
                    'name' => $rows->first()->name,
                    'matches' => $matchesByPlayer[$playerId] ?? 0,
                    'innings' => $rows->count(),
                    'runs' => $runs,
                    'balls' => $balls,
                    'fours' => (int) $rows->sum('fours'),
                    'sixes' => (int) $rows->sum('sixes'),
                    'highest' => sprintf('%d%s (%d)', $best->runs, $bestNotOut ? '*' : '', $best->balls),
                    'strike_rate' => $balls > 0 ? number_format($runs / $balls * 100, 2, '.', '') : '-',
                    'average' => $dismissals > 0 ? number_format($runs / $dismissals, 2, '.', '') : '-',
                ];
            })
            ->sortByDesc('runs')
            ->take($limit)
            ->values();
    }

    /**
     * @return Collection<int, array{id: int, name: string, matches: int, innings: int, wickets: int, overs: string, runs: int, best: string, economy: string}>
     */
    public function topBowlers(int $limit = 10): Collection
    {
        $matchesByPlayer = $this->matchesByPlayer();

        return $this->summaryRows('match_summary_bowlers')
            ->filter(fn (object $row): bool => (float) $row->overs > 0)
            ->groupBy('player_id')
            ->map(function (Collection $rows, int $playerId) use ($matchesByPlayer): array {
                $balls = (int) $rows->sum(fn (object $row): int => $this->oversToBalls((float) $row->overs));
                $runs = (int) $rows->sum('runs');
                $best = $rows->sort(fn (object $a, object $b): int => [(int) $b->wickets, (int) $a->runs] <=> [(int) $a->wickets, (int) $b->runs])->first();

                return [
                    'id' => $playerId,
                    'name' => $rows->first()->name,
                    'matches' => $matchesByPlayer[$playerId] ?? 0,
                    'innings' => $rows->count(),
                    'wickets' => (int) $rows->sum('wickets'),
                    'overs' => intdiv($balls, 6).'.'.($balls % 6),
                    'runs' => $runs,
                    'best' => $best->wickets.'/'.$best->runs,
                    'economy' => number_format($runs / ($balls / 6), 2, '.', ''),
                    'economy_value' => $runs / ($balls / 6),
                ];
            })
            ->sortBy([['wickets', 'desc'], ['economy_value', 'asc']])
            ->take($limit)
            ->map(fn (array $row): array => collect($row)->except('economy_value')->all())
            ->values();
    }

    /**
     * @return Collection<int, object>
     */
    private function summaryRows(string $table): Collection
    {
        return DB::table($table.' as s')
            ->join('matches as m', 'm.id', '=', 's.match_id')
            ->join('players as p', 'p.id', '=', 's.player_id')
            ->whereNull('m.deleted_at')
            ->get(['s.*', 'p.name']);
    }

    /**
     * Number of distinct matches in which each player has a batting or bowling summary row.
     *
     * @return array<int, int>
     */
    private function matchesByPlayer(): array
    {
        return $this->summaryRows('match_summary_batsmen')
            ->concat($this->summaryRows('match_summary_bowlers'))
            ->groupBy('player_id')
            ->map(fn (Collection $rows): int => $rows->pluck('match_id')->unique()->count())
            ->all();
    }

    private function oversToBalls(float $overs): int
    {
        return (int) floor($overs) * 6 + (int) round(($overs - floor($overs)) * 10);
    }
}
