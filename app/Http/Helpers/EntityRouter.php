<?php

namespace App\Http\Helpers;

use Illuminate\Support\Facades\Route;

class EntityRouter
{
    public static function entity($route, $controller)
    {
        Route::get($route, $controller . '@index');
        Route::post($route, $controller . '@store');
        Route::patch($route, $controller . '@update');
        Route::put($route, $controller . '@update');
        Route::delete($route, $controller . '@delete');
    }
}
