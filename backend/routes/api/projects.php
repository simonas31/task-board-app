<?php

use App\Http\Controllers\Api\ProjectsController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function () {
    Route::apiResource('projects', ProjectsController::class);
});
