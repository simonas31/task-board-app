<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Tasks\StoreTaskRequest;
use App\Http\Requests\Tasks\UpdateTaskRequest;
use App\Models\Board;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class TasksController extends ApiController
{
    public function __construct()
    {
        $this->authorizeResource(Task::class);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Board $board): JsonResponse
    {
        $tasks = $board->tasks()->get();
        return $this->jsonResponse(compact('tasks'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request, Board $board): JsonResponse
    {
        $task = $board->tasks()->create($request->validated());
        return $this->jsonResponse($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task): JsonResponse
    {
        return $this->jsonResponse($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task): JsonResponse
    {
        $task->update($request->validated());
        return $this->jsonResponse($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): JsonResponse
    {
        $task->delete();
        return $this->jsonResponse($task);
    }

    public function forceDelete(Task $task): JsonResponse
    {
        $task->forceDelete();
        return $this->jsonResponse($task);
    }
}
