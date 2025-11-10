<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// unauthenticated routes
Route::controller(AuthController::class)
    ->group(function () {
        Route::post('/login', 'login');
        Route::post('/register', 'register');
        Route::post('/refresh-token', 'refreshToken');
    });

// authenticated routes
Route::middleware('jwt')
    ->controller(AuthController::class)
    ->group(function () {
        Route::get('/me', 'me');
        Route::post('/logout', 'logout');
    });
