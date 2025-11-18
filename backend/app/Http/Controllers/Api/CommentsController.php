<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Tasks\StoreTaskRequest;
use App\Http\Requests\Tasks\UpdateTaskRequest;
use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class CommentsController extends ApiController
{
    public function __construct()
    {
        $this->authorizeResource(Comment::class);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Task $task): JsonResponse
    {
        $comments = $task->comments()->get();
        return $this->jsonResponse(compact('comments'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request, Task $task): JsonResponse
    {
        $comment = Comment::create($request->validated());
        return $this->jsonResponse($comment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task, Comment $comment): JsonResponse
    {
        return $this->jsonResponse($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task, Comment $comment): JsonResponse
    {
        $comment->update($request->validated());
        return $this->jsonResponse($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task, Comment $comment): JsonResponse
    {
        $comment->delete();
        return $this->jsonResponse($comment);
    }
}
