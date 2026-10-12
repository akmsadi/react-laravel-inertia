<?php

use App\Models\Events;
use App\Models\Expense;
use App\Models\Matches;
use App\Models\Newsletter;
use App\Models\Player;
use App\Models\PlayerDeposit;
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

test('match can be created updated and deleted', function () {
    $venue = Venue::create(['name' => 'Central Ground']);

    $this->post(route('admin.matches.store'), [
        'match_type' => 't20',
        'format_overs' => 20,
        'venue_id' => $venue->id,
        'scheduled_at' => '2026-11-01 15:00:00',
        'team_name' => 'Evergreen Team',
        'opponent_name' => 'Visitors',
        'match_status' => 'scheduled',
    ])->assertRedirect(route('admin.matches.index'));

    $match = Matches::firstWhere('opponent_name', 'Visitors');
    expect($match->venue_id)->toBe($venue->id);

    $this->get(route('admin.matches.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/matches/index')
            ->where('matches.data.0.venue.name', 'Central Ground'));

    $this->put(route('admin.matches.update', $match), [
        'match_type' => 'odi',
        'format_overs' => 50,
        'venue_id' => null,
        'team_name' => 'Evergreen Team',
        'opponent_name' => 'Visitors',
        'match_status' => 'completed',
    ])->assertRedirect(route('admin.matches.index'));

    expect($match->refresh()->match_status)->toBe('completed')
        ->and($match->venue_id)->toBeNull();

    $this->delete(route('admin.matches.destroy', $match))
        ->assertRedirect(route('admin.matches.index'));

    expect(Matches::count())->toBe(0);
});

test('match validates required fields and references', function () {
    $this->post(route('admin.matches.store'), [
        'match_type' => 'bogus',
        'venue_id' => 999,
        'match_status' => 'nope',
    ])->assertSessionHasErrors([
        'match_type', 'format_overs', 'venue_id', 'team_name', 'opponent_name', 'match_status',
    ]);
});

test('newsletter subscriber can be created updated and deleted', function () {
    $this->post(route('admin.newsletters.store'), ['email' => 'fan@example.com'])
        ->assertRedirect(route('admin.newsletters.index'));

    $subscriber = Newsletter::firstWhere('email', 'fan@example.com');
    expect($subscriber)->not->toBeNull();

    $this->put(route('admin.newsletters.update', $subscriber), ['email' => 'fan@example.com'])
        ->assertRedirect(route('admin.newsletters.index'));

    $this->put(route('admin.newsletters.update', $subscriber), ['email' => 'new@example.com'])
        ->assertRedirect(route('admin.newsletters.index'));
    expect($subscriber->refresh()->email)->toBe('new@example.com');

    $this->delete(route('admin.newsletters.destroy', $subscriber))
        ->assertRedirect(route('admin.newsletters.index'));
    expect(Newsletter::count())->toBe(0);
});

test('newsletter rejects invalid and duplicate emails', function () {
    Newsletter::create(['email' => 'taken@example.com']);

    $this->post(route('admin.newsletters.store'), ['email' => 'nope'])->assertSessionHasErrors('email');
    $this->post(route('admin.newsletters.store'), ['email' => 'taken@example.com'])->assertSessionHasErrors('email');
});

test('player deposit can be created listed updated and deleted', function () {
    $player = Player::create([
        'name' => 'Depositor',
        'nickname' => 'Dep',
        'phone' => '555-0100',
        'address' => '1 Main Street',
        'status' => 'approved',
    ]);

    $this->post(route('admin.deposits.store'), [
        'player_id' => $player->id,
        'amount' => '150.50',
        'notes' => 'Season fee',
    ])->assertRedirect(route('admin.deposits.index'));

    $deposit = PlayerDeposit::firstWhere('player_id', $player->id);
    expect($deposit->amount)->toBe('150.50');

    $this->get(route('admin.deposits.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/deposits/index')
            ->has('deposits.data', 1)
            ->where('deposits.data.0.player.name', 'Depositor'));

    $this->put(route('admin.deposits.update', $deposit), [
        'player_id' => $player->id,
        'amount' => '200',
        'notes' => null,
    ])->assertRedirect(route('admin.deposits.index'));
    expect($deposit->fresh()->amount)->toBe('200.00');

    $this->delete(route('admin.deposits.destroy', $deposit))
        ->assertRedirect(route('admin.deposits.index'));
    expect(PlayerDeposit::find($deposit->id))->toBeNull();
});

test('player deposit requires a valid player and positive amount', function () {
    $this->post(route('admin.deposits.store'), ['player_id' => 999, 'amount' => '0'])
        ->assertSessionHasErrors(['player_id', 'amount']);
});

