<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Table('matches')]
#[Fillable(['match_type', 'format_overs', 'venue', 'scheduled_at', 'team_name', 'opponent_name', 'toss_winner', 'toss_decision', 'match_status', 'result_type', 'result_summary', 'notes', 'venue_id'])]
class Matches extends Model
{
    use SoftDeletes;

    public function venue(): HasOne
    {
        return $this->hasOne(Venue::class, 'id', 'venue_id');
    }

    public function players(): BelongsToMany
    {
        return $this->belongsToMany(Player::class, 'match_players', 'match_id', 'player_id')->withTimestamps();
    }

    public function summaryBatsmen(): HasMany
    {
        return $this->hasMany(MatchSummaryBatsman::class, 'match_id')->orderBy('sort_order');
    }

    public function summaryBowlers(): HasMany
    {
        return $this->hasMany(MatchSummaryBowler::class, 'match_id')->orderBy('sort_order');
    }
}
