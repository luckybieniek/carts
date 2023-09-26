<?php

namespace App\Entities\Location;

use App\Entities\Base\BaseViewModel;
use App\Models\Entity\Location;

class LocationViewModel extends BaseViewModel
{
    public array $attributes = [
        'id',
        'name',
        'maps_url',
        'colour'
    ];

    public function __construct()
    {
        $this->baseModel = new Location();
    }
}
