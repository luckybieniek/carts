<?php

namespace Tests\Feature\Routes\Base;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Tests\Helpers\Auth\AuthUser;

class HomepageTest extends TestCase
{
    use AuthUser;
    use RefreshDatabase;

    public function testUnauthenticatedUserCannotAccessHomePage()
    {
        $response = $this->get(route('home.index'));

        $response->assertRedirect(route('sign-in.index'));
    }

    public function testAuthenticatedUserCanAccessHomePage()
    {
        $this->createAndActAsUser();

        $response = $this->get(route('home.index'));

        $response->assertStatus(200);
    }
}
