<?php

namespace App\Entities\Location;

use App\Entities\Base\BaseController;

class LocationController extends BaseController
{
    public function __construct()
    {
        $this->authoriser = new LocationAuthoriser();
        $this->validator = new LocationValidator();
        $this->viewModel = new LocationViewModel();
    }
}
