<?php

namespace App\Models\Entity;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    protected $guarded = [
        'id'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
