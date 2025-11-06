<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;

abstract class ApiController
{
    public function jsonResponse(array $data = [], int $status = 200, array $headers = [], int $options = 0): JsonResponse
    {
        return response()->json($data, $status, $headers, $options);
    }
}
