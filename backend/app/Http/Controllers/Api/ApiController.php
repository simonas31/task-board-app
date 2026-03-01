<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use UnitEnum;

abstract class ApiController
{
    public function authorize(UnitEnum|string $ability, mixed $arguments = []): void
    {
        Gate::authorize($ability, $arguments);
    }

    public function jsonResponse($data = [], int $status = 200, array $headers = [], int $options = 0): JsonResponse
    {
        return response()->json($data, $status, $headers, $options);
    }
}
