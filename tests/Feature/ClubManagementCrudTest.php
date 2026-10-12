<?php

use App\Models\Events;
use App\Models\Matches;
use App\Models\Player;
use App\Models\Team;
use App\Models\User;
use App\Models\Venue;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

test('guests cannot access club management', function () {
    auth()->logout();

    $this->get(route('admin.venues.index'))->assertRedirect(route('login'));
    $this->get(route('admin.players.index'))->assertRedirect(route('login'));
    $this->get(route('admin.events.index'))->assertRedirect(route('login'));
    $this->get(route('admin.teams.index'))->assertRedirect(route('login'));
});

test('venue can be created updated and deleted', function () {
    $this->get(route('admin.venues.create'))
        ->assertInertia(fn (Assert $page) => $page->component('admin/venues/create'));

    $this->post(route('admin.venues.store'), ['name' => 'Central Ground'])
        ->assertRedirect(route('admin.venues.index'));

    $venue = Venue::firstWhere('name', 'Central Ground');
    expect($venue)->not->toBeNull();

    Matches::create(['opponent_name' => 'Visitors', 'venue_id' => $venue->id]);

    $this->get(route('admin.venues.edit', $venue))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/venues/edit')
            ->where('venue.name', 'Central Ground'));

    $this->put(route('admin.venues.update', $venue), ['name' => 'Riverside Ground'])
        ->assertRedirect(route('admin.venues.index'));
    expect($venue->fresh()->name)->toBe('Riverside Ground');

    $this->delete(route('admin.venues.destroy', $venue))
        ->assertRedirect(route('admin.venues.index'));
    expect(Venue::find($venue->id))->toBeNull();
    $this->assertDatabaseHas('matches', ['venue_id' => null, 'opponent_name' => 'Visitors']);
});

test('event can be created updated and deleted', function () {
    $this->get(route('admin.events.create'))
        ->assertInertia(fn (Assert $page) => $page->component('admin/events/create'));

    $this->post(route('admin.events.store'), [
        'title' => 'Summer Cup',
        'description' => 'Annual club tournament.',
    ])->assertRedirect(route('admin.events.index'));

    $event = Events::firstWhere('title', 'Summer Cup');
    expect($event)->not->toBeNull();

    $this->get(route('admin.events.edit', $event))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/events/edit')
            ->where('event.title', 'Summer Cup'));

    $this->put(route('admin.events.update', $event), [
        'title' => 'Autumn Cup',
        'description' => null,
    ])->assertRedirect(route('admin.events.index'));
    expect($event->fresh())->title->toBe('Autumn Cup')->description->toBeNull();

    $this->delete(route('admin.events.destroy', $event))
        ->assertRedirect(route('admin.events.index'));
    expect(Events::find($event->id))->toBeNull();
});

test('player can be created updated and deleted', function () {
    $guestOf = Player::create([
        'name' => 'Club Member',
        'nickname' => 'Member',
        'phone' => '01700000000',
        'address' => 'Dhaka',
        'status' => 'approved',
    ]);

    $this->get(route('admin.players.create'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/players/create')
            ->has('players', 1));

    $this->post(route('admin.players.store'), [
        'name' => 'Guest Player',
        'nickname' => 'Guest',
        'organization' => 'Local Club',
        'email' => 'guest@example.com',
        'phone' => '01700000001',
        'address' => 'Chattogram',
        'status' => 'pending',
        'guest_of_player_id' => $guestOf->id,
    ])->assertRedirect(route('admin.players.index'));

    $player = Player::firstWhere('email', 'guest@example.com');
    expect($player)->not->toBeNull()->guest_of_player_id->toBe($guestOf->id);

    $this->get(route('admin.players.edit', $player))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/players/edit')
            ->where('player.id', $player->id));

    $this->put(route('admin.players.update', $player), [
        'name' => 'Updated Player',
        'nickname' => 'Updated',
        'organization' => null,
        'email' => 'guest@example.com',
        'phone' => '01700000002',
        'address' => 'Sylhet',
        'status' => 'approved',
        'guest_of_player_id' => null,
    ])->assertRedirect(route('admin.players.index'));
    expect($player->fresh())->name->toBe('Updated Player')->status->toBe('approved');

    $this->delete(route('admin.players.destroy', $player))
        ->assertRedirect(route('admin.players.index'));
    expect(Player::find($player->id))->toBeNull();
});

