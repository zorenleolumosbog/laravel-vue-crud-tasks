<?php

namespace App\Services;

use App\Models\Tag;
use App\Models\Task;

class TaskService
{
    /**;
     * Create a new class instance.
     */
    public function __construct(
        private FileService $fileService
    ){}

    protected function getTaskPriorityOrder(array $data): array
    {
        switch ($data['priority']) {
            case Task::priorityUrgent:
                $data['order'] = 3;
                break;
            case Task::priorityHigh:
                $data['order'] = 2;
                break;
            case Task::priorityNormal:
                $data['order'] = 1;
                break;
            case Task::priorityLow:
                $data['order'] = 0;
                break;
        }

        return $data;
    }

    public function createTask(array $data): Task
    {
        return auth()->user()->tasks()->create($this->getTaskPriorityOrder($data));
    }

    public function createTaskAttachments(Task $task, $request): void
    {
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $task->attachments()->create($this->fileService->uploadFile($file));
            }
        }
    }

    public function createTaskTags(Task $task, $request): void
    {
        if ($request->has('tags')) {
            $task->tags()->sync($request->tags);
        }
    }

    public function updateTask(Task $task, $data): Task
    {
        return tap($task)->update($this->getTaskPriorityOrder($data));
    }
    
    public function updateTaskTags(Task $task, $request): void
    {
        if ($request->has('tags')) {
            $task->tags()->sync($request->tags);
        }
    }

    public function deleteTask(Task $task)
    {
        return $task->delete();
    }

    public function completeTask(Task $task): Task
    {
        return tap($task)->update(['completed_at' => now()]);
    }

    public function incompleteTask(Task $task): Task
    {
        return tap($task)->update(['completed_at' => null]);
    }

    public function archiveTask(Task $task): Task
    {
        return tap($task)->update(['archived_at' => now()]);
    }

    public function restoreTask(Task $task): Task
    {
        return tap($task)->update(['archived_at' => null]);
    }
}
