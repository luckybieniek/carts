<?php

namespace App\Entities\User;

use App\Entities\Base\BaseController;

class UserController extends BaseController
{
    public function __construct()
    {
        $this->authoriser = new UserAuthoriser();
        $this->validator = new UserValidator();
        $this->viewModel = new UserViewModel();
    }
}
