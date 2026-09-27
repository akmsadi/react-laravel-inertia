<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use App\Models\Team;

#[Fillable(['team_id', 'title', 'description'])]
class TeamAchievement extends Model
{
    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id', 'id');
    }
}
