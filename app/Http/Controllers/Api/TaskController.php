<?php

namespace App\Http\Controllers\Api;

use App\Models\Task;
use App\Http\Requests\TaskRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Services\TaskService;
use Illuminate\Support\Facades\Gate;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class TaskController extends Controller
{
    public function __construct(
        private TaskService $taskService
    ){}

    public function index(Request $request)
    {
        $tasks = QueryBuilder::for($request->user()->tasks())
                    ->defaultSort('-created_at')
                    ->allowedSorts(['title', 'description', 'due_date', 'order', 'completed_at', 'archived_at', 'created_at'])
                    ->allowedFilters([
                        'priority',
                        AllowedFilter::scope('search'),
                    ])
                    ->with(['attachments', 'tags'])
                    ->filter($request->all())
                    ->paginate($request->limit ?? 10);

        return TaskResource::collection($tasks);
    }

    public function store(TaskRequest $request)
    {
        $validatedData = $request->validated();

        $task = $this->taskService->createTask($validatedData);

        $this->taskService->createTaskAttachments($task, $request);

        $this->taskService->createTaskTags($task, $request);

        return new TaskResource($task->load('attachments', 'tags'));
    }

    public function show(Task $task)
    {
        Gate::authorize('view', $task);

        return new TaskResource($task->load('attachments', 'tags'));
    }

    public function update(TaskRequest $request, Task $task)
    {
        Gate::authorize('update', $task);
        $task = $this->taskService->updateTask($task, $request->validated());

        $this->taskService->createTaskAttachments($task, $request);

        $this->taskService->updateTaskTags($task, $request);

        return new TaskResource($task->load('attachments', 'tags'));
    }

    public function destroy(Task $task)
    {
        Gate::authorize('delete', $task);
        $this->taskService->deleteTask($task);

        return response()->noContent();
    }

    public function complete(Task $task)
    {
        Gate::authorize('update', $task);
        $task = $this->taskService->completeTask($task);

        return new TaskResource($task);
    }

    public function incomplete(Task $task)
    {
        Gate::authorize('update', $task);
        $task = $this->taskService->incompleteTask($task);

        return new TaskResource($task);
    }

    public function archive(Task $task)
    {
        Gate::authorize('update', $task);
        $task = $this->taskService->archiveTask($task);

        return new TaskResource($task);
    }

    public function restore(Task $task)
    {
        Gate::authorize('update', $task);
        $task = $this->taskService->restoreTask($task);

        return new TaskResource($task);
    }

    public function getCountByStatuses()
    {
        $user = auth()->user();

        return response()->json([
            'incompleteCount' => $user->tasks()->incompleteStatus()->count(),
            'completeCount' => $user->tasks()->completeStatus()->count(),
            'archiveCount' => $user->tasks()->archiveStatus()->count(),
        ]);
    }

    public function getSortOptions()
    {
        $user = auth()->user();

        return response()->json([
                    [
                        'label' => 'Default',
                        'sort' => '-created_at'
                    ],
                    [
                        'label' => 'Title - Asc',
                        'sort' => 'title'
                    ],
                    [
                        'label' => 'Title - Desc',
                        'sort' => '-title'
                    ],
                    [
                        'label' => 'Description - Asc',
                        'sort' => 'description'
                    ],
                    [
                        'label' => 'Description - Desc',
                        'sort' => '-description'
                    ],
                    [
                        'label' => 'Due Date - Asc',
                        'sort' => 'due_date'
                    ],
                    [
                        'label' => 'Due Date - Desc',
                        'sort' => '-due_date'
                    ],
                    [
                        'label' => 'Created Date - Asc',
                        'sort' => 'created_at'
                    ],
                    [
                        'label' => 'Created Date - Desc',
                        'sort' => '-created_at'
                    ],
                    [
                        'label' => 'Completed Date - Asc',
                        'sort' => 'completed_at'
                    ],
                    [
                        'label' => 'Completed Date - Desc',
                        'sort' => '-completed_at'
                    ],
                    [
                        'label' => 'Priority - Asc',
                        'sort' => 'order'
                    ],
                    [
                        'label' => 'Priority - Desc',
                        'sort' => '-order'
                    ],
                ]);
    }
}
