<?php

namespace App\Observers;

use App\Models\Entity\Location;

class LocationObserver
{
    public function deleted(Location $location)
    {
        $location->timeSlots()->delete();
    }
}
