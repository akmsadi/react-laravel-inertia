<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\DB;

#[Fillable(['match_id', 'title', 'amount', 'notes'])]
class Expense extends Model
{
    use HasFactory;

    public function match(): BelongsTo
    {
        return $this->belongsTo(Matches::class, 'match_id');
    }

    public function contributors(): BelongsToMany
    {
        return $this->belongsToMany(Player::class, 'expense_contributors', 'expense_id', 'player_id')->withTimestamps();
    }

    /**
     * Approved players who may contribute: the match squad for a match expense, otherwise everyone approved.
     *
     * @return Builder<Player>
     */
    public function eligibleContributors(): Builder
    {
        return Player::query()
            ->where('status', 'approved')
            ->when($this->match_id, fn (Builder $query) => $query->whereIn(
                'id',
                DB::table('match_players')->where('match_id', $this->match_id)->select('player_id'),
            ))
            ->orderBy('name');
    }
}
