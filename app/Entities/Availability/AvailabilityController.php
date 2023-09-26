<?php

namespace App\Entities\Availability;

use App\Entities\Base\BaseController;

class AvailabilityController extends BaseController
{
    public function __construct()
    {
        $this->authoriser = new AvailabilityAuthoriser();
        $this->validator = new AvailabilityValidator();
        $this->viewModel = new AvailabilityViewModel();
    }
}
