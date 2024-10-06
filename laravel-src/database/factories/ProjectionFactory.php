<?php

namespace Database\Factories;

use App\Models\Movie;
use App\Models\Pet;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pet>
 */
class ProjectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'movie_id' => Movie::query()->inRandomOrder()->firstOrFail()?->id,
            'seats' => $this->faker->randomElement([50, 100, 300]),
            'when' => Carbon::now()->startOfDay()->addDays(rand(0, 14))->addHours(rand(8, 22)), //A movie in the next 2 weeks sometimes between 8 am and 22 pm
        ];
    }
}
