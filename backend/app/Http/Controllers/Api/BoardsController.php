<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Boards\StoreBoardRequest;
use App\Http\Requests\Boards\UpdateBoardRequest;
use App\Models\Board;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BoardsController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Project $project): JsonResponse
    {
        $this->authorize('delete', [Board::class, $project]);

        // fetch user boards
        $user = $request->user();

        $boards = $project
            ->boards()
            ->get();

        return $this->jsonResponse(compact('boards'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBoardRequest $request): JsonResponse
    {
        $this->authorize('create', [Board::class]);
        $board = Board::create($request->validated());
        return $this->jsonResponse($board, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project, Board $board)
    {
        $this->authorize('view', [Board::class, $project, $board]);
        return $this->jsonResponse($board);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBoardRequest $request, Project $project, Board $board): JsonResponse
    {
        $this->authorize('update', [Board::class, $project, $board]);

        $board->update($request->validated());

        return $this->jsonResponse($board);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project, Board $board): JsonResponse
    {
        $this->authorize('delete', [Board::class, $project, $board]);

        $board->delete();

        return $this->jsonResponse($board);
    }
}
