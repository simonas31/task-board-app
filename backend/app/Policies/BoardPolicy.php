<?php

namespace App\Policies;

use App\Models\Board;
use App\Models\Project;
use App\Models\User;

class BoardPolicy
{
    private ProjectPolicy $projectPolicy;
    public function __construct()
    {
        $this->projectPolicy = app(ProjectPolicy::class);
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $this->projectPolicy->viewAny($user);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Project $project, Board $board): bool
    {
        return $this->projectPolicy->view($user, $project)
            && $board->project_id === $project->getKey();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $this->projectPolicy->create($user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Project $project, Board $board): bool
    {
        return $this->projectPolicy->update($user, $project)
            && $board->project_id === $project->getKey();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Project $project, Board $board): bool
    {
        return $this->projectPolicy->delete($user, $project)
            && $board->project_id === $project->getKey();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Project $project, Board $board): bool
    {
        return $this->projectPolicy->restore($user, $project)
            && $board->project_id === $project->getKey();
    }
}
