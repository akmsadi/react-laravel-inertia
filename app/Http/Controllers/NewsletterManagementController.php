<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewsletterRequest;
use App\Models\Newsletter;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class NewsletterManagementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/newsletters/index', [
            'newsletters' => Newsletter::query()->latest('id')->paginate(50),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/newsletters/create');
    }

    public function store(NewsletterRequest $request): RedirectResponse
    {
        Newsletter::create($request->validated());

        return to_route('admin.newsletters.index');
    }

    public function show(Newsletter $newsletter): RedirectResponse
    {
        return to_route('admin.newsletters.edit', $newsletter);
    }

    public function edit(Newsletter $newsletter): Response
    {
        return Inertia::render('admin/newsletters/edit', [
            'newsletter' => $newsletter,
        ]);
    }

    public function update(NewsletterRequest $request, Newsletter $newsletter): RedirectResponse
    {
        $newsletter->update($request->validated());

        return to_route('admin.newsletters.index');
    }

    public function destroy(Newsletter $newsletter): RedirectResponse
    {
        $newsletter->delete();

        return to_route('admin.newsletters.index');
    }
}
