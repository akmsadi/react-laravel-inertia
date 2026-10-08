<?php

use App\Models\Matches;
use App\Models\MatchSummaryBatsman;
use App\Models\MatchSummaryBowler;
use App\Models\Player;
use Inertia\Testing\AssertableInertia as Assert;

function makePlayer(string $status = 'approved'): Player
{
    return Player::create(['name' => 'Test Player', 'nickname' => 'Tester', 'phone' => '01700000000', 'address' => 'Dhaka', 'status' => $status]);
}

test('player profile shows batting and bowling statistics', function () {
    $player = makePlayer();
    $matchIds = [
        Matches::create(['opponent_name' => 'Rivals A'])->id,
        Matches::create(['opponent_name' => 'Rivals B'])->id,
    ];

    foreach ([[$matchIds[0], 60, 40, 'bowled'], [$matchIds[1], 20, 10, 'not_out']] as [$matchId, $runs, $balls, $mode]) {
        $row = new MatchSummaryBatsman;
        $row->forceFill([
            'match_id' => $matchId, 'innings_number' => 1, 'player_id' => $player->id,
            'runs' => $runs, 'balls' => $balls, 'fours' => 2, 'sixes' => 1, 'dismissal_mode' => $mode,
        ])->save();
    }

    $bowl = new MatchSummaryBowler;
    $bowl->forceFill([
        'match_id' => $matchIds[0], 'innings_number' => 1, 'player_id' => $player->id,
        'overs' => 4.2, 'maidens' => 0, 'runs' => 26, 'wickets' => 3,
    ])->save();

    $this->get(route('players.show', $player))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('players/show')
            ->where('batting.runs', 80)
            ->where('batting.highest_score', 60)
            ->where('batting.average', 80)
            ->where('batting.fifties', 1)
            ->where('bowling.overs', '4.2')
            ->where('bowling.wickets', 3)
            ->where('bowling.best', '3/26'));
});

test('pending players have no public profile', function () {
    $this->get(route('players.show', makePlayer('pending')))->assertNotFound();
});
