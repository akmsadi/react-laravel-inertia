<?php

namespace App\Http\Controllers;

use App\Models\Players;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'organization' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255', 'unique:players,email'],
            'phone' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
        ]);

        Players::create([
            ...$validated,
            'nickname' => $validated['name'],
            'status' => 'pending',
        ]);

        return back()->with('status', 'Your player registration has been submitted.');
    }
}
