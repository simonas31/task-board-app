<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Projects\StoreProjectRequest;
use App\Http\Requests\Projects\UpdateProjectRequest;
use App\Models\Board;
use App\Models\Project;
use App\Models\User;
use App\Services\DataAccessService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectsController extends ApiController
{
    public function __construct(
        protected DataAccessService $accessService
    ) {
        $this->authorizeResource(Project::class);
    }

    protected function resourceMethodsWithoutModels(): array
    {
        return [
            ...parent::resourceMethodsWithoutModels(),
            'sidebarProjects' => 'sidebarProjects',
            'projectAssignees' => 'projectAssignees'
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $projects = $this->accessService
            ->projectsQuery()
            ->with('boards')
            ->orderBy('id')
            ->simplePaginate()
            ->withQueryString();

        return $this->jsonResponse($projects);
    }

    /**
     * Projects list that belong to sidebar component
     * @return JsonResponse
     */
    public function sidebarProjects(): JsonResponse
    {
        $projects = $this->accessService
            ->projectsQuery()
            ->with('boards')
            ->orderBy('id')
            ->get();

        return $this->jsonResponse($projects);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $project = Project::create($request->except("boards.*"));
        $user->projects()->attach($project->id);

        $boardsData = $request->getBoards();
        if ($boardsData) {
            $project->boards()->createMany($boardsData);
        }

        return $this->jsonResponse($project, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project): JsonResponse
    {
        $project->load(['boards.tasks']);
        return $this->jsonResponse($project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project): JsonResponse
    {
        $project->update($request->validated());
        return $this->jsonResponse($project);
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
        $project->users()->detach();
        $project->delete();

        return $this->jsonResponse($project);
    }

    public function projectAssignees(Project $project): JsonResponse
    {
        $assignees = $project
            ->assignees()
            ->get()
            ->select(['id', 'full_name']);

        return $this->jsonResponse($assignees);
    }
}
