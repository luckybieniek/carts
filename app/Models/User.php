<?php

namespace App\Models;

use App\Models\Entity\Availability;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = [
        'id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function organisation()
    {
        return $this->belongsTo(Organisation::class);
    }

    public function availabilities()
    {
        return $this->hasMany(Availability::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    public function isA(string $role)
    {
        return $this->roles->pluck('name')->contains($role);
    }

    public function isSuperAdmin()
    {
        return $this->isA('superadmin');
    }

    public function isShiftAdmin()
    {
        return $this->isA('shift_admin');
    }
}
