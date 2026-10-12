<?php

namespace App\Http\Controllers;

use App\Http\Requests\SyncPlayersRequest;
use App\Models\Matches;
use App\Models\Player;
use Illuminate\Http\RedirectResponse;

class MatchPlayerController extends Controller
{
    public function update(SyncPlayersRequest $request, Matches $match): RedirectResponse
    {
        $playerIds = Player::query()
            ->where('status', 'approved')
            ->whereIn('id', $request->validated('player_ids'))
            ->pluck('id');

        $match->players()->sync($playerIds);

        return back();
    }
}
