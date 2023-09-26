<?php

namespace App\Entities\Shift;

use App\Entities\Base\BaseAuthoriser;

class ShiftAuthoriser extends BaseAuthoriser
{
    protected array $allowedActions = [
        'create' => true,
        'read' => true,
        'update' => true,
        'delete' => true,
    ];
}
