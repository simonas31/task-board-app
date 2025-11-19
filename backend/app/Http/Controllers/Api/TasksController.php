<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Tasks\StoreTaskRequest;
use App\Http\Requests\Tasks\UpdateTaskRequest;
use App\Models\Board;
use App\Models\Project;
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
    public function index(Project $project, Board $board): JsonResponse
    {
        $tasks = $board->tasks()->get();
        return $this->jsonResponse(compact('tasks'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request, Project $project, Board $board): JsonResponse
    {
        /** @var Task $task */
        $task = $board->tasks()->create($request->except(['assignees', 'tags']));

        $data = $request->only('assignees', 'tags');
        if (!empty($data['assignees'])) {
            $task->assigneesPivot()->createMany($data['assignees']);
        }

        if (!empty($data['tags'])) {
            $task->tagsPivot()->createMany($data['tags']);
        }

        return $this->jsonResponse($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project, Board $board, Task $task): JsonResponse
    {
        return $this->jsonResponse($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Project $project, Board $board, Task $task): JsonResponse
    {
        /** @var Task $task */
        $task = $task->update($request->except(['assignees', 'tags']));

        // unassign tags, assginees...

        return $this->jsonResponse($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project, Board $board, Task $task): JsonResponse
    {
        $task->delete();
        // unassign tags, assginees...
        return $this->jsonResponse($task);
    }

    public function forceDelete(Project $project, Board $board, Task $task): JsonResponse
    {
        $task->forceDelete();
        // unassign tags, assginees...
        return $this->jsonResponse($task);
    }
}
