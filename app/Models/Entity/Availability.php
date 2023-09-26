<?php

namespace App\Models\Entity;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    protected $guarded = [
        'id'
    ];

    public function timeSlot()
    {
        return $this->belongsTo(TimeSlot::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shifts()
    {
        return $this->hasMany(Shift::class);
    }
}
