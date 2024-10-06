<?php

namespace App\Http\Controllers;

use App\Http\Requests\MovieStoreRequest;
use App\Http\Requests\MovieUpdateRequest;
use App\Http\Requests\ProjectionStoreRequest;
use App\Models\Movie;
use App\Models\Projection;
use App\Services\ProjectionService;
use Illuminate\Http\Request;

class ProjectionController extends Controller
{
    public function __construct(protected ProjectionService $projectionService)
    {
    }

    public function store(ProjectionStoreRequest $request)
    {
        $projection = $this->projectionService->createProjection($request->validated());
        return response()->json($projection);
    }

    public function destroy(Request $request, Projection $projection)
    {
        $this->projectionService->deleteProjection($projection);
        return back();
    }

    public function create()
    {
        //The same view can be used as for edit for easier maintainability
        return view('projections.edit');
    }

}
