<?php

namespace App\Entities\Shift;

use App\Entities\Base\BaseViewModel;
use App\Models\Entity\Shift;

class ShiftViewModel extends BaseViewModel
{
    public array $attributes = [
        'id',
        'availability_id',
        'captain',
    ];

    public array $validWiths = [
        'availability',
        'availability.time_slot',
        'availability.time_slot.location'
    ];

    public function __construct()
    {
        $this->baseModel = new Shift();
    }
}
