<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'display_time_id',
        'status',
        'room_order',
        'user_id',
        'movie_id',
    ];

    /**
     * Get the display time associated with the reservation.
     *
     * @return BelongsTo
     */
    public function displayTime(): BelongsTo
    {
        return $this->belongsTo(DisplayTime::class, 'display_time_id');
    }

    /**
     * Get the user associated with the reservation.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the movie associated with the reservation.
     *
     * @return BelongsTo
     */
    public function movie(): BelongsTo
    {
        return $this->belongsTo(Movie::class, 'movie_id');
    }
}
