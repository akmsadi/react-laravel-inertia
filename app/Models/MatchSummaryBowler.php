<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table('match_summary_bowlers')]
class MatchSummaryBowler extends Model
{
    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }
}
