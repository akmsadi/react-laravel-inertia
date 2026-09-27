<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\Matches;
use App\Models\Players;
use App\Models\Teams;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $lastMatch = Matches::orderBy('scheduled_at', 'desc')->with('venue')->limit(1)->first();
        $nextMatch = Matches::where('scheduled_at', '>', date('Y-m-d H:i:s'))->where('match_status', '!=', 'archived')->orderBy('scheduled_at', 'asc')->with('venue')->limit(1)->first();
        $players = Players::where('status', 'approved')->limit(10)->inRandomOrder()->get();
        $events = Events::with('images')->latest()->orderBy('id', 'desc')->limit(5)->get();
        $teams = Teams::orderBy('name', 'asc')->get();

        return Inertia::render('welcome', [
            'lastMatch' => $lastMatch,
            'nextMatch' => $nextMatch,
            'players' => $players,
            'events' => $events,
            'teams' => $teams,
            'playerCount' => Players::where('status', 'approved')->count(),
            'pendingCount' => Players::where('status', 'pending')->count(),
        ]);
    }

    public function about()
    {
        return inertia('about');
    }
}
