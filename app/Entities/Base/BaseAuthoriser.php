<?php

namespace App\Entities\Base;

abstract class BaseAuthoriser
{
    protected array $allowedActions = [
        'create' => false,
        'read' => false,
        'update' => false,
        'delete' => false,
    ];

    public function can($action)
    {
        $allowedAction = $this->allowedActions[$action] ?? false;

        return is_callable($allowedAction) ? $allowedAction() : $allowedAction;
    }
}
