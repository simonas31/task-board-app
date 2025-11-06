<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends ApiController
{
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        if (!$accessToken = JWTAuth::attempt($credentials)) {
            return response()->json(
                ['message' => 'Invalid credentials'],
                JsonResponse::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        $user = JWTAuth::user();
        $accessTokenTTL = auth()->factory()->getTTL();
        $refreshToken = auth()->setTTL(60 * 24 * 7)->tokenById($user->getKey());
        $refreshTokenTTL = 60 * 60 * 24 * 7;

        return $this->jsonResponse([
            'user' => $user,
            'accessToken' => $accessToken,
            'accessTokenTTL' => $accessTokenTTL * 60,
            'refreshToken' => $refreshToken,
            'refreshTokenTTL' => $refreshTokenTTL, # 1 week
        ])
            ->withCookie(
                cookie(
                    'accessToken',
                    $accessToken,
                    $accessTokenTTL,
                    secure: true,
                    httpOnly: true
                ),
                cookie(
                    'refreshToken',
                    $refreshToken,
                    $refreshTokenTTL,
                    secure: true,
                    httpOnly: true
                )
            );
    }

    public function me(): JsonResponse
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return $this->jsonResponse(['error' => 'User not found'], 404);
            }
        } catch (JWTException $e) {
            return $this->jsonResponse(['error' => 'Invalid token'], 400);
        }

        return $this->jsonResponse(compact('user'));
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = User::create($data);

        return $this->jsonResponse(compact('user'), 201);
    }

    public function refreshToken(Request $request): JsonResponse
    {
        $refreshToken = $request->input('refreshToken')
            ?? $request->cookie('refreshToken');

        if (!$refreshToken) {
            return $this->jsonResponse(['error' => 'Refresh token is missing'], 401);
        }

        $accessToken = auth()->setToken($refreshToken)->refresh();
        $accessTokenTTL = auth()->factory()->getTTL();

        return $this->jsonResponse([
            'accessToken' => $accessToken,
            'accessTokenTTL' => $accessTokenTTL * 60,
        ])
            ->withCookie(cookie(
                'accessToken',
                $accessToken,
                $accessTokenTTL,
                secure: true,
                httpOnly: true
            ));
    }

    public function logout(): JsonResponse
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return $this->jsonResponse();
    }
}
