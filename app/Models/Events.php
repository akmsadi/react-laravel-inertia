<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Table('events')]
#[Fillable(['title', 'description'])]
class Events extends Model
{
    public function images(): HasMany
    {
        return $this->hasMany(EventImages::class, 'event_id', 'id');
    }
}
