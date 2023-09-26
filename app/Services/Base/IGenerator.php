<?php

namespace App\Services\Base;

interface IGenerator
{
    public static function config(array $configData): IGenerator;
    public static function new(): IGenerator;

    public function make();
}
