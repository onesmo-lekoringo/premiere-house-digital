<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'year',
        'genre',
        'runtime',
        'rating',
        'logline',
        'synopsis',
        'director',
        'cast',
        'premiereDate',
        'premiereVenue',
        'status',
        'trailerUrl',
        'poster',
        'still',
        'accent',
        'featured',
    ];

    protected $casts = [
        'cast' => 'array',
        'featured' => 'boolean',
    ];
}
