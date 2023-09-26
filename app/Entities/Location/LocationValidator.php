<?php

namespace App\Entities\Location;

use App\Entities\Base\BaseValidator;
use App\Entities\Base\HelperValidatorMethods;
use App\Entities\Shift\ShiftViewModel;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class LocationValidator implements BaseValidator
{
    use HelperValidatorMethods;

    public function validCreateAttributes(Request $request): Collection
    {
        return collect($request->all())
            ->only(
                $this->exceptValues(LocationViewModel::getAttributes(), ['id'])
            )
            ->put('organisation_id', $this->getOrgId());
    }

    public function validReadAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, LocationViewModel::class);
    }

    public function validUpdateAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, LocationViewModel::class);
    }

    public function validDeleteAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, LocationViewModel::class);
    }

    public function validWithAttributes(Request $request): Collection
    {
        return $this->onlyValidWiths($request, ShiftViewModel::class);
    }
}
