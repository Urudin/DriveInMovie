<?php

namespace App\Services;

use App\Models\Movie;
use Illuminate\Support\Facades\Storage;

class MovieService
{
    public function __construct()
    {
    }

    public function createMovie(array $data)
    {
        $imagePath = Storage::disk('shared')->putFile(uniqid(), request()->file('image'));
        unset($data['image']);
        $data['imagePath'] = $imagePath;
        return Movie::create($data);
    }

    public function deleteMovie(Movie $movie)
    {
        $movie->projections()->delete();
        return $movie->delete();
    }

    public function updateMovie(Movie $movie, array $data)
    {
        $movie->update(array_filter($data));
        $movie->refresh();
        return $movie;
    }

    public function getMovieList(?string $genre, ?string $ageResctriction)
    {
        $query = Movie::query();
        if ($genre) {
            $query->where('species', $genre);
        }
        if ($ageResctriction) {
            $query->where('status', $ageResctriction);
        }
        return $query->with('projections')->get();
    }
}
