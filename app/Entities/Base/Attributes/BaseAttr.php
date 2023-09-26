<?php

namespace App\Entities\Base\Attributes;

class BaseAttr
{
    public $name = '';
    public $databaseName = '';

    public function __construct($name, $databaseName)
    {
        $this->name = $name;
        $this->databaseName = $databaseName;
    }

    public static function make($name)
    {
        return new self($name, $name);
    }

    public static function makeUnique($name, $databaseName)
    {
        return new self($name, $databaseName);
    }
}
