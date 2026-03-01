<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Tasks\StoreTaskRequest;
use App\Http\Requests\Tasks\UpdateTaskRequest;
use App\Models\Board;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskTag;
use App\Models\TaskUser;
use Illuminate\Http\JsonResponse;

class TasksController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Project $project, Board $board): JsonResponse
    {
        $this->authorize('viewAny', [Task::class, $project, $board]);

        $tasks = $board->tasks()->get();
        return $this->jsonResponse(compact('tasks'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request, Project $project, Board $board): JsonResponse
    {
        $this->authorize('create', [Task::class, $project, $board]);

        /** @var Task $task */
        $task = $board->tasks()->create($request->except(['assignees', 'tags']));

        $data = $request->only('assignees', 'tags');
        if (!empty($data['assignees'])) {
            $assigneeIds = array_map(fn($id) => ['assignee_id' => $id], $data['assignees']);
            $task->assigneesPivot()->createMany($assigneeIds);
        }

        if (!empty($data['tags'])) {
            $tagIds = array_map(fn($id) => ['tag_id' => $id], $data['tags']);
            $task->tagsPivot()->createMany($tagIds);
        }

        return $this->jsonResponse($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project, Board $board, Task $task): JsonResponse
    {
        $this->authorize('view', [Task::class, $project, $board, $task]);

        $task = $task->toArray();
        $task['assignees'] = TaskUser::where('task_id', $task['id'])->pluck('user_id')->toArray();
        $task['tags'] = TaskTag::where('task_id', $task['id'])->pluck('tag_id')->toArray();

        return $this->jsonResponse($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Project $project, Board $board, Task $task): JsonResponse
    {
        $this->authorize('update', [Task::class, $project, $board, $task]);

        /** @var Task $task */
        $task->update($request->except(['assignees', 'tags']));

        $data = $request->only('assignees', 'tags');
        if (!empty($data['assignees'])) {
            $assigneeIds = array_map(fn($id) => ['user_id' => $id], $data['assignees']);
            $task->assigneesPivot()->createMany($assigneeIds);
        }

        if (!empty($data['tags'])) {
            $tagIds = array_map(fn($id) => ['tag_id' => $id], $data['tags']);
            $task->tagsPivot()->createMany($tagIds);
        }

        $task = $task->toArray();
        $task['assignees'] = TaskUser::where('task_id', $task['id'])->pluck('user_id')->toArray();
        $task['tags'] = TaskTag::where('task_id', $task['id'])->pluck('tag_id')->toArray();

        return $this->jsonResponse($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project, Board $board, Task $task): JsonResponse
    {
        $this->authorize('delete', [Task::class, $project, $board, $task]);

        $task->delete();
        // unassign tags, assginees...
        return $this->jsonResponse($task);
    }

    public function forceDelete(Project $project, Board $board, Task $task): JsonResponse
    {
        $this->authorize('forceDelete', [Task::class, $project, $board, $task]);

        $task->forceDelete();
        // unassign tags, assginees...
        return $this->jsonResponse($task);
    }
}
