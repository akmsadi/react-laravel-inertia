<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExpenseRequest;
use App\Models\Expense;
use App\Models\Matches;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseManagementController extends Controller
{
    public function index(Request $request): Response
    {
        $filter = $request->query('match');
        $filter = $filter === 'none' || ctype_digit((string) $filter) ? (string) $filter : null;

        $applyFilter = fn ($query) => $query->when($filter, fn ($query) => $filter === 'none'
            ? $query->whereNull('match_id')
            : $query->where('match_id', (int) $filter));

        return Inertia::render('admin/expenses/index', [
            'expenses' => $applyFilter(Expense::query())
                ->with('match:id,team_name,opponent_name,scheduled_at')
                ->latest()
                ->latest('id')
                ->paginate(50)
                ->withQueryString(),
            'total' => $applyFilter(Expense::query())->sum('amount'),
            'matches' => $this->matchOptions(),
            'match' => $filter,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/expenses/create', [
            'matches' => $this->matchOptions(),
        ]);
    }

    public function store(ExpenseRequest $request): RedirectResponse
    {
        Expense::create($request->validated());

        return to_route('admin.expenses.index');
    }

    public function show(Expense $expense): RedirectResponse
    {
        return to_route('admin.expenses.edit', $expense);
    }

    public function edit(Expense $expense): Response
    {
        return Inertia::render('admin/expenses/edit', [
            'expense' => $expense,
            'matches' => $this->matchOptions(),
            'contributorOptions' => $expense->eligibleContributors()->get(['id', 'name']),
            'contributorIds' => $expense->contributors()->pluck('players.id'),
        ]);
    }

    public function update(ExpenseRequest $request, Expense $expense): RedirectResponse
    {
        $expense->update($request->validated());

        $expense->contributors()->sync(
            $expense->eligibleContributors()
                ->whereIn('id', $expense->contributors()->pluck('players.id'))
                ->pluck('id'),
        );

        return to_route('admin.expenses.index');
    }

    public function destroy(Expense $expense): RedirectResponse
    {
        $expense->delete();

        return to_route('admin.expenses.index');
    }

    /**
     * @return Collection<int, Matches>
     */
    private function matchOptions(): Collection
    {
        return Matches::query()
            ->orderByDesc('scheduled_at')
            ->get(['id', 'team_name', 'opponent_name', 'scheduled_at']);
    }
}
