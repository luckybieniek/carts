<?php

namespace App\Entities\Base;

use Illuminate\Http\Request;

abstract class BaseController
{
    protected BaseAuthoriser $authoriser;
    protected BaseValidator $validator;
    protected BaseViewModel $viewModel;

    public function index(Request $request)
    {
        if (!$this->authoriser->can('read')) {
            return redirect(route('not-found'));
        }

        $attributes = $this->validator->validReadAttributes($request);
        $withAttributes = $this->validator->validWithAttributes($request);

        return $this->viewModel
            ->with($withAttributes)
            ->get($attributes);
    }

    public function store(Request $request)
    {
        if (!$this->authoriser->can('create')) {
            return redirect(route('not-found'));
        }

        $attributes = $this->validator->validCreateAttributes($request);


        return $this->viewModel->create($attributes);
    }

    public function update(Request $request)
    {
        if (!$this->authoriser->can('update')) {
            return redirect(route('not-found'));
        }

        $attributes = $this->validator->validUpdateAttributes($request);

        return $this->viewModel->update($attributes);
    }

    public function delete(Request $request)
    {
        if (!$this->authoriser->can('delete')) {
            return redirect(route('not-found'));
        }

        $attributes = $this->validator->validDeleteAttributes($request);

        return $this->viewModel->delete($attributes);
    }
}
