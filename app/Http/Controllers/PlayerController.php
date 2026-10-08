<?php

namespace App\Http\Controllers;

use App\Models\MatchSummaryBatsman;
use App\Models\MatchSummaryBowler;
use App\Models\Player;
use App\Models\Players;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PlayerController extends Controller
{
    public function show(Player $player): Response
    {
        abort_unless($player->status === 'approved', 404);

        $didNotBat = ['did_not_bat'];
        $innings = MatchSummaryBatsman::where('player_id', $player->id)
            ->where(fn ($query) => $query->whereNull('dismissal_mode')->orWhereNotIn('dismissal_mode', $didNotBat))
            ->get();

        $runs = (int) $innings->sum('runs');
        $balls = (int) $innings->sum('balls');
        $outs = $innings->filter(fn ($row) => ! in_array($row->dismissal_mode, [null, '', 'not_out', 'retired_hurt'], true))->count();

        $bowling = MatchSummaryBowler::where('player_id', $player->id)->get();
        $bowlingBalls = $bowling->sum(fn ($row) => (int) floor((float) $row->overs) * 6 + (int) round(((float) $row->overs - floor((float) $row->overs)) * 10));
        $runsConceded = (int) $bowling->sum('runs');
        $best = $bowling->sortBy([['wickets', 'desc'], ['runs', 'asc']])->first();

        return Inertia::render('players/show', [
            'player' => $player->only(['id', 'name', 'nickname', 'organization']),
            'batting' => [
                'matches' => $innings->pluck('match_id')->unique()->count(),
                'innings' => $innings->count(),
                'runs' => $runs,
                'highest_score' => (int) $innings->max('runs'),
                'average' => $outs > 0 ? round($runs / $outs, 2) : null,
                'strike_rate' => $balls > 0 ? round($runs / $balls * 100, 2) : null,
                'fifties' => $innings->filter(fn ($row) => $row->runs >= 50 && $row->runs < 100)->count(),
                'hundreds' => $innings->filter(fn ($row) => $row->runs >= 100)->count(),
                'fours' => (int) $innings->sum('fours'),
                'sixes' => (int) $innings->sum('sixes'),
            ],
            'bowling' => [
                'innings' => $bowling->count(),
                'overs' => intdiv($bowlingBalls, 6).'.'.($bowlingBalls % 6),
                'maidens' => (int) $bowling->sum('maidens'),
                'runs' => $runsConceded,
                'wickets' => (int) $bowling->sum('wickets'),
                'economy' => $bowlingBalls > 0 ? round($runsConceded / ($bowlingBalls / 6), 2) : null,
                'best' => $best ? $best->wickets.'/'.$best->runs : null,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'organization' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255', 'unique:players,email'],
            'phone' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
        ]);

        Players::create([
            ...$validated,
            'nickname' => $validated['name'],
            'status' => 'pending',
        ]);

        return back()->with('status', 'Your player registration has been submitted.');
    }
}
