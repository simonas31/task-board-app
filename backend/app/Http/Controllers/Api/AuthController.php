<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends ApiController
{
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        $valid = Auth::validate($credentials);

        if (!$valid) {
            return response()->json(
                ['message' => 'Invalid credentials'],
                JsonResponse::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        // login with jwt

        return response()->json();
    }
    public function register() {}
    public function refreshToken() {}
    public function logout() {}
}
