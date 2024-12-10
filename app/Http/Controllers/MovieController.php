<?php

namespace App\Http\Controllers;

use App\Models\DisplayTime;
use App\Models\Movie;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MovieController extends Controller
{
    /**
     * Fetch movies with pagination.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $page = $request->query('page', 1);
        $itemsPerPage = $request->query('per_page', 20);

        $movies = Movie::select('id', 'name', 'description', 'image_link', 'category', 'label')
            ->skip(($page - 1) * $itemsPerPage)
            ->take($itemsPerPage)
            ->get();

        $totalMovies = Movie::count();
        $hasMore = $page * $itemsPerPage < $totalMovies;

        return response()->json([
            'movies' => $movies,
            'hasMore' => $hasMore,
        ]);
    }

    /**
     * Store a new movie.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'image_link' => 'required|url|max:255',
            'category' => 'required|string|max:255',
            'label' => 'required|string|max:255',
        ]);

        $movie = Movie::create($validated);

        return response()->json($movie, 201);
    }

    /**
     * Update an existing movie.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $movie = Movie::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:255',
            'image_link' => 'sometimes|url|max:255',
            'category' => 'sometimes|string|max:255',
            'label' => 'sometimes|string|max:255',
        ]);

        $movie->update($validated);

        return response()->json($movie);
    }

    /**
     * Delete a movie.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $movie = Movie::findOrFail($id);
        $movie->delete();

        return response()->json(['message' => 'Movie deleted successfully']);
    }

    /**
     * Display the specified movie along with its display times and reservations.
     *
     * @param int $id
     * @return Response
     */
    public function show(int $id): Response
    {
        // Fetch the movie or throw a 404 if not found
        $movie = Movie::findOrFail($id);

        // Fetch display times with their reservations using eager loading
        $displayTimes = DisplayTime::with('reservations')
            ->where('movie_id', $id)
            ->get();

        return Inertia::render('Movie', [
            'movie' => $movie,
            'display_times' => $displayTimes,
        ]);
    }
}
