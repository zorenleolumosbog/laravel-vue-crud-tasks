<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TaskPolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Task $task)
    {
        return $user->id === $task->user_id
                ? Response::allow()
                : Response::denyWithStatus(401);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Task $task)
    {
        return $user->id === $task->user_id
                    ? Response::allow()
                    : Response::denyWithStatus(401);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Task $task)
    {
        return $user->id === $task->user_id
                    ? Response::allow()
                    : Response::denyWithStatus(401);
    }
}
