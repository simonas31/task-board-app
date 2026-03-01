<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Tasks\StoreTaskRequest;
use App\Http\Requests\Tasks\UpdateTaskRequest;
use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class CommentsController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Task $task): JsonResponse
    {
        $this->authorize('viewAny', [Comment::class, $task]);
        $comments = $task->comments()->get();
        return $this->jsonResponse(compact('comments'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request, Task $task): JsonResponse
    {
        $this->authorize('create', [Comment::class, $task]);
        $comment = Comment::create($request->validated());
        return $this->jsonResponse($comment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task, Comment $comment): JsonResponse
    {
        $this->authorize('view', [Comment::class, $task, $comment]);
        return $this->jsonResponse($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task, Comment $comment): JsonResponse
    {
        $this->authorize('update', [Comment::class, $task, $comment]);
        $comment->update($request->validated());
        return $this->jsonResponse($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task, Comment $comment): JsonResponse
    {
        $this->authorize('delete', [Comment::class, $task, $comment]);
        $comment->delete();
        return $this->jsonResponse($comment);
    }
}
