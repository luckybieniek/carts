<?php

namespace App\Entities\Location;

use App\Entities\Base\BaseAuthoriser;

class LocationAuthoriser extends BaseAuthoriser
{
    protected array $allowedActions = [
        'create' => true,
        'read' => true,
        'update' => true,
        'delete' => true,
    ];
}
