<?php

namespace Database\Seeders;

use App\Models\Movie;
use App\Models\Projection;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $movies = Movie::factory()->count(10)->create();

        foreach($movies as $movie){
            Projection::factory()->for($movie)->count(rand(1, 5))->create(); //create 1-5 projection for each movie
        }
    }
}
