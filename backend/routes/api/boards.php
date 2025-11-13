<?php

use App\Http\Controllers\Api\BoardsController;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'jwt',
    'prefix' => 'projects/{project}'
], function () {
    Route::apiResource('boards', BoardsController::class);
});
