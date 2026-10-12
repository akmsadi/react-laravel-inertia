<?php

namespace App\Http\Controllers;

use App\Http\Requests\VenueRequest;
use App\Models\Matches;
use App\Models\Venue;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class VenueManagementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/venues/index', [
            'venues' => Venue::query()->latest('id')->paginate(15),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/venues/create');
    }

    public function store(VenueRequest $request): RedirectResponse
    {
        Venue::create($request->validated());

        return to_route('admin.venues.index');
    }

    public function show(Venue $venue): RedirectResponse
    {
        return to_route('admin.venues.edit', $venue);
    }

    public function edit(Venue $venue): Response
    {
        return Inertia::render('admin/venues/edit', [
            'venue' => $venue,
        ]);
    }

    public function update(VenueRequest $request, Venue $venue): RedirectResponse
    {
        $venue->update($request->validated());

        return to_route('admin.venues.index');
    }

    public function destroy(Venue $venue): RedirectResponse
    {
        Matches::query()->where('venue_id', $venue->id)->update(['venue_id' => null]);
        $venue->delete();

        return to_route('admin.venues.index');
    }
}
