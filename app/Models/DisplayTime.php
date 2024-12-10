<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    /**
     * Get the reservations for the display time.
     *
     * @return HasMany
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'display_time_id');
    }
}
