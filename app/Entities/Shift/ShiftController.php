<?php

namespace App\Entities\Shift;

use App\Entities\Base\BaseController;

class ShiftController extends BaseController
{
    public function __construct()
    {
        $this->authoriser = new ShiftAuthoriser();
        $this->validator = new ShiftValidator();
        $this->viewModel = new ShiftViewModel();
    }
}
