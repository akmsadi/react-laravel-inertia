<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use App\Models\Team;
use App\Models\Player;


#[Fillable(['team_id', 'player_id', 'name'])]
class TeamPlayer extends Model
{
    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id', 'id');
    }

    public function player()
    {
        return $this->belongsTo(Player::class, 'player_id', 'id');
    }
}
