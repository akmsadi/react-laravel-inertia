<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\Matches;
use App\Models\Player;
use App\Models\Product;
use App\Models\Team;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $lastMatch = Matches::orderBy('scheduled_at', 'desc')->with('venue')->limit(1)->first();
        $nextMatch = Matches::where('scheduled_at', '>', date('Y-m-d H:i:s'))->where('match_status', '!=', 'archived')->orderBy('scheduled_at', 'asc')->with('venue')->limit(1)->first();
        $players = Player::where('status', 'approved')->limit(5)->inRandomOrder()->get();
        $events = Events::with('images')->latest()->orderBy('id', 'desc')->limit(5)->get();
        $teams = Team::orderBy('name', 'asc')->get();
        $products = Product::with('category', 'primaryImage')
            ->where('is_active', true)
            ->inRandomOrder()
            ->limit(6)
            ->get();

        return Inertia::render('welcome', [
            'lastMatch' => $lastMatch,
            'nextMatch' => $nextMatch,
            'players' => $players,
            'events' => $events,
            'teams' => $teams,
            'playerCount' => Player::where('status', 'approved')->count(),
            'pendingCount' => Player::where('status', 'pending')->count(),
            'products' => $products,
        ]);
    }

    public function about()
    {
        return inertia('about');
    }

    public function matchCenter(): Response
    {
        $match = Matches::with('venue')->orderByDesc('scheduled_at')->first();
        $oldMatches = Matches::with('venue')
            ->where(function ($query) {
                $query
                    ->whereIn('match_status', [
                        'completed',
                        'finished',
                        'result',
                        'archived',
                    ])
                    ->orWhere(function ($query) {
                        $query
                            ->whereNotNull('scheduled_at')
                            ->where('scheduled_at', '<', now());
                    });
            })
            ->when($match, fn ($query) => $query->where('id', '!=', $match->id))
            ->orderByDesc('scheduled_at')
            ->limit(12)
            ->get();

        return Inertia::render('match-center', [
            'match' => $match,
            'oldMatches' => $oldMatches,
        ]);
    }
}