test('player cannot be set as their own guest parent', function () {
    $player = Player::create([
        'name' => 'Existing Player',
        'nickname' => 'Existing',
        'phone' => '01700000000',
        'address' => 'Dhaka',
        'status' => 'approved',
    ]);

    $this->put(route('admin.players.update', $player), [
        'name' => $player->name,
        'nickname' => $player->nickname,
        'phone' => $player->phone,
        'address' => $player->address,
        'status' => $player->status,
        'guest_of_player_id' => $player->id,
    ])->assertSessionHasErrors('guest_of_player_id');

    expect($player->fresh()->guest_of_player_id)->toBeNull();
});

test('team can be created updated and deleted with its roster', function () {
    $captain = Player::create([
        'name' => 'Captain',
        'nickname' => 'Captain',
        'phone' => '01700000000',
        'address' => 'Dhaka',
        'status' => 'approved',
    ]);
    $rosterPlayer = Player::create([
        'name' => 'Roster Player',
        'nickname' => 'Roster',
        'phone' => '01700000001',
        'address' => 'Dhaka',
        'status' => 'approved',
    ]);

    $attributes = [
        'name' => 'Green Team',
        'slug' => 'green-team',
        'slogan' => 'Play together',
        'about' => 'A community cricket team.',
        'logo' => '',
        'banner' => '/images/green-team.jpg',
        'established' => 2010,
        'matches' => 10,
        'wins' => 7,
        'titles' => 2,
        'captain_id' => $captain->id,
        'vice_captain_id' => '',
        'is_external' => '0',
        'players' => [(string) $rosterPlayer->id],
    ];

    $this->get(route('admin.teams.create'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/teams/create')
            ->has('players', 2));

    $this->post(route('admin.teams.store'), $attributes)
        ->assertRedirect(route('admin.teams.index'));

    $team = Team::firstWhere('slug', 'green-team');
    expect($team)->not->toBeNull()->is_external->toBeFalse();
    $this->assertDatabaseHas('team_players', [
        'team_id' => $team->id,
        'player_id' => $rosterPlayer->id,
    ]);

    $this->get(route('admin.teams.edit', $team))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/teams/edit')
            ->where('team.id', $team->id)
            ->where('selectedPlayers.0', $rosterPlayer->id));

    $this->put(route('admin.teams.update', $team), [
        ...$attributes,
        'name' => 'Green Team United',
        'matches' => 12,
        'wins' => 9,
        'players' => [(string) $captain->id],
    ])->assertRedirect(route('admin.teams.index'));
    expect($team->fresh())->name->toBe('Green Team United')->wins->toBe(9);
    $this->assertDatabaseHas('team_players', [
        'team_id' => $team->id,
        'player_id' => $captain->id,
    ]);
    $this->assertDatabaseMissing('team_players', [
        'team_id' => $team->id,
        'player_id' => $rosterPlayer->id,
    ]);

    $team->achievements()->create(['title' => 'League Winner', 'description' => 'Won the league.']);

    $this->delete(route('admin.teams.destroy', $team))
        ->assertRedirect(route('admin.teams.index'));
    expect(Team::find($team->id))->toBeNull();
    $this->assertDatabaseMissing('team_players', ['team_id' => $team->id]);
    $this->assertDatabaseMissing('team_achievements', ['team_id' => $team->id]);
});

test('team form rejects wins greater than matches', function () {
    $this->post(route('admin.teams.store'), [
        'name' => 'Invalid Team',
        'slug' => 'invalid-team',
        'slogan' => 'Try hard',
        'about' => 'Team with invalid record.',
        'banner' => '/images/banner.jpg',
        'established' => 2020,
        'matches' => 2,
        'wins' => 3,
        'titles' => 0,
        'is_external' => '0',
    ])->assertSessionHasErrors('wins');

    expect(Team::where('slug', 'invalid-team')->exists())->toBeFalse();
});
