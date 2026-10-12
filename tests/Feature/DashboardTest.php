<?php

use App\Models\Matches;
use App\Models\Player;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated users can visit the dashboard', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
});

test('dashboard ranks top batsmen and bowlers from match summaries', function () {
    $this->actingAs(User::factory()->create());

    $makePlayer = fn (string $name) => Player::create(['name' => $name, 'nickname' => $name, 'phone' => '1', 'address' => 'x', 'status' => 'approved']);
    $ann = $makePlayer('Ann');
    $bob = $makePlayer('Bob');
    $matchOne = Matches::create(['opponent_name' => 'Visitors']);
    $matchTwo = Matches::create(['opponent_name' => 'Hosts']);

    $bat = fn (Matches $match, Player $player, array $attributes) => DB::table('match_summary_batsmen')->insert([
        'match_id' => $match->id, 'innings_number' => 1, 'player_id' => $player->id, 'fours' => 0, 'sixes' => 0, ...$attributes,
    ]);
    $bat($matchOne, $ann, ['runs' => 100, 'balls' => 50, 'dismissal_mode' => 'bowled']);
    $bat($matchTwo, $ann, ['runs' => 50, 'balls' => 50, 'dismissal_mode' => 'not_out']);
    $bat($matchOne, $bob, ['runs' => 120, 'balls' => 60, 'dismissal_mode' => 'not_out']);
    $bat($matchTwo, $bob, ['runs' => 0, 'balls' => 0, 'dismissal_mode' => 'did_not_bat']);

    $bowl = fn (Matches $match, Player $player, array $attributes) => DB::table('match_summary_bowlers')->insert([
        'match_id' => $match->id, 'innings_number' => 1, 'player_id' => $player->id, ...$attributes,
    ]);
    $bowl($matchOne, $ann, ['overs' => 4.0, 'runs' => 24, 'wickets' => 2]);
    $bowl($matchTwo, $ann, ['overs' => 2.3, 'runs' => 15, 'wickets' => 1]);
    $bowl($matchOne, $bob, ['overs' => 4.0, 'runs' => 20, 'wickets' => 3]);

    $this->get(route('dashboard'))->assertInertia(fn (Assert $page) => $page
        ->has('leaderboards.batsmen', 2)
        ->where('leaderboards.batsmen.0.name', 'Ann')
        ->where('leaderboards.batsmen.0.runs', 150)
        ->where('leaderboards.batsmen.0.innings', 2)
        ->where('leaderboards.batsmen.0.highest', '100 (50)')
        ->where('leaderboards.batsmen.0.strike_rate', '150.00')
        ->where('leaderboards.batsmen.0.average', '150.00')
        ->where('leaderboards.batsmen.1.name', 'Bob')
        ->where('leaderboards.batsmen.1.matches', 2)
        ->where('leaderboards.batsmen.1.innings', 1)
        ->where('leaderboards.batsmen.1.highest', '120* (60)')
        ->where('leaderboards.batsmen.1.average', '-')
        ->where('leaderboards.bowlers.0.name', 'Bob')
        ->where('leaderboards.bowlers.0.best', '3/20')
        ->where('leaderboards.bowlers.1.name', 'Ann')
        ->where('leaderboards.bowlers.1.wickets', 3)
        ->where('leaderboards.bowlers.1.overs', '6.3')
        ->where('leaderboards.bowlers.1.best', '2/24')
        ->where('leaderboards.bowlers.1.economy', '6.00'));
});
