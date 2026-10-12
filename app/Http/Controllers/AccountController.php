<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * Each contributor owes an equal share of every expense they are attached to.
     */
    private const OWED_SQL = '(select coalesce(sum(e.amount * 1.0 / (select count(*) from expense_contributors c2 where c2.expense_id = e.id)), 0)
        from expense_contributors ec
        join expenses e on e.id = ec.expense_id
        where ec.player_id = players.id) as owed';

    public function index(): Response
    {
        $accounts = Player::query()
            ->with('guestOf:id,name')
            ->withCount('matches')
            ->withSum('deposits as deposited', 'amount')
            ->addSelect('players.*')
            ->selectRaw(self::OWED_SQL)
            ->orderBy('name')
            ->get()
            ->map(function (Player $player): array {
                $deposited = round((float) $player->deposited, 2);
                $owed = round((float) $player->owed, 2);

                return [
                    'id' => $player->id,
                    'name' => $player->guestOf
                        ? "{$player->name} (Guest {$player->guestOf->name})"
                        : $player->name,
                    'phone' => $player->phone,
                    'status' => $player->status,
                    'matches' => $player->matches_count,
                    'deposited' => $deposited,
                    'owed' => $owed,
                    'balance' => round($deposited - $owed, 2),
                ];
            });

        return Inertia::render('admin/accounts/index', [
            'accounts' => $accounts,
            'totals' => [
                'deposited' => round($accounts->sum('deposited'), 2),
                'owed' => round($accounts->sum('owed'), 2),
                'balance' => round($accounts->sum('balance'), 2),
            ],
        ]);
    }
}
