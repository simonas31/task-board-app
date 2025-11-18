<?php

use App\Http\Controllers\Api\ProjectsController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'jwt'], function () {
    Route::apiResource('projects', ProjectsController::class);

    Route::group([
        'as' => 'projects.',
        'controller' => ProjectsController::class
    ], function () {
        Route::get('/sidebar/projects', 'sidebarProjects')->name('sidebar');
    });

    Route::group([
        'as' => 'projects.',
        'prefix' => 'projects/{project}',
        'controller' => ProjectsController::class
    ], function () {
        Route::get('/assignees', 'projectAssignees')->name('assignees');
    });
});
