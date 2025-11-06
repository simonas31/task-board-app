<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// unauthenticated routes
Route::controller(AuthController::class)
    ->group(function () {
        Route::post('/login', 'login');
        Route::post('/refresh-token', 'refresh');
    });

// authenticated routes
Route::middleware('auth:api')
    ->controller(AuthController::class)
    ->group(function () {
        Route::post('/register', 'register');
        Route::post('/logout', 'logout');
        Route::get('/me', 'me');
    });
