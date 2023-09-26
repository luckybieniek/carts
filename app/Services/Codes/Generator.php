<?php

namespace App\Services\Codes;

use App\Enums\AlphaNumerics;
use App\Services\Base\IGenerator;

class Generator implements IGenerator
{
    private array $config = [
        'format' => 'AANNNN'
    ];

    public static function config(array $configData): IGenerator
    {
        return new self($configData);
    }

    public static function new(): IGenerator
    {
        return new self([]);
    }

    protected function __construct($configData = [])
    {
        $this->config = array_merge($this->config, $configData);
    }

    public function make(): string
    {
        $formatChars = str_split($this->config['format']);

        return array_reduce(
            $formatChars,
            fn($carry, $format) => $carry .= $this->getRandomChar(AlphaNumerics::fromFormat($format)->value),
            ''
        );
    }

    private function getRandomChar(string $charSet): string
    {
        return $charSet[rand(0, strlen($charSet) - 1)];
    }
}
