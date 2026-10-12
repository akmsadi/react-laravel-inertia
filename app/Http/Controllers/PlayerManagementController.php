<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlayerManagementRequest;
use App\Models\Player;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PlayerManagementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/players/index', [
            'players' => Player::query()
                ->with('guestOf:id,name')
                ->latest('id')
                ->paginate(15),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/players/create', [
            'players' => $this->playerOptions(),
        ]);
    }

    public function store(PlayerManagementRequest $request): RedirectResponse
    {
        Player::create($request->validated());

        return to_route('admin.players.index');
    }

    public function show(Player $player): RedirectResponse
    {
        return to_route('admin.players.edit', $player);
    }

    public function edit(Player $player): Response
    {
        return Inertia::render('admin/players/edit', [
            'player' => $player,
            'players' => $this->playerOptions($player),
        ]);
    }

    public function update(PlayerManagementRequest $request, Player $player): RedirectResponse
    {
        $player->update($request->validated());

        return to_route('admin.players.index');
    }

    public function destroy(Player $player): RedirectResponse
    {
        $player->delete();

        return to_route('admin.players.index');
    }

    /**
     * @return Collection<int, Player>
     */
    private function playerOptions(?Player $except = null): Collection
    {
        return Player::query()
            ->when($except, fn ($query) => $query->whereKeyNot($except->getKey()))
            ->orderBy('name')
            ->get(['id', 'name']);
    }
}
