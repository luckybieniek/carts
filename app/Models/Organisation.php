<?php

namespace App\Models;

use App\Models\Auth\SecretCode;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organisation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function secretCodes()
    {
        return $this->hasMany(SecretCode::class);
    }
}
