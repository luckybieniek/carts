<?php

namespace Tests\Feature\Routes\Base;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NotFoundController extends TestCase
{
    public function testAccessingAjaxOnlyEndpointRedirectsToNotFound()
    {
        $this->markTestIncomplete();
    }
}
