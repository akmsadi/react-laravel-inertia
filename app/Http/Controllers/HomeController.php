<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\Matches;
use App\Models\MatchSummaryBatsman;
use App\Models\Player;
use App\Models\Team;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $lastMatch = Matches::orderBy('scheduled_at', 'desc')->with('venue')->limit(1)->first();
        $nextMatch = Matches::where('scheduled_at', '>', date('Y-m-d H:i:s'))->where('match_status', '!=', 'archived')->orderBy('scheduled_at', 'asc')->with('venue')->limit(1)->first();
        $players = Player::where('status', 'approved')->limit(5)->inRandomOrder()->get();
        $events = Events::with('images')->latest()->orderBy('id', 'desc')->limit(5)->get();
        $teams = Team::orderBy('name', 'asc')->get();

        return Inertia::render('welcome', [
            'lastMatch' => $lastMatch,
            'nextMatch' => $nextMatch,
            'players' => $players,
            'events' => $events,
            'teams' => $teams,
            'playerCount' => Player::where('status', 'approved')->count(),
            'pendingCount' => Player::where('status', 'pending')->count(),
        ]);
    }

    public function about()
    {
        return inertia('about');
    }

    public function matchCenter(?Matches $match = null): Response
    {
        $match = Matches::with(['venue', 'summaryBatsmen.player', 'summaryBowlers.player'])
            ->when($match, fn ($query) => $query->whereKey($match->id))
            ->orderByDesc('scheduled_at')
            ->first();
        $previousMatchId = $match?->scheduled_at
            ? Matches::where('scheduled_at', '<', $match->scheduled_at)->orderByDesc('scheduled_at')->value('id')
            : null;
        $nextMatchId = $match?->scheduled_at
            ? Matches::where('scheduled_at', '>', $match->scheduled_at)->orderBy('scheduled_at')->value('id')
            : null;
        $oldMatches = Matches::with('venue')
            ->where(function ($query) {
                $query
                    ->whereIn('match_status', [
                        'completed',
                        'finished',
                        'result',
                        'archived',
                    ])
                    ->orWhere(function ($query) {
                        $query
                            ->whereNotNull('scheduled_at')
                            ->where('scheduled_at', '<', now());
                    });
            })
            ->when($match, fn ($query) => $query->where('id', '!=', $match->id))
            ->orderByDesc('scheduled_at')
            ->limit(12)
            ->get();

        return Inertia::render('match-center', [
            'match' => $match?->makeHidden(['summaryBatsmen', 'summaryBowlers']),
            'summary' => $match ? $this->buildMatchSummary($match) : [],
            'previousMatchId' => $previousMatchId,
            'nextMatchId' => $nextMatchId,
            'oldMatches' => $oldMatches,
        ]);
    }

    /**
     * @return array<int, array{batting_side: string, runs: int, wickets: int, overs: string, batsmen: array<int, array{name: string, runs: int, balls: int, not_out: bool}>, bowlers: array<int, array{name: string, wickets: int, runs: int, overs: string}>}>
     */
    private function buildMatchSummary(Matches $match): array
    {
        $extras = DB::table('match_summary_extras')
            ->where('match_id', $match->id)
            ->get()
            ->keyBy('innings_number');

        $wickets = DB::table('match_summary_wickets')
            ->join('players', 'players.id', '=', 'match_summary_wickets.player_id')
            ->where('match_summary_wickets.match_id', $match->id)
            ->orderBy('match_summary_wickets.over_at_dismissal')
            ->get(['match_summary_wickets.innings_number', 'match_summary_wickets.score_at_dismissal', 'match_summary_wickets.over_at_dismissal', 'players.name'])
            ->groupBy('innings_number');

        $playerNames = Player::whereIn('id', $match->summaryBatsmen->pluck('dismissal_by')->merge($match->summaryBatsmen->pluck('fielder_id'))->filter()->unique())
            ->pluck('name', 'id');

        $battingFirstIsTeamA = ! ($match->toss_decision === 'bat' && $match->toss_winner === 'team_b')
            && ! ($match->toss_decision === 'bowl' && $match->toss_winner === 'team_a');

        return $match->summaryBatsmen
            ->groupBy('innings_number')
            ->sortKeys()
            ->map(function ($batsmen, $inningsNumber) use ($match, $extras, $battingFirstIsTeamA, $wickets, $playerNames) {
                $bowlers = $match->summaryBowlers
                    ->where('innings_number', $inningsNumber)
                    ->filter(fn ($row) => (float) $row->overs > 0);
                $extraRuns = $extras->get($inningsNumber);
                $totalExtras = $extraRuns
                    ? $extraRuns->byes + $extraRuns->leg_byes + $extraRuns->wides + $extraRuns->no_balls
                    : 0;
                $bowledBalls = $bowlers->sum(fn ($row) => (int) floor((float) $row->overs) * 6 + (int) round(((float) $row->overs - floor((float) $row->overs)) * 10));
                $isTeamA = ($inningsNumber === 1) === $battingFirstIsTeamA;

                $didNotBat = fn ($row) => (int) $row->balls === 0 && (int) $row->runs === 0 && in_array($row->dismissal_mode, [null, '', 'did_not_bat'], true);

                return [
                    'scorecard' => [
                        'batting' => $batsmen
                            ->reject($didNotBat)
                            ->map(fn ($row) => [
                                'name' => $row->player?->name ?? 'Unknown',
                                'dismissal' => $this->describeDismissal($row, $playerNames),
                                'runs' => (int) $row->runs,
                                'balls' => (int) $row->balls,
                                'fours' => (int) $row->fours,
                                'sixes' => (int) $row->sixes,
                                'strike_rate' => $row->balls > 0 ? number_format($row->runs / $row->balls * 100, 2) : '0.00',
                            ])
                            ->values()
                            ->all(),
                        'did_not_bat' => $batsmen->filter($didNotBat)->map(fn ($row) => $row->player?->name ?? 'Unknown')->values()->all(),
                        'extras' => [
                            'total' => $totalExtras,
                            'detail' => $extraRuns
                                ? sprintf('b %d, lb %d, w %d, nb %d', $extraRuns->byes, $extraRuns->leg_byes, $extraRuns->wides, $extraRuns->no_balls)
                                : '',
                        ],
                        'bowling' => $bowlers
                            ->map(function ($row) {
                                $balls = (int) floor((float) $row->overs) * 6 + (int) round(((float) $row->overs - floor((float) $row->overs)) * 10);

                                return [
                                    'name' => $row->player?->name ?? 'Unknown',
                                    'overs' => rtrim(rtrim(number_format((float) $row->overs, 1), '0'), '.'),
                                    'maidens' => (int) $row->maidens,
                                    'runs' => (int) $row->runs,
                                    'wickets' => (int) $row->wickets,
                                    'economy' => number_format($row->runs / ($balls / 6), 2),
                                ];
                            })
                            ->values()
                            ->all(),
                        'fall_of_wickets' => ($wickets->get($inningsNumber) ?? collect())
                            ->map(fn ($row) => [
                                'name' => $row->name,
                                'score' => (int) $row->score_at_dismissal,
                                'overs' => rtrim(rtrim(number_format((float) $row->over_at_dismissal, 1), '0'), '.'),
                            ])
                            ->values()
                            ->all(),
                    ],
                    'batting_side' => $isTeamA ? $match->team_name : $match->opponent_name,
                    'runs' => $batsmen->sum('runs') + $totalExtras,
                    'wickets' => $batsmen->whereNotIn('dismissal_mode', [null, 'not_out', 'retired_hurt', 'did_not_bat'])->count(),
                    'overs' => intdiv($bowledBalls, 6).($bowledBalls % 6 ? '.'.($bowledBalls % 6) : ''),
                    'batsmen' => $batsmen
                        ->filter(fn ($row) => (int) $row->balls > 0)
                        ->sortByDesc(fn ($row) => (int) $row->runs)
                        ->take(4)
                        ->map(fn ($row) => [
                            'name' => $row->player?->name ?? 'Unknown',
                            'runs' => (int) $row->runs,
                            'balls' => (int) $row->balls,
                            'not_out' => in_array($row->dismissal_mode, ['not_out', 'retired_hurt'], true),
                        ])
                        ->values()
                        ->all(),
                    'bowlers' => $bowlers
                        ->sortBy([[fn ($row) => (int) $row->wickets, 'desc'], [fn ($row) => (int) $row->runs, 'asc']])
                        ->take(4)
                        ->map(fn ($row) => [
                            'name' => $row->player?->name ?? 'Unknown',
                            'wickets' => (int) $row->wickets,
                            'runs' => (int) $row->runs,
                            'overs' => rtrim(rtrim(number_format((float) $row->overs, 1), '0'), '.'),
                        ])
                        ->values()
                        ->all(),
                ];
            })
            ->values()
            ->all();
    }

    /**
     * @param  Collection<int, string>  $playerNames
     */
    private function describeDismissal(MatchSummaryBatsman $row, Collection $playerNames): string
    {
        $bowler = $playerNames->get($row->dismissal_by);
        $fielder = $playerNames->get($row->fielder_id);

        return match ($row->dismissal_mode) {
            'caught' => trim('c '.($fielder ?? '').' b '.($bowler ?? '')),
            'bowled' => 'b '.($bowler ?? ''),
            'stumped' => trim('st '.($fielder ?? '').' b '.($bowler ?? '')),
            'run_out' => 'run out'.($fielder ? ' ('.$fielder.')' : ''),
            'retired_hurt' => 'retired hurt',
            'not_out', null, '' => 'not out',
            default => str_replace('_', ' ', $row->dismissal_mode),
        };
    }
}
