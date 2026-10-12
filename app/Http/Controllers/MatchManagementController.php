<?php

namespace App\Http\Controllers;

use App\Http\Requests\MatchRequest;
use App\Models\Matches;
use App\Models\Player;
use App\Models\Venue;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MatchManagementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/matches/index', [
            'matches' => Matches::query()
                ->with('venue:id,name')
                ->orderByDesc('scheduled_at')
                ->orderByDesc('id')
                ->paginate(50),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/matches/create', [
            'venues' => $this->venueOptions(),
        ]);
    }

    public function store(MatchRequest $request): RedirectResponse
    {
        Matches::create($request->validated());

        return to_route('admin.matches.index');
    }

    public function show(Matches $match): RedirectResponse
    {
        return to_route('admin.matches.edit', $match);
    }

    public function edit(Matches $match): Response
    {
        return Inertia::render('admin/matches/edit', [
            'match' => $match,
            'venues' => $this->venueOptions(),
            'playerOptions' => Player::query()
                ->with('guestOf:id,name')
                ->where(fn ($query) => $query
                    ->whereIn('status', ['approved', 'guest'])
                    ->orWhereIn('id', $match->players()->select('players.id')))
                ->orderBy('name')
                ->get()
                ->map(fn (Player $player): array => [
                    'id' => $player->id,
                    'name' => $player->name,
                    'guest_of_name' => $player->guestOf?->name,
                ]),
            'squad' => $match->players()->get()->map(fn (Player $player): array => [
                'player_id' => $player->id,
                'side' => $this->squadSide($match, $player->pivot->side),
                'is_captain' => (bool) $player->pivot->is_captain,
            ]),
        ]);
    }

    public function update(MatchRequest $request, Matches $match): RedirectResponse
    {
        $match->update($request->validated());

        return to_route('admin.matches.index');
    }

    public function destroy(Matches $match): RedirectResponse
    {
        $match->delete();

        return to_route('admin.matches.index');
    }

    private function venueOptions()
    {
        return Venue::query()->orderBy('name')->get(['id', 'name']);
    }

    /**
     * Rows store "team_a" or "team_b"; unrecognised legacy labels fall back to the first team unless they name the opponent.
     */
    private function squadSide(Matches $match, ?string $side): string
    {
        $opponentLabels = array_filter(['team_b', 'opponent', strtolower((string) $match->opponent_name)]);

        return in_array(strtolower((string) $side), $opponentLabels, true) ? 'team_b' : 'team_a';
    }
}
