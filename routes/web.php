<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{HomePageController, NotFoundController, Role\UserRoleController};
use App\Http\Controllers\Auth\{
    SignInController,
    SignUpController,
    SignOutController,
    CSRFController,
    UserController
};
use App\Entities\{
    Location\LocationController,
    Shift\ShiftController,
    TimeSlot\TimeSlotController,
    Availability\AvailabilityController,
    User\UserController as UserEntityController
};
use App\Http\Helpers\EntityRouter;

Route::get('not-found', [NotFoundController::class, 'index'])
    ->name('not-found');

Route::group(['middleware' => ['guest']], function () {
    Route::resource('sign-in', SignInController::class)
        ->only(['index', 'store']);

    Route::resource('sign-up',SignUpController::class)
        ->only(['index', 'store']);

    Route::resource('csrf', CSRFController::class)
        ->only(['index']);
});

Route::group(['middleware' => ['auth']], function () {
    Route::get('/', HomePageController::class . '@index')
        ->name('home.index');

    Route::get('user', UserController::class . '@index')
        ->name('user.index');

    Route::delete('sign-out', SignOutController::class . '@delete');

    Route::post('user-role', UserRoleController::class . '@store');
    Route::delete('user-role', UserRoleController::class . '@delete');

    Route::group(['middleware' => ['ajax'], 'prefix' => 'entity'], function() {
        EntityRouter::entity('location', LocationController::class);
        EntityRouter::entity('time-slot', TimeSlotController::class);
        EntityRouter::entity('availability', AvailabilityController::class);
        EntityRouter::entity('shift', ShiftController::class);
        EntityRouter::entity('user', UserEntityController::class);
    });
});
