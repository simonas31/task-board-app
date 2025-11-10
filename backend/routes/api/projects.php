<?php

use App\Http\Controllers\Api\ProjectsController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'jwt'], function () {
    Route::apiResource('projects', ProjectsController::class);
});
