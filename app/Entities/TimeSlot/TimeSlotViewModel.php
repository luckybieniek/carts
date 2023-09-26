<?php

namespace App\Entities\TimeSlot;

use App\Entities\Base\BaseViewModel;
use App\Models\Entity\TimeSlot;
use Illuminate\Database\Eloquent\Builder;

class TimeSlotViewModel extends BaseViewModel
{
    public array $attributes = [
        'id',
        'location_id',
        'start_time',
        'end_time',
        'day',
        'frequency',
        'active'
    ];

    public array $validWiths = [
        'location'
    ];

    protected bool $hasActive = true;

    public function __construct()
    {
        $this->baseModel = new TimeSlot();
    }

    public function sort(Builder $query): void
    {
        $query->orderBy('location_id')
            ->orderByRaw('start_time * 1')
            ->orderByRaw('end_time * 1');
    }
}
