<?php

namespace App\Http\Controllers;

use App\Http\Requests\MatchPlayersRequest;
use App\Models\Matches;
use App\Models\Player;
use Illuminate\Http\RedirectResponse;

class MatchPlayerController extends Controller
{
    public function update(MatchPlayersRequest $request, Matches $match): RedirectResponse
    {
        $submitted = collect($request->validated('players'))->keyBy('player_id');

        $eligibleIds = Player::query()
            ->whereIn('id', $submitted->keys())
            ->where(fn ($query) => $query
                ->whereIn('status', ['approved', 'guest'])
                ->orWhereIn('id', $match->players()->select('players.id')))
            ->pluck('id');

        $captainSides = [];

        $squad = $eligibleIds->mapWithKeys(function (int $playerId) use ($submitted, &$captainSides): array {
            $entry = $submitted[$playerId];
            $isCaptain = $entry['is_captain'] && ! isset($captainSides[$entry['side']]);

            if ($isCaptain) {
                $captainSides[$entry['side']] = true;
            }

            return [$playerId => ['side' => $entry['side'], 'is_captain' => $isCaptain]];
        });

        $match->players()->sync($squad);

        return back();
    }
}
