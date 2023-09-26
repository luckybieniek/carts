<?php

namespace Tests\Helpers\Auth;

use App\Models\Organisation;
use App\Models\User;

trait AuthUser
{
    protected function createDevUser()
    {
        return User::factory()->create([
            'organisation_id' => Organisation::where('slug', 'dev')->first()->id
        ]);
    }

    protected function createAndActAsUser()
    {
        $this->actingAs(
            $this->createDevUser()
        );
    }
}
