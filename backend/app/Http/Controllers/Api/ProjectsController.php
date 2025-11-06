<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Projects\StoreProjectRequest;
use App\Http\Requests\Projects\UpdateProjectRequest;
use App\Models\Board;
use App\Models\Project;
use Illuminate\Http\JsonResponse;

class ProjectsController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $projects = Project::with('boards');
        return $this->jsonResponse(compact('projects'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        $project = Project::create($request->validated());
        return $this->jsonResponse(compact('project'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project): JsonResponse
    {
        return $this->jsonResponse(compact('project'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project): JsonResponse
    {
        $project->update($request->validated());
        return $this->jsonResponse(compact('project'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project): JsonResponse
    {
        $boards = $project
            ->boards()
            ->with('tasks')
            ->get();

        /** @var Board $board */
        foreach ($project->boards as $board) {
            $board->tasks->each(function ($task) {
                $task->forceDelete();
            });
            $board->delete();
        }
        $project->delete();

        return $this->jsonResponse(compact('project'));
    }
}
