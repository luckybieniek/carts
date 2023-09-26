<?php

namespace Tests\Feature\Models\Auth;

use App\Models\Auth\SecretCode;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helpers\Auth\AuthUser;
use Tests\TestCase;

class SecretCodeTest extends TestCase
{
    use RefreshDatabase;
    use AuthUser;

    public function testItCreatesUniqueSecretCodes()
    {
        $this->createAndActAsUser();

        $secret1 = SecretCode::generate();
        $secret2 = SecretCode::generate();

        $this->assertNotSame($secret1->code, $secret2->code);
    }
}
