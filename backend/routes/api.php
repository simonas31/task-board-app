<?php

use Illuminate\Support\Facades\Route;

Route::group([], function () {
    require base_path('routes/api/auth.php');
    require base_path('routes/api/projects.php');
    require base_path('routes/api/boards.php');
    require base_path('routes/api/tasks.php');
});
