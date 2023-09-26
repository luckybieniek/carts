<?php

namespace App\Entities\TimeSlot;

use App\Entities\Base\BaseController;

class TimeSlotController extends BaseController
{
    public function __construct()
    {
        $this->authoriser = new TimeSlotAuthoriser();
        $this->validator = new TimeSlotValidator();
        $this->viewModel = new TimeSlotViewModel();
    }
}
