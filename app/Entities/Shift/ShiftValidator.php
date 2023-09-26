<?php

namespace App\Entities\Shift;

use App\Entities\Base\BaseValidator;
use App\Entities\Base\HelperValidatorMethods;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ShiftValidator implements BaseValidator
{
    use HelperValidatorMethods;

    public function validCreateAttributes(Request $request): Collection
    {
        return collect($request->all())
            ->only(
                $this->exceptValues(ShiftViewModel::getAttributes(), ['id'])
            )
            ->put('organisation_id', $this->getOrgId());
    }

    public function validReadAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, ShiftViewModel::class);
    }

    public function validUpdateAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, ShiftViewModel::class);
    }

    public function validDeleteAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, ShiftViewModel::class);
    }

    public function validWithAttributes(Request $request): Collection
    {
        return $this->onlyValidWiths($request, ShiftViewModel::class);
    }
}
