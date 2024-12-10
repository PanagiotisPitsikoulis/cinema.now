<?php

namespace App\Http\Controllers;

use App\Models\DisplayTime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DisplayTimeController extends Controller
{
    /**
     * Fetch display times with their reservations using eager loading.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $page = $request->query('page', 1);
        $itemsPerPage = $request->query('per_page', 20);

        $displayTimes = DisplayTime::with('reservations')
            ->where('movie_id', 1)
            ->skip(($page - 1) * $itemsPerPage)
            ->take($itemsPerPage)
            ->get();

        $totalDisplayTimes = DisplayTime::count();
        $hasMore = $page * $itemsPerPage < $totalDisplayTimes;

        return response()->json([
            'display_times' => $displayTimes,
            'hasMore' => $hasMore,
        ]);
    }

    /**
     * Store a new display time.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'movie_id' => 'required|exists:movies,id',
            'time_start' => 'required|date_format:Y-m-d H:i:s',
            'time_end' => 'required|date_format:Y-m-d H:i:s',
        ]);

        $displayTime = DisplayTime::create($validated);

        return response()->json($displayTime, 201);
    }

    /**
     * Update an existing display time.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $displayTime = DisplayTime::findOrFail($id);

        $validated = $request->validate([
            'time_start' => 'sometimes|date_format:Y-m-d H:i:s',
            'time_end' => 'sometimes|date_format:Y-m-d H:i:s',
        ]);

        $displayTime->update($validated);

        return response()->json($displayTime);
    }

    /**
     * Delete a display time.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $displayTime = DisplayTime::findOrFail($id);
        $displayTime->delete();

        return response()->json(['message' => 'Display time deleted successfully']);
    }
}