test('expense can be created with or without a match and managed', function () {
    $match = Matches::create(['opponent_name' => 'Visitors']);

    $this->post(route('admin.expenses.store'), [
        'match_id' => $match->id,
        'title' => 'Ground fee',
        'amount' => 500,
    ])->assertRedirect(route('admin.expenses.index'));

    $this->post(route('admin.expenses.store'), [
        'match_id' => '',
        'title' => 'Kit',
        'amount' => 200,
        'notes' => 'New balls',
    ])->assertRedirect(route('admin.expenses.index'));

    $matchExpense = Expense::firstWhere('title', 'Ground fee');
    $generalExpense = Expense::firstWhere('title', 'Kit');
    expect($matchExpense->match_id)->toBe($match->id)
        ->and($generalExpense->match_id)->toBeNull();

    $this->get(route('admin.expenses.index', ['match' => 'none']))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/expenses/index')
            ->has('expenses.data', 1)
            ->where('expenses.data.0.title', 'Kit')
            ->where('total', 200));

    $this->get(route('admin.expenses.index', ['match' => $match->id]))
        ->assertInertia(fn (Assert $page) => $page->has('expenses.data', 1)
            ->where('expenses.data.0.title', 'Ground fee'));

    $this->put(route('admin.expenses.update', $generalExpense), [
        'match_id' => $match->id,
        'title' => 'Kit bag',
        'amount' => 250,
    ])->assertRedirect(route('admin.expenses.index'));
    expect($generalExpense->fresh())->title->toBe('Kit bag')->match_id->toBe($match->id);

    $this->delete(route('admin.expenses.destroy', $generalExpense))
        ->assertRedirect(route('admin.expenses.index'));
    expect(Expense::find($generalExpense->id))->toBeNull();
});

test('expense validates title amount and match', function () {
    $this->post(route('admin.expenses.store'), ['match_id' => 999, 'amount' => -5])
        ->assertSessionHasErrors(['title', 'amount', 'match_id']);
});

test('match squad assigns approved and guest players to sides with one captain per side', function () {
    $match = Matches::create(['team_name' => 'Sultan', 'opponent_name' => 'Legend']);
    $ann = Player::create(['name' => 'Ann', 'nickname' => 'A', 'phone' => '1', 'address' => 'x', 'status' => 'approved']);
    $guest = Player::create(['name' => 'Tom', 'nickname' => 'T', 'phone' => '3', 'address' => 'z', 'status' => 'guest', 'guest_of_player_id' => $ann->id]);
    $pending = Player::create(['name' => 'Bob', 'nickname' => 'B', 'phone' => '2', 'address' => 'y', 'status' => 'pending']);

    $this->put(route('admin.matches.players.update', $match), ['players' => [
        ['player_id' => $ann->id, 'side' => 'team_a', 'is_captain' => true],
        ['player_id' => $guest->id, 'side' => 'team_a', 'is_captain' => true],
        ['player_id' => $pending->id, 'side' => 'team_b', 'is_captain' => false],
    ]])->assertRedirect();

    $squad = $match->players()->orderBy('players.id')->get();
    expect($squad->pluck('id')->all())->toBe([$ann->id, $guest->id])
        ->and($squad[0]->pivot->is_captain)->toBeTruthy()
        ->and($squad[1]->pivot->is_captain)->toBeFalsy()
        ->and($squad[1]->pivot->side)->toBe('team_a');

    $this->get(route('admin.matches.edit', $match))
        ->assertInertia(fn (Assert $page) => $page
            ->has('playerOptions', 2)
            ->has('squad', 2)
            ->where('playerOptions.1.guest_of_name', 'Ann'));

    $this->put(route('admin.matches.players.update', $match), ['players' => [
        ['player_id' => $ann->id, 'side' => 'bogus', 'is_captain' => false],
    ]])->assertSessionHasErrors('players.0.side');
});

test('existing match players with legacy sides and statuses are shown and kept', function () {
    $match = Matches::create(['team_name' => 'Sultan', 'opponent_name' => 'Legend']);
    $own = Player::create(['name' => 'Ann', 'nickname' => 'A', 'phone' => '1', 'address' => 'x', 'status' => 'approved']);
    $other = Player::create(['name' => 'Bob', 'nickname' => 'B', 'phone' => '2', 'address' => 'y', 'status' => 'rejected']);
    $match->players()->attach($own->id, ['side' => 'evergreen', 'is_captain' => true]);
    $match->players()->attach($other->id, ['side' => 'team_b']);
    $legacy = Player::create(['name' => 'Cy', 'nickname' => 'C', 'phone' => '3', 'address' => 'z', 'status' => 'approved']);
    $match->players()->attach($legacy->id, ['side' => 'Legend']);

    $this->get(route('admin.matches.edit', $match))
        ->assertInertia(fn (Assert $page) => $page
            ->has('playerOptions', 3)
            ->where('squad.2', ['player_id' => $legacy->id, 'side' => 'team_b', 'is_captain' => false])
            ->where('squad.0', ['player_id' => $own->id, 'side' => 'team_a', 'is_captain' => true])
            ->where('squad.1', ['player_id' => $other->id, 'side' => 'team_b', 'is_captain' => false]));

    $this->put(route('admin.matches.players.update', $match), ['players' => [
        ['player_id' => $own->id, 'side' => 'team_a', 'is_captain' => true],
        ['player_id' => $other->id, 'side' => 'team_b', 'is_captain' => false],
    ]]);
    expect($match->players()->count())->toBe(2);
});

