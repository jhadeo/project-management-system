<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\StoreRequest;
use App\Http\Requests\Project\UpdateRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        //TODO: get projects for authenticated user ONLY
        $projects = Project::all();

        return response()->json(['data' => ProjectResource::collection($projects)]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request): JsonResponse
    {
        //TODO: store projects for authenticated user ONLY
        $project = Project::create($request->validated());
        return response()->json([
            'message' => 'Project created successfully.',
            'data' => new ProjectResource($project),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        //TODO: check if project belongs to user      

        $proj = Project::findOrFail($id);
        
        return response()->json([
            'data' => new ProjectResource($proj),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, int $id): JsonResponse
    {
        //TODO: check if project belongs to user    

        $proj = Project::findorFail($id);

        $proj->update($request->validated());

        return response()->json([
            'message' => 'Project updated successfully.',
            'data' => new ProjectResource($proj),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        //TODO: check if project belongs to user

        $proj = Project::findorFail($id);

        $proj->deleteOrFail();

        return response()->json([
            'message' => 'Project delete successfully.',
        ]);
    }
}
