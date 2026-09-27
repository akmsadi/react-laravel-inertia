<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

#[Table('matches')]
#[Fillable(['match_type', 'format_overs', 'venue', 'scheduled_at', 'team_name', 'opponent_name', 'toss_winner', 'toss_decision', 'match_status', 'result_type', 'result_summary', 'notes', 'venue_id'])]
class Matches extends Model
{
    public function venue(): HasOne
    {
        return $this->hasOne(Venue::class, 'id', 'venue_id');
    }
}
