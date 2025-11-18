<?php

namespace App\Policies;

use App\Models\Attachment;
use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AttachmentPolicy
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
    public function view(User $user, Task $task, Attachment $attachment): bool
    {
        return $task->getKey() === $attachment->task_id;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Task $task, Attachment $attachment): bool
    {
        return $task->getKey() === $attachment->task_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Task $task, Attachment $attachment): bool
    {
        return $task->getKey() === $attachment->task_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Task $task, Attachment $attachment): bool
    {
        return $task->getKey() === $attachment->task_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Task $task, Attachment $attachment): bool
    {
        return $task->getKey() === $attachment->task_id;
    }
}
