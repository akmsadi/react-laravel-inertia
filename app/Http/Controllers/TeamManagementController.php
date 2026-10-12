<?php

namespace App\Http\Controllers;

use App\Http\Requests\TeamManagementRequest;
use App\Models\Player;
use App\Models\Team;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class TeamManagementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/teams/index', [
            'teams' => Team::query()
                ->with(['captain:id,name', 'viceCaptain:id,name'])
                ->latest('id')
                ->paginate(15),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/teams/create', [
            'players' => $this->playerOptions(),
        ]);
    }

    public function store(TeamManagementRequest $request): RedirectResponse
    {
        $attributes = $request->validated();
        $playerIds = $attributes['players'] ?? [];
        unset($attributes['players']);

        DB::transaction(function () use ($attributes, $playerIds): void {
            $team = Team::create($attributes);
            $this->syncPlayers($team, $playerIds);
        });

        return to_route('admin.teams.index');
    }

    public function show(Team $team): RedirectResponse
    {
        return to_route('admin.teams.edit', $team);
    }

    public function edit(Team $team): Response
    {
        return Inertia::render('admin/teams/edit', [
            'team' => $team,
            'players' => $this->playerOptions(),
            'selectedPlayers' => $team->players()
                ->whereNotNull('player_id')
                ->pluck('player_id')
                ->map(fn ($playerId): int => (int) $playerId)
                ->all(),
        ]);
    }

    public function update(TeamManagementRequest $request, Team $team): RedirectResponse
    {
        $attributes = $request->validated();
        $playerIds = $attributes['players'] ?? [];
        unset($attributes['players']);

        DB::transaction(function () use ($team, $attributes, $playerIds): void {
            $team->update($attributes);
            $this->syncPlayers($team, $playerIds);
        });

        return to_route('admin.teams.index');
    }

    public function destroy(Team $team): RedirectResponse
    {
        DB::transaction(function () use ($team): void {
            $team->players()->delete();
            $team->achievements()->delete();
            $team->delete();
        });

        return to_route('admin.teams.index');
    }

    /**
     * @return Collection<int, Player>
     */
    private function playerOptions(): Collection
    {
        return Player::query()->orderBy('name')->get(['id', 'name']);
    }

    /**
     * @param  array<int, int|string>  $playerIds
     */
    private function syncPlayers(Team $team, array $playerIds): void
    {
        $team->players()->whereNotNull('player_id')->delete();
        $team->players()->createMany(
            array_map(fn ($playerId): array => ['player_id' => $playerId], $playerIds),
        );
    }
}
