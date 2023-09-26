<?php

namespace App\Models\Entity;

use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    protected $guarded = [
        'id'
    ];

    public function availability()
    {
        return $this->belongsTo(Availability::class);
    }
}
