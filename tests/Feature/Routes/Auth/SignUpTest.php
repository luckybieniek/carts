<?php

namespace Tests\Feature\Routes\Auth;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\Helpers\Auth\AuthUser;

class SignUpTest extends TestCase
{
    use AuthUser;
    use RefreshDatabase;
    use WithFaker;

    public function testUnauthenticatedUserCanAccessSignUp()
    {
        $response = $this->get(route('sign-up.index'));

        $response->assertStatus(200);
    }

//    public function testUnauthenticatedUserCanSignUpWithValidCredentials()
//    {
//    }

    public function testAuthenticatedUserCannotAccessSignUp()
    {
        $this->createAndActAsUser();

        $response = $this->get(route('sign-up.index'));

        $response->assertRedirect(route('home.index'));
    }
}
