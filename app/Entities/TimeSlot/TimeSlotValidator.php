<?php

namespace App\Entities\TimeSlot;

use App\Entities\Base\HelperValidatorMethods;
use App\Exceptions\Custom\UnexpectedArgumentException;
use App\Models\Entity\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Entities\Base\BaseValidator;

class TimeSlotValidator implements BaseValidator
{
    use HelperValidatorMethods;

    private const _ValidDays = [
        1, 2, 3, 4, 5, 6, 7
    ];

    public function validCreateAttributes(Request $request): Collection
    {
        $this->exists(Location::class, $request->location_id);
        $this->validDay($request->day);

        return collect($request->all())
            ->only(
                $this->exceptValues(TimeSlotViewModel::getAttributes(), ['id'])
            )
            ->put('organisation_id', $this->getOrgId());
    }

    public function validReadAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, TimeSlotViewModel::class);
    }

    public function validUpdateAttributes(Request $request): Collection
    {
        if (isset($request->location_id)) {
            $this->exists(Location::class, $request->location_id);
        }

        if (isset($request->day)) {
            $this->validDay($request->day);
        }

        return $this->onlyViewModelAttributes($request, TimeSlotViewModel::class);
    }

    public function validDeleteAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, TimeSlotViewModel::class);
    }

    private function validDay($day)
    {
        return in_array(strtolower($day), self::_ValidDays) ? null : throw new UnexpectedArgumentException();
    }

    public function validWithAttributes(Request $request): Collection
    {
        return $this->onlyValidWiths($request, TimeSlotViewModel::class);
    }
}
