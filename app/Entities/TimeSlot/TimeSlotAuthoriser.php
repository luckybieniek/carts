<?php

namespace App\Entities\TimeSlot;

use App\Entities\Base\BaseAuthoriser;

class TimeSlotAuthoriser extends BaseAuthoriser
{
    protected array $allowedActions = [
        'create' => true,
        'update' => true,
        'delete' => true,
        'read' => true
    ];
}
