<?php

namespace App\Entities\Base;

use App\Enums\Responses;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use PhpParser\Node\Expr\Array_;

abstract class BaseViewModel
{
    public array $attributes;
    public array $validWiths;
    public Model $baseModel;
    private array $with = [];
    protected bool $hasActive = false;
    protected bool $isOrgScoped = true;

    public function sort(Builder $query): void
    {
    }

    public function with(Collection $with): self
    {
        foreach ($with as $item) {
            $this->with[] = Str::camel($item);
        }

        return $this;
    }

    public function get(Collection $attributes): Collection
    {
        $query = $this->baseModel::query();

        foreach ($attributes as $key => $value) {
            $query->where($key, $value);
        }

        if ($this->hasActive) {
            $query->where('active', true);
        }

        $this->sort($query);

        return $query
            ->with($this->with)
            ->get($this->attributes);
    }

    public function create(Collection $attributes)
    {
        try {
            $created = $this->baseModel::create($attributes->toArray());
        } catch (QueryException $e) {
            return response($e->errorInfo[2], Responses::BadRequest->value);
        }

        $createdData = Arr::only($created->toArray(), $this->attributes);

        return response($createdData, Responses::Created->value);
    }

    public function update(Collection $attributes)
    {
        $resource = $this->baseModel::
            where('id', $attributes['id'] ?? throw new Exception('Unknown resource'))
            ->when($this->isOrgScoped, function ($query) use ($attributes) {
                $query->where('organisation_id', $attributes['organisation_id']);
            })
            ->first();

        if ($resource === null) {
            return response('', Responses::NotFound->value);
        }

        $resource->fill($attributes->toArray());
        $result = $resource->update();

        $status = $result
            ? Responses::Accepted->value
            : Responses::InternalServerError->value;

        return response('', $status);
    }

    public function delete(Collection $attributes)
    {
        $resource = $this->baseModel::
            where('id', $attributes['id'] ?? throw new Exception('Unknown resource'))
            ->when($this->isOrgScoped, function ($query) use ($attributes) {
                $query->where('organisation_id', $attributes['organisation_id']);
            })
            ->first();

        if ($resource === null) {
            return response('', Responses::NotFound->value);
        }

        $result = $resource->delete();

        $status = $result
            ? Responses::Accepted->value
            : Responses::InternalServerError->value;

        return response('', $status);
    }

    public static function getAttributes(): Collection
    {
        return collect((new static())->attributes ?? []);
    }

    public static function getValidWiths(): Collection
    {
        return collect((new static())->validWiths ?? []);
    }

    public function only(array $array = [], array $keys = []): array
    {
        $newArr = [];

        foreach ($keys as $key) {
            $newArr[$key] = $array[$key] ?? null;
        }

        return $newArr;
    }
}
