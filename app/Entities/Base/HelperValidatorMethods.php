<?php

namespace App\Entities\Base;

use App\Entities\Base\Validators\Existing;
use App\Exceptions\Custom\UnexpectedArgumentException;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

trait HelperValidatorMethods
{
    public function onlyViewModelAttributes(Request $request, $viewModel): Collection
    {
        if (!is_a($viewModel, BaseViewModel::class, true)) {
            throw new \Exception("Unexpected argument");
        }

        return collect($request->all())
            ->only($viewModel::getAttributes())
            ->put('organisation_id', $this->getOrgId());
    }

    public function onlyValidWiths(Request $request, $viewModel): Collection
    {
        if (!is_a($viewModel, BaseViewModel::class, true)) {
            throw new \Exception("Unexpected argument");
        }

        $withAttributes = collect($request->has('with')
            ? $request->get('with')
            : []);

        return $withAttributes->flip()->only($viewModel::getValidWiths())->flip();
    }

    public function exceptValues(Collection $collection, array $values)
    {
        return $collection
            ->flip()
            ->except($values)
            ->keys();
    }

    public function getOrgId()
    {
        return session('org_id');
    }

    public function getUserId()
    {
        return Auth::user()->getAuthIdentifier();
    }

    public function exists($model, $value)
    {
        if (!Existing::handle($model, $value)) {
            throw new UnexpectedArgumentException();
        }
    }
}
