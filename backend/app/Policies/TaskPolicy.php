<?php

namespace App\Policies;

use App\Models\Board;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Services\DataAccessService;

class TaskPolicy
{
    private BoardPolicy $boardPolicy;
    public function __construct(
        protected DataAccessService $accessService
    ) {
        $this->boardPolicy = app(BoardPolicy::class);
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $this->boardPolicy->viewAny($user);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Project $project, Board $board, Task $task): bool
    {
        return $this->boardPolicy->view($user, $project, $board)
            && $task->board_id === $board->getKey();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $this->boardPolicy->create($user);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Project $project, Board $board, Task $task): bool
    {
        return $this->boardPolicy->update($user, $project, $board)
            && $task->board_id === $board->getKey();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Project $project, Board $board, Task $task): bool
    {
        return $this->boardPolicy->delete($user, $project, $board)
            && $task->board_id === $board->getKey();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Project $project, Board $board, Task $task): bool
    {
        return $this->boardPolicy->delete($user, $project, $board)
            && $task->board_id === $board->getKey();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Project $project, Board $board, Task $task): bool
    {
        return $this->accessService->projectsQuery()->exists()
            && $board->project_id === $project->getKey()
            && $task->board_id === $board->getKey();
    }
}
