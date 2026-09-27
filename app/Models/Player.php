<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'organization', 'nickname', 'email', 'phone', 'address', 'status', 'guest_of_player_id'])]
class Player extends Model
{
    public function guestOf(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'guest_of_player_id', 'id');
    }

    public function guests(): HasMany
    {
        return $this->hasMany(Player::class, 'guest_of_player_id', 'id');
    }
}
