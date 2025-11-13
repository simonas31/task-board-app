<?php

namespace App\Http\Controllers\Api;

use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Http\JsonResponse;

abstract class ApiController
{
    /**
     * Authorize a resource action based on the incoming request.
     *
     * @param  string  $model
     * @return void
     */
    public function authorizeResource(string $model): void
    {
        $requestRoute = request()->route();
        $method = $requestRoute->getActionMethod();

        $arguments = $this->buildArguments($model);

        $authService = $this->getAuthService();

        $ability = $this->resourceMethodsWithoutModels()[$method]
            ?? $this->resourceAbilityMap()[$method]
            ?? '';

        $authService->authorize($ability, $arguments);
    }

    protected function buildArguments(string $model): array
    {
        $arguments = array_values(request()->route()->parameters());

        if (empty($arguments)) {
            $arguments[] = $model;
        }

        return $arguments;
    }

    protected function getAuthService(): Gate
    {
        $user = request()->user();
        $authService = app(Gate::class);

        if ($user) {
            $authService->forUser($user);
        }

        return $authService;
    }

    /**
     * Get the map of resource methods to ability names.
     *
     * @return array<string, string>
     */
    protected function resourceAbilityMap(): array
    {
        return [
            'index' => 'viewAny',
            'show' => 'view',
            'create' => 'create',
            'store' => 'create',
            'edit' => 'update',
            'update' => 'update',
            'destroy' => 'delete',
        ];
    }

    /**
     * Get the list of resource methods which do not have model parameters.
     *
     * @return list<string>
     */
    protected function resourceMethodsWithoutModels(): array
    {
        return [
            'index' => 'viewAny',
            'create' => 'create',
            'store' => 'create',
        ];
    }

    public function jsonResponse($data = [], int $status = 200, array $headers = [], int $options = 0): JsonResponse
    {
        return response()->json($data, $status, $headers, $options);
    }
}
