<?php

namespace App\Http\Controllers;

use App\Http\Requests\SyncPlayersRequest;
use App\Models\Expense;
use Illuminate\Http\RedirectResponse;

class ExpenseContributorController extends Controller
{
    public function update(SyncPlayersRequest $request, Expense $expense): RedirectResponse
    {
        $contributorIds = $expense->eligibleContributors()
            ->whereIn('id', $request->validated('player_ids'))
            ->pluck('id');

        $expense->contributors()->sync($contributorIds);

        return back();
    }
}
