<?php

namespace App\Entities\User;

use App\Entities\Base\BaseAuthoriser;
use Illuminate\Support\Facades\Auth;

class UserAuthoriser extends BaseAuthoriser
{
    protected array $allowedActions = [
        'create' => null,
        'update' => null,
        'delete' => false,
        'read' => true
    ];

    public function __construct() {
        $this->allowedActions['create'] = fn() => Auth::user()->isSuperAdmin();
        $this->allowedActions['update'] = fn() => Auth::user()->isSuperAdmin() || Auth::user()->id == request()->id;
    }
}
