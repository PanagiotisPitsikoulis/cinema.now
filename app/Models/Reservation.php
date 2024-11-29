<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'display_time_id',
        'status',
        'room_order',
        'user_id',
    ];

    /**
     * Define the relationship with the DisplayTime model.
     */
    public function displayTime()
    {
        return $this->belongsTo(DisplayTime::class, 'display_time_id');
    }
}
