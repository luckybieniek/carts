<?php

namespace App\Enums;

use Exception;

enum AlphaNumerics: string
{
    case Numeric = '0123456789';
    case Alphabetic = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    public static function fromFormat($format)
    {
        return match ($format) {
            'A' => AlphaNumerics::Alphabetic,
            'N' => AlphaNumerics::Numeric,
            default => throw new Exception('Unknown format type!'),
        };
    }
}
