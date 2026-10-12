<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Models\Events;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EventManagementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/events/index', [
            'events' => Events::query()->latest('id')->paginate(50),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/events/create');
    }

    public function store(EventRequest $request): RedirectResponse
    {
        Events::create($request->validated());

        return to_route('admin.events.index');
    }

    public function show(Events $event): RedirectResponse
    {
        return to_route('admin.events.edit', $event);
    }

    public function edit(Events $event): Response
    {
        return Inertia::render('admin/events/edit', [
            'event' => $event,
        ]);
    }

    public function update(EventRequest $request, Events $event): RedirectResponse
    {
        $event->update($request->validated());

        return to_route('admin.events.index');
    }

    public function destroy(Events $event): RedirectResponse
    {
        $event->images()->delete();
        $event->delete();

        return to_route('admin.events.index');
    }
}
