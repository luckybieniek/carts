<?php

namespace App\Entities\Base\Validators;

use App\Entities\Base\BaseViewModel;
use App\Exceptions\Custom\UnexpectedArgumentException;
use Illuminate\Database\Eloquent\Model;

class Existing
{
    public function entities(BaseViewModel $viewModel, $entities)
    {

    }

    public static function handle($model, $id): bool
    {
        if (!is_a($model, Model::class, true)) {
            throw new UnexpectedArgumentException();
        }

        return $model::where('id', $id)
            ->where('organisation_id', session('org_id', 0))
            ->exists();
    }
}
