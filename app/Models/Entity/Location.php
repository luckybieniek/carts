<?php

namespace App\Models\Entity;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $guarded = [
        'id'
    ];

    public function timeSlots()
    {
        return $this->hasMany(TimeSlot::class);
    }
}
