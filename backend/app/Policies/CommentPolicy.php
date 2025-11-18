<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\Task;
use App\Models\User;

class CommentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Task $task, Comment $comment): bool
    {
        return $task->getKey() === $comment->task_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Task $task, Comment $comment): bool
    {
        return $task->getKey() === $comment->task_id &&
            $user->getKey() === $comment->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Task $task, Comment $comment): bool
    {
        return $task->getKey() === $comment->task_id &&
            $user->getKey() === $comment->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Task $task, Comment $comment): bool
    {
        return $task->getKey() === $comment->task_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Task $task, Comment $comment): bool
    {
        return $task->getKey() === $comment->task_id;
    }
}
