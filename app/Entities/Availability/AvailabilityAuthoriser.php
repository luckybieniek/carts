<?php

namespace App\Entities\Availability;

use App\Entities\Base\BaseAuthoriser;

class AvailabilityAuthoriser extends BaseAuthoriser
{
    protected array $allowedActions = [
        'create' => true,
        'update' => true,
        'read' => true,
        'delete' => true
    ];
}
