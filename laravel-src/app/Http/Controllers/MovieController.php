<?php

namespace App\Http\Controllers;

use App\Http\Requests\MovieStoreRequest;
use App\Http\Requests\MovieUpdateRequest;
use App\Models\Movie;
use App\Services\MovieService;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function __construct(protected MovieService $movieService)
    {
    }

    public function show(Request $request, Movie $movie)
    {
        $movie->load('projections');
        return response()->json($movie);
    }

    public function index(Request $request)
    {
        $movies = $this->movieService->getMovieList($request->get('genre'), $request->get('AgeRestriction'));
        return response()->json($movies);
    }

    public function store(MovieStoreRequest $request)
    {
        $movie = $this->movieService->createMovie($request->validated());
        return response()->json($movie);
    }

    public function update(MovieUpdateRequest $request, Movie $movie)
    {
        $movie = $this->movieService->updateMovie($movie, $request->validated());
        return response()->json($movie);
    }

    public function destroy(Request $request, Movie $movie)
    {
        $this->movieService->deleteMovie($movie);
        return back();
    }
}
