<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'slug', 'slogan', 'about', 'captain_id', 'vice_captain_id', 'logo', 'banner', 'established', 'matches', 'wins', 'titles', 'is_external'])]
class Team extends Model
{
    protected function casts(): array
    {
        return [
            'is_external' => 'boolean',
        ];
    }

    public function captain(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'captain_id', 'id');
    }

    public function viceCaptain(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'vice_captain_id', 'id');
    }

    public function players(): HasMany
    {
        return $this->hasMany(TeamPlayer::class, 'team_id', 'id');
    }

    public function achievements(): HasMany
    {
        return $this->hasMany(TeamAchievement::class, 'team_id', 'id');
    }
}
