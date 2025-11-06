<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Boards\StoreBoardRequest;
use App\Http\Requests\Boards\UpdateBoardRequest;
use App\Models\Board;
use Illuminate\Http\JsonResponse;

class BoardsController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        // fetch user boards
        return $this->jsonResponse([]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBoardRequest $request): JsonResponse
    {
        $board = Board::create($request->validated());
        return $this->jsonResponse(compact('board'), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Board $board)
    {
        return $this->jsonResponse(compact('board'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBoardRequest $request, Board $board): JsonResponse
    {
        $board->update($request->validated());

        return $this->jsonResponse(compact('board'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board): JsonResponse
    {
        $board->delete();

        return $this->jsonResponse(compact('board'));
    }
}