test('expense contributors are limited to match players for match expenses', function () {
    $inMatch = Player::create(['name' => 'Ann', 'nickname' => 'A', 'phone' => '1', 'address' => 'x', 'status' => 'approved']);
    $outOfMatch = Player::create(['name' => 'Cat', 'nickname' => 'C', 'phone' => '3', 'address' => 'z', 'status' => 'approved']);
    $pending = Player::create(['name' => 'Bob', 'nickname' => 'B', 'phone' => '2', 'address' => 'y', 'status' => 'pending']);
    $match = Matches::create(['opponent_name' => 'Visitors']);
    $match->players()->attach($inMatch->id);

    $matchExpense = Expense::create(['match_id' => $match->id, 'title' => 'Ground', 'amount' => 100]);
    $generalExpense = Expense::create(['title' => 'Kit', 'amount' => 50]);

    $this->put(route('admin.expenses.contributors.update', $matchExpense), [
        'player_ids' => [$inMatch->id, $outOfMatch->id, $pending->id],
    ])->assertRedirect();
    expect($matchExpense->contributors()->pluck('players.id')->all())->toBe([$inMatch->id]);

    $this->put(route('admin.expenses.contributors.update', $generalExpense), [
        'player_ids' => [$inMatch->id, $outOfMatch->id, $pending->id],
    ])->assertRedirect();
    expect($generalExpense->contributors()->pluck('players.id')->sort()->values()->all())
        ->toBe([$inMatch->id, $outOfMatch->id]);

    $this->get(route('admin.expenses.edit', $matchExpense))
        ->assertInertia(fn (Assert $page) => $page->has('contributorOptions', 1)->where('contributorIds', [$inMatch->id]));

    $this->get(route('admin.expenses.edit', $generalExpense))
        ->assertInertia(fn (Assert $page) => $page->has('contributorOptions', 2));

    $this->put(route('admin.expenses.update', $generalExpense), [
        'match_id' => $match->id,
        'title' => 'Kit',
        'amount' => 50,
    ]);
    expect($generalExpense->contributors()->pluck('players.id')->all())->toBe([$inMatch->id]);
});

test('accounts show deposited owed and balance per player', function () {
    $ann = Player::create(['name' => 'Ann', 'nickname' => 'A', 'phone' => '1', 'address' => 'x', 'status' => 'approved']);
    $bob = Player::create(['name' => 'Bob', 'nickname' => 'B', 'phone' => '2', 'address' => 'y', 'status' => 'approved']);
    $guest = Player::create(['name' => 'Tom', 'nickname' => 'T', 'phone' => '3', 'address' => 'z', 'status' => 'guest', 'guest_of_player_id' => $ann->id]);
    $match = Matches::create(['opponent_name' => 'Visitors']);
    $match->players()->attach([$ann->id, $bob->id]);

    PlayerDeposit::create(['player_id' => $ann->id, 'amount' => 300]);
    PlayerDeposit::create(['player_id' => $ann->id, 'amount' => 200.5]);

    $shared = Expense::create(['title' => 'Ground', 'amount' => 101, 'match_id' => $match->id]);
    $shared->contributors()->attach([$ann->id, $bob->id]);
    $solo = Expense::create(['title' => 'Kit', 'amount' => 50]);
    $solo->contributors()->attach($ann->id);

    $this->get(route('admin.accounts.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/accounts/index')
            ->has('accounts', 3)
            ->where('accounts.0.name', 'Ann')
            ->where('accounts.0.matches', 1)
            ->where('accounts.0.deposited', 500.5)
            ->where('accounts.0.owed', 100.5)
            ->where('accounts.0.balance', 400)
            ->where('accounts.1.owed', 50.5)
            ->where('accounts.1.balance', -50.5)
            ->where('accounts.2.name', 'Tom (Guest Ann)')
            ->where('totals.deposited', 500.5)
            ->where('totals.owed', 151));
});
