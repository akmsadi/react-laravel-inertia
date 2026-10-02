<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table('match_summary_batsmen')]
class MatchSummaryBatsman extends Model
{
    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }
}
