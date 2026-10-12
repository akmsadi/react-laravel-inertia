<?php

namespace App\Http\Controllers;

use App\Http\Requests\PlayerDepositRequest;
use App\Models\Player;
use App\Models\PlayerDeposit;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DepositManagementController extends Controller
{
    public function index(Request $request): Response
    {
        $playerId = $request->integer('player_id') ?: null;

        return Inertia::render('admin/deposits/index', [
            'deposits' => PlayerDeposit::query()
                ->with('player:id,name')
                ->when($playerId, fn ($query) => $query->where('player_id', $playerId))
                ->latest()
                ->latest('id')
                ->paginate(50)
                ->withQueryString(),
            'total' => PlayerDeposit::query()
                ->when($playerId, fn ($query) => $query->where('player_id', $playerId))
                ->sum('amount'),
            'players' => $this->playerOptions(),
            'playerId' => $playerId,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/deposits/create', [
            'players' => $this->playerOptions(),
        ]);
    }

    public function store(PlayerDepositRequest $request): RedirectResponse
    {
        PlayerDeposit::create($request->validated());

        return to_route('admin.deposits.index');
    }

    public function show(PlayerDeposit $deposit): RedirectResponse
    {
        return to_route('admin.deposits.edit', $deposit);
    }

    public function edit(PlayerDeposit $deposit): Response
    {
        return Inertia::render('admin/deposits/edit', [
            'deposit' => $deposit,
            'players' => $this->playerOptions(),
        ]);
    }

    public function update(PlayerDepositRequest $request, PlayerDeposit $deposit): RedirectResponse
    {
        $deposit->update($request->validated());

        return to_route('admin.deposits.index');
    }

    public function destroy(PlayerDeposit $deposit): RedirectResponse
    {
        $deposit->delete();

        return to_route('admin.deposits.index');
    }

    /**
     * @return Collection<int, Player>
     */
    private function playerOptions(): Collection
    {
        return Player::query()->orderBy('name')->get(['id', 'name']);
    }
}
