<?php

use App\Http\Controllers\Api\TasksController;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'jwt',
    'prefix' => 'projects/{project}/boards/{board}'
], function () {
    Route::apiResource('tasks', TasksController::class);
});
