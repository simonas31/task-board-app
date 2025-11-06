<?php

use App\Http\Controllers\Api\BoardsController;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'projects/{project}/'
], function () {
    Route::apiResource('boards', BoardsController::class);
});
