<?php

namespace Tests\Feature\Routes\Auth;

use App\Models\Organisation;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use Tests\Helpers\Auth\AuthUser;

class SignInTest extends TestCase
{
//    use DatabaseMigrations;
    use RefreshDatabase;
    use AuthUser;

    public function testUnauthenticatedUserCanAccessSignInPage()
    {
        $response = $this->get(route('sign-in.index'));

        $response->assertStatus(200);
    }

    public function testUnauthenticatedUserCanSignIn()
    {
        $user = $this->createDevUser();

        $response = $this->post(
            route('sign-in.store'),
            [
                'email' => $user->email,
                'password' => 'password'
            ]
        );

        $response->assertRedirect(route('home.index'));
        $this->assertTrue(Auth::check());
    }

//    public function testUnauthenticatedUserCannotSignInToDifferentOrganisation()
//    {
//        $user = User::factory()->create();
//
//        $response = $this->post(
//            route('sign-in.store'),
//            [
//                'email' => $user->email,
//                'password' => 'password'
//            ]
//        );
//
//        $response->assertStatus(401);
//        $this->assertFalse(Auth::check());
//    }

    public function testAuthenticatedUserCannotAccessSignInPage()
    {
        $this->createAndActAsUser();

        $response = $this->get(route('sign-in.index'));

        $response->assertRedirect(route('home.index'));
    }
}
