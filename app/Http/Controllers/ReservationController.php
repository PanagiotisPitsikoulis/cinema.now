<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    /**
     * Display a listing of all reservations for the current user.
     *
     * @return Response
     */
    public function index(): Response
    {
        $reservations = $this->getUserReservations();

        return Inertia::render('Reservations', [
            'reservations' => $reservations,
        ]);
    }

    /**
     * Store a new reservation.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'display_time_id' => 'required|exists:display_times,id',
            'movie_id' => 'required|exists:movies,id',
            'room_order' => 'required|integer',
        ]);

        \Log::info('Validated Data:', $validated);

        try {
            Reservation::create([
                'display_time_id' => $validated['display_time_id'],
                'user_id' => Auth::id(),
                'status' => 'pending',
                'room_order' => $validated['room_order'],
                'movie_id' => $validated['movie_id'],
            ]);

            // Redirect with success message
            return redirect()->route('reservations.index')->with('success', 'Reservation created successfully.');
        } catch (Exception $e) {
            Log::error('Error creating reservation: ' . $e->getMessage());
            return back()->with('error', 'Failed to create reservation. Please try again.');
        }
    }

    /**
     * Show a single reservation by ID.
     *
     * @param int $id
     * @return Response|RedirectResponse
     */
    public function show(int $id)
    {
        try {
            $reservation = $this->findReservation($id);

            return Inertia::render('ReservationDetails', [
                'reservation' => $reservation,
            ]);
        } catch (Exception $e) {
            Log::error('Error fetching reservation: ' . $e->getMessage());
            return redirect()->route('reservations.index')->with('error', 'Reservation not found.');
        }
    }

    /**
     * Update a reservation.
     *
     * @param Request $request
     * @param int $id
     * @return RedirectResponse
     */
    public function update(Request $request, int $id): RedirectResponse
    {
        try {
            $reservation = $this->findReservation($id);

            $validated = $request->validate([
                'status' => 'required|string|in:pending,confirmed,cancelled',
            ]);

            $reservation->update($validated);

            return redirect()->route('reservations.index')->with('success', 'Reservation updated successfully.');
        } catch (Exception $e) {
            Log::error('Error updating reservation: ' . $e->getMessage());
            return back()->with('error', 'Failed to update reservation. Please try again.');
        }
    }

    /**
     * Delete a reservation.
     *
     * @param int $id
     * @return RedirectResponse
     */
    public function destroy(int $id): RedirectResponse
    {
        try {
            $reservation = $this->findReservation($id);
            $reservation->delete();

            return redirect()->route('reservations.index')->with('success', 'Reservation deleted successfully.');
        } catch (Exception $e) {
            Log::error('Error deleting reservation: ' . $e->getMessage());
            return back()->with('error', 'Failed to delete reservation. Please try again.');
        }
    }

    /**
     * Get all reservations for the authenticated user.
     *
     * @return Collection
     */
    private function getUserReservations()
    {
        return Reservation::with(['displayTime.movie'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Find a reservation by ID and ensure it belongs to the authenticated user.
     *
     * @param int $id
     * @return Reservation
     *
     * @throws ModelNotFoundException
     */
    private function findReservation(int $id)
    {
        return Reservation::with(['displayTime.movie'])
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();
    }

    /**
     * Validate the reservation request.
     *
     * @param Request $request
     * @return array
     */
    private function validateReservationRequest(Request $request): array
    {
        return $request->validate([
            'display_time_id' => 'required|exists:display_times,id',
            'room_order' => 'required|integer',
        ]);
    }
}
