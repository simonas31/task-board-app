<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;

class DataAccessService
{
    private Authenticatable $user;

    public function __construct()
    {
        if (!$this->user = auth()->user()) {
            throw new \Exception("User must be logged in");
        }
    }

    public function projectsQuery(): Builder
    {
        return Project::query()
            ->whereHas(
                'users',
                fn($q) => $q->where('users.id', $this->user->getKey())
            );
    }
}
