<?php

namespace App\Entities\User;

use App\Entities\Base\BaseViewModel;
use App\Models\User;

class UserViewModel extends BaseViewModel
{
    public array $attributes = [
        'id',
        'organisation_id',
        'name',
        'email',
        'phone_number',
        'password',
        'active',
    ];

    public array $validWiths = [
        'availabilities',
        'availabilities.shifts',
        'availabilities.timeSlot',
        'availabilities.timeSlot.location',
        'roles',
    ];

    protected bool $hasActive = true;

    public function __construct()
    {
        $this->baseModel = new User();
    }
}
