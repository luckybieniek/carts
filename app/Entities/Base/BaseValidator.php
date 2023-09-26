<?php

namespace App\Entities\Base;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;

interface BaseValidator
{
    public function validCreateAttributes(Request $request): Collection;
    public function validReadAttributes(Request $request): Collection;
    public function validUpdateAttributes(Request $request): Collection;
    public function validDeleteAttributes(Request $request): Collection;

    public function validWithAttributes(Request $request): Collection;
}
