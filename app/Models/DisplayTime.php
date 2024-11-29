<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisplayTime extends Model
{
    use HasFactory;

    protected $fillable = [
        'movie_id',
        'time_start',
        'time_end',
    ];

    /**
     * Define the relationship with the Movie model.
     */
    public function movie()
    {
        return $this->belongsTo(Movie::class, 'movie_id');
    }
}
