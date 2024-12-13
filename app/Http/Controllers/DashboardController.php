<?php

namespace App\Http\Controllers;

use App\Models\DisplayTime;
use App\Models\Movie;
use App\Models\Reservation;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard pages
     */
    // Home page
    public function home(Request $request): Response
    {
        $movies = Movie::latest()->take(5)->get();

        return Inertia::render('Dashboard/Home', [
            'movies' => $movies,
        ]);
    }

    // Movies page
    public function movies(Request $request): Response
    {
        $page = $request->query('page', 1);
        $itemsPerPage = $request->query('per_page', 20);

        $movies = Movie::select('id', 'name', 'description', 'image_link', 'category', 'label')
            ->skip(($page - 1) * $itemsPerPage)
            ->take($itemsPerPage)
            ->get();

        $totalMovies = Movie::count();
        $hasMore = $page * $itemsPerPage < $totalMovies;

        return Inertia::render('Dashboard/Movies', [
            'movies' => [
                'data' => $movies,
                'current_page' => $page,
                'per_page' => $itemsPerPage,
                'has_more' => $hasMore,
            ],
        ]);
    }

    // DisplayTimes page
    public function displayTimes(Request $request): Response
    {
        $page = $request->query('page', 1);
        $itemsPerPage = $request->query('per_page', 20);

        $displayTimes = DisplayTime::with('movie')
            ->skip(($page - 1) * $itemsPerPage)
            ->take($itemsPerPage)
            ->get();

        $totalDisplayTimes = DisplayTime::count();
        $hasMore = $page * $itemsPerPage < $totalDisplayTimes;

        return Inertia::render('Dashboard/DisplayTimes', [
            'display_times' => [
                'data' => $displayTimes,
                'current_page' => $page,
                'per_page' => $itemsPerPage,
                'has_more' => $hasMore,
            ],
        ]);
    }

    // Reservations page
    public function reservations(Request $request): Response
    {
        $page = $request->query('page', 1);
        $itemsPerPage = $request->query('per_page', 20);

        $reservations = Reservation::with(['user', 'displayTime.movie'])
            ->skip(($page - 1) * $itemsPerPage)
            ->take($itemsPerPage)
            ->get();

        $totalReservations = Reservation::count();
        $hasMore = $page * $itemsPerPage < $totalReservations;

        return Inertia::render('Dashboard/Reservations', [
            'reservations' => [
                'data' => $reservations,
                'current_page' => $page,
                'per_page' => $itemsPerPage,
                'has_more' => $hasMore,
            ],
        ]);
    }

    // Users page
    public function users(Request $request): Response
    {
        $page = $request->query('page', 1);
        $itemsPerPage = $request->query('per_page', 20);

        $users = User::skip(($page - 1) * $itemsPerPage)
            ->take($itemsPerPage)
            ->get();

        $totalUsers = User::count();
        $hasMore = $page * $itemsPerPage < $totalUsers;

        return Inertia::render('Dashboard/Users', [
            'users' => [
                'data' => $users,
                'current_page' => $page,
                'per_page' => $itemsPerPage,
                'has_more' => $hasMore,
            ],
        ]);
    }

    // API page
    public function api(Request $request): Response
    {
        // Extract the Bearer token from the Authorization header
        $authHeader = $request->header('Authorization');
        $token = $authHeader ? str_replace('Bearer ', '', $authHeader) : null;

        return Inertia::render('Dashboard/Api', [
            'api_token' => $token,
            'user' => $request->user(),
        ]);
    }

    /**
     * Admin only API routes
     */

    // Get movies paginated
    public function getMovies(Request $request): JsonResponse
    {
        try {
            $page = $request->query('page', 1);
            $itemsPerPage = $request->query('per_page', 20);

            $movies = Movie::select('id', 'name', 'description', 'image_link', 'category', 'label')
                ->skip(($page - 1) * $itemsPerPage)
                ->take($itemsPerPage)
                ->get();

            $totalMovies = Movie::count();
            $hasMore = $page * $itemsPerPage < $totalMovies;

            return response()->json([
                'data' => $movies,
                'hasMore' => $hasMore,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching movies: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to fetch movies.'], 500);
        }
    }

    // Create a new movie
    public function storeMovie(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'image_link' => 'nullable|string',
                'category' => 'nullable|string|max:255',
                'label' => 'nullable|string|max:255',
            ]);

            $movie = Movie::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Movie created successfully.',
                'data' => $movie,
            ]);
        } catch (ValidationException $e) {
            Log::warning('Validation error during movie creation: ', $e->errors());
            return response()->json(['success' => false, 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('Error creating movie: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to create movie. Please try again.'], 500);
        }
    }

    // Update an existing movie
    public function updateMovie(Request $request, Movie $movie): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'image_link' => 'nullable|url',
                'category' => 'nullable|string|max:255',
            ]);

            $movie->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Movie updated successfully.',
                'data' => $movie,
            ]);
        } catch (ValidationException $e) {
            Log::warning('Validation error during movie update: ', $e->errors());
            return response()->json(['success' => false, 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('Error updating movie: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to update movie. Please try again.'], 500);
        }
    }

    // Delete a movie
    public function deleteMovie(Movie $movie): JsonResponse
    {
        try {
            $movie->delete();

            return response()->json([
                'success' => true,
                'message' => 'Movie deleted successfully.',
            ]);
        } catch (Exception $e) {
            Log::error('Error deleting movie: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to delete movie. Please try again.'], 500);
        }
    }

    // Get display times paginated
    public function getDisplayTimes(Request $request): JsonResponse
    {
        try {
            $page = $request->query('page', 1);
            $itemsPerPage = $request->query('per_page', 20);

            $displayTimes = DisplayTime::with('movie')
                ->skip(($page - 1) * $itemsPerPage)
                ->take($itemsPerPage)
                ->get();

            $totalDisplayTimes = DisplayTime::count();
            $hasMore = $page * $itemsPerPage < $totalDisplayTimes;

            return response()->json([
                'data' => $displayTimes,
                'hasMore' => $hasMore,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching display times: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to fetch display times.'], 500);
        }
    }

    // Create a new display time
    public function storeDisplayTime(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'movie_id' => 'required|exists:movies,id',
                'time_start' => 'required|date_format:H:i',
                'time_end' => 'required|date_format:H:i',
            ]);

            $displayTime = DisplayTime::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Display time created successfully.',
                'data' => $displayTime,
            ]);
        } catch (ValidationException $e) {
            Log::warning('Validation error during display time creation: ', $e->errors());
            return response()->json(['success' => false, 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('Error creating display time: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to create display time. Please try again.'], 500);
        }
    }

    // Delete a display time
    public function deleteDisplayTime(DisplayTime $displayTime): JsonResponse
    {
        try {
            $displayTime->delete();

            return response()->json([
                'success' => true,
                'message' => 'Display time deleted successfully.',
            ]);
        } catch (Exception $e) {
            Log::error('Error deleting display time: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to delete display time. Please try again.'], 500);
        }
    }

    // Get reservations paginated
    public function getReservations(Request $request): JsonResponse
    {
        try {
            $page = $request->query('page', 1);
            $itemsPerPage = $request->query('per_page', 20);

            $reservations = Reservation::with(['user', 'displayTime.movie'])
                ->skip(($page - 1) * $itemsPerPage)
                ->take($itemsPerPage)
                ->get();

            $totalReservations = Reservation::count();
            $hasMore = $page * $itemsPerPage < $totalReservations;

            return response()->json([
                'data' => $reservations,
                'hasMore' => $hasMore,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching reservations: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to fetch reservations.'], 500);
        }
    }

    // Create a new reservation
    public function storeReservation(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'display_time_id' => 'required|exists:display_times,id',
                'room_order' => 'required|integer',
                'movie_id' => 'required|exists:movies,id',
            ]);

            $reservation = Reservation::create([
                'display_time_id' => $validated['display_time_id'],
                'user_id' => Auth::id(),
                'status' => 'pending',
                'room_order' => $validated['room_order'],
                'movie_id' => $validated['movie_id'],
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Reservation created successfully.',
                'data' => $reservation,
            ]);
        } catch (ValidationException $e) {
            Log::warning('Validation error during reservation creation: ', $e->errors());
            return response()->json(['success' => false, 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('Error creating reservation: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to create reservation. Please try again.'], 500);
        }
    }

    // Update an existing reservation
    public function updateReservation(Request $request, Reservation $reservation): JsonResponse
    {
        try {
            $validated = $request->validate([
                'status' => 'required|string|in:pending,confirmed,cancelled',
            ]);

            $reservation->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Reservation updated successfully.',
                'data' => $reservation,
            ]);
        } catch (ValidationException $e) {
            Log::warning('Validation error during reservation update: ', $e->errors());
            return response()->json(['success' => false, 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('Error updating reservation: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to update reservation. Please try again.'], 500);
        }
    }

    // Delete a reservation
    public function deleteReservation(Reservation $reservation): JsonResponse
    {
        try {
            $reservation->delete();

            return response()->json([
                'success' => true,
                'message' => 'Reservation deleted successfully.',
            ]);
        } catch (Exception $e) {
            Log::error('Error deleting reservation: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to delete reservation. Please try again.'], 500);
        }
    }

    // Get users paginated
    public function getUsers(Request $request): JsonResponse
    {
        try {
            $page = $request->query('page', 1);
            $itemsPerPage = $request->query('per_page', 20);

            $users = User::select('id', 'name', 'email')
                ->skip(($page - 1) * $itemsPerPage)
                ->take($itemsPerPage)
                ->get();

            $totalUsers = User::count();
            $hasMore = $page * $itemsPerPage < $totalUsers;

            return response()->json([
                'data' => $users,
                'hasMore' => $hasMore,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching users: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to fetch users.'], 500);
        }
    }

    // Create a new user
    public function storeUser(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|confirmed|min:8',
            ]);

            $user = User::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'User created successfully.',
                'data' => $user,
            ]);
        } catch (ValidationException $e) {
            Log::warning('Validation error during user creation: ', $e->errors());
            return response()->json(['success' => false, 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('Error creating user: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to create user. Please try again.'], 500);
        }
    }

    // Update an existing user
    public function updateUser(Request $request, User $user): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
                'password' => 'sometimes|string|confirmed|min:8',
            ]);

            $user->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'User updated successfully.',
                'data' => $user,
            ]);
        } catch (ValidationException $e) {
            Log::warning('Validation error during user update: ', $e->errors());
            return response()->json(['success' => false, 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            Log::error('Error updating user: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to update user. Please try again.'], 500);
        }
    }

    // Delete a user
    public function deleteUser(User $user): JsonResponse
    {
        try {
            $user->delete();

            return response()->json([
                'success' => true,
                'message' => 'User deleted successfully.',
            ]);
        } catch (Exception $e) {
            Log::error('Error deleting user: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Failed to delete user. Please try again.'], 500);
        }
    }
}
