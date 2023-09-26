<?php

namespace App\Entities\User;

use App\Entities\Base\BaseValidator;
use App\Entities\Base\HelperValidatorMethods;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class UserValidator implements BaseValidator
{
    use HelperValidatorMethods;

    public function validCreateAttributes(Request $request): Collection
    {
        return collect($request->all())
            ->only(
                $this->exceptValues(UserViewModel::getAttributes(), ['id'])
            )
            ->put('organisation_id', $this->getOrgId())
            ->put('password', bcrypt(Str::random()))
            ->put('active', true);
    }

    public function validReadAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, UserViewModel::class);
    }

    public function validUpdateAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, UserViewModel::class);
    }

    public function validDeleteAttributes(Request $request): Collection
    {
        return $this->onlyViewModelAttributes($request, UserViewModel::class);
    }

    public function validWithAttributes(Request $request): Collection
    {
        return $this->onlyValidWiths($request, UserViewModel::class);
    }
}
