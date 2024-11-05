<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    // Add a new task
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,completed',
        ]);

        $task = Task::create($request->all());
        return response()->json($task, Response::HTTP_CREATED);
    }

    // Retrieve tasks
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    // Update a task
    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:pending,completed',
        ]);

        $task->update($request->all());
        return response()->json($task);
    }

    // Delete a task
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
