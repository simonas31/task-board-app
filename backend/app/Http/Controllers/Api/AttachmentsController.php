<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Tasks\StoreAttachmentRequest;
use App\Http\Requests\Tasks\UpdateAttachmentRequest;
use App\Models\Attachment;
use App\Models\Task;
use Illuminate\Http\JsonResponse;

class AttachmentsController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Task $task): JsonResponse
    {
        $this->authorize('viewAny', [Attachment::class]);
        $comments = $task->comments()->get();
        return $this->jsonResponse(compact('comments'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttachmentRequest $request, Task $task): JsonResponse
    {
        $this->authorize('create', [Attachment::class]);

        $attachment = $task
            ->attachments()
            ->create($request->validated());

        return $this->jsonResponse($attachment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task, Attachment $attachment): JsonResponse
    {
        $this->authorize('view', [Attachment::class, $task, $attachment]);

        return $this->jsonResponse($attachment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttachmentRequest $request, Task $task, Attachment $attachment): JsonResponse
    {
        $this->authorize('view', [Attachment::class, $task, $attachment]);

        $attachment->update($request->validated());
        return $this->jsonResponse($attachment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task, Attachment $attachment): JsonResponse
    {
        $this->authorize('delete', [Attachment::class, $task, $attachment]);
        $attachment->delete();
        return $this->jsonResponse($attachment);
    }
}
