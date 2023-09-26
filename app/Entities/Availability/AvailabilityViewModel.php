<?php

namespace App\Entities\Availability;

use App\Entities\Base\BaseViewModel;
use App\Models\Entity\Availability;

class AvailabilityViewModel extends BaseViewModel
{
    public array $attributes = [
        'id',
        'organisation_id',
        'time_slot_id',
        'user_id',
        'available',
        'always_available',
        'week_occurring'
    ];

    public array $validWiths = [
        'user',
        'time-slot',
        'time-slot.location'
    ];

    public function __construct()
    {
        $this->baseModel = new Availability();
    }
}
