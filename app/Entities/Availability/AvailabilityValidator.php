<?php

namespace App\Entities\Availability;

use App\Entities\Base\BaseValidator;
use App\Entities\Base\HelperValidatorMethods;
use App\Entities\Base\Validators\Existing;
use App\Exceptions\Custom\UnexpectedArgumentException;
use App\Models\Entity\TimeSlot;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class AvailabilityValidator implements BaseValidator
{
    use HelperValidatorMethods;

    public function validCreateAttributes(Request $request): Collection
    {
        $this->exists(TimeSlot::class, $request->time_slot_id);

        return collect($request->all())
            ->only(
                $this->exceptValues(AvailabilityViewModel::getAttributes(), ['id'])
            )
            ->put('organisation_id', $this->getOrgId())
            ->put('user_id', $this->getUserId());
    }

    public function validReadAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, AvailabilityViewModel::class);
    }

    public function validUpdateAttributes(Request $request): Collection
    {
        if (isset($request->time_slot_id)) {
            $this->exists(TimeSlot::class, $request->time_slot_id);
        }

        if (isset($request->user_id)) {
            $this->exists(User::class, $request->user_id);
        }

        return $this->onlyViewModelAttributes($request, AvailabilityViewModel::class);
    }

    public function validDeleteAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, AvailabilityViewModel::class);
    }

    public function validWithAttributes(Request $request): Collection
    {
        return $this->onlyValidWiths($request, AvailabilityViewModel::class);
    }
}
