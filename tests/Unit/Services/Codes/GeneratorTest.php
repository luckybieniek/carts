<?php

namespace Tests\Unit\Services\Codes;

use App\Enums\AlphaNumerics;
use App\Services\Codes\Generator;
use PHPUnit\Framework\TestCase;

class GeneratorTest extends TestCase
{

    public function testItGeneratesARandomSixCharCode()
    {
        $code = Generator::new()
            ->make();

        $this->assertNotEmpty($code);
        $this->assertSame(6, strlen($code));
        $this->assertFormat('AANNNN', $code);
    }

    public function testItCanBeConfiguredToUseADifferentFormat()
    {
        $format = 'AAAAAANNNNNN';

        $code = Generator::config(compact('format'))
            ->make();

        $this->assertFormat($format, $code);
    }

    private function assertFormat(string $expected, string $actual)
    {
        for ($i = 0; $i < strlen($actual); $i++) {
            $charSet = AlphaNumerics::fromFormat($expected[$i])->value;
            $char = $actual[$i];

            $this->assertStringContainsString($char, $charSet);
        }
    }
}
