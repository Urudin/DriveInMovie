<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $image = resource_path('AIMovieImages/' . $this->faker->numberBetween(1, 20) . '.jpg');
        $imagePath = uniqid() . '.jpg';
        Storage::disk('shared')->put($imagePath, file_get_contents($image));
        return [
            'title' => $this->faker->words(2, true),
            'description' => $this->faker->text(100),
            'ageRestriction' => $this->faker->randomElement([6, 12, 16, 18]),
            'language' => $this->faker->randomElement(['English', 'Hungarian', 'Spanish', 'French']),
            'imagePath' => $imagePath,
        ];
    }
}
