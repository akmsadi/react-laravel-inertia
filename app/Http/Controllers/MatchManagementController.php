<?php

namespace App\Http\Controllers;

use App\Http\Requests\MatchRequest;
use App\Models\Matches;
use App\Models\Venue;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MatchManagementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/matches/index', [
            'matches' => Matches::query()
                ->with('venue:id,name')
                ->orderByDesc('scheduled_at')
                ->orderByDesc('id')
                ->paginate(50),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/matches/create', [
            'venues' => $this->venueOptions(),
        ]);
    }

    public function store(MatchRequest $request): RedirectResponse
    {
        Matches::create($request->validated());

        return to_route('admin.matches.index');
    }

    public function show(Matches $match): RedirectResponse
    {
        return to_route('admin.matches.edit', $match);
    }

    public function edit(Matches $match): Response
    {
        return Inertia::render('admin/matches/edit', [
            'match' => $match,
            'venues' => $this->venueOptions(),
        ]);
    }

    public function update(MatchRequest $request, Matches $match): RedirectResponse
    {
        $match->update($request->validated());

        return to_route('admin.matches.index');
    }

    public function destroy(Matches $match): RedirectResponse
    {
        $match->delete();

        return to_route('admin.matches.index');
    }

    private function venueOptions()
    {
        return Venue::query()->orderBy('name')->get(['id', 'name']);
    }
}
