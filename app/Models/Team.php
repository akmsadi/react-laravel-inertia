<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table('teams')]
#[Fillable(['name', 'slug', 'slogan', 'about'])]
class Team extends Model
{
}
