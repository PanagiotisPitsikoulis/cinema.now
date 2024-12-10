<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed Admin User
        $adminPassword = 'admin'; // Predefined password for the admin user

        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'email' => 'admin@gmail.com',
                'password' => bcrypt($adminPassword), // Hash the password
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $this->command->info("Admin user created:");
        $this->command->line("Email: admin@example.com");
        $this->command->line("Password: $adminPassword");

        // The Movie Database API configuration
        $baseUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US';
        $token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDgyMjNjYTg2YTcyNTVkN2VhNTgzMGEzOWEzMmU1NiIsIm5iZiI6MTczMjc2MDMyMS4xMDE2Njc0LCJzdWIiOiI2NzQ3ZDIyNjM3OWIwM2E5ZjFkMDUzMzkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.T95K_VKmtFZ07iK_4uOnDLJD89swbXIlyxbAvNs5gu8';

        $movieIds = [];
        $maxMovies = 900;
        $moviesInserted = 0;

        // Loop through pages of movies until we have 120 movies
        for ($page = 1; $moviesInserted < $maxMovies; $page++) {
            $response = Http::withHeaders([
                'Authorization' => "Bearer $token",
                'Content-Type' => 'application/json',
            ])->get("$baseUrl&page=$page");

            if ($response->failed()) {
                $this->command->error("Failed to fetch movies for page $page.");
                continue; // Skip to the next page
            }

            $movies = $response->json('results');

            if (empty($movies)) {
                $this->command->warn("No movies found on page $page.");
                break; // Stop fetching if no more movies are found
            }

            // Seed Movies for the current page, limiting to 120 movies in total
            foreach ($movies as $movie) {
                if ($moviesInserted >= $maxMovies) {
                    break 2; // Stop once we've inserted 120 movies
                }

                $movieIds[] = DB::table('movies')->insertGetId([
                    'name' => $movie['title'],
                    'description' => mb_substr(
                        preg_replace('/[^\P{C}\n]+/u', '', $movie['overview'] ?? 'No description available.'),
                        0,
                        255,
                        'UTF-8'
                    ),
                    'image_link' => 'https://image.tmdb.org/t/p/original' . $movie['poster_path'],
                    'category' => implode(', ', $movie['genre_ids']),
                    'label' => 'Popular',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $moviesInserted++;
            }

            $this->command->info("Movies from page $page added successfully.");
        }

        // Seed Display Times for the movies
        foreach ($movieIds as $movieId) {
            $usedTimes = [];

            for ($i = 0; $i < 3; $i++) {
                do {
                    $startTime = Carbon::createFromTime(rand(10, 20), rand(0, 59), 0)
                        ->addDays(rand(1, 7)); // Random time between 10:00 and 20:59 within the next 7 days
                } while (in_array($startTime->toTimeString(), $usedTimes));

                $usedTimes[] = $startTime->toTimeString();

                DB::table('display_times')->insert([
                    'movie_id' => $movieId,
                    'time_start' => $startTime->toTimeString(),
                    'time_end' => $startTime->copy()->addHours(2)->toTimeString(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        $this->command->info('Display times added successfully.');
    }
}
