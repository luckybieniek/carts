<?php

namespace App\Exceptions\Custom;

class UnexpectedArgumentException extends \Exception
{
    protected $message = 'Unexpected Arguments!';
}
