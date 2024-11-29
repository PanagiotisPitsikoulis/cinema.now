<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        // Fetch reservations for the current user
        $reservations = Reservation::with(['displayTime.movie'])
            ->where('user_id', $userId)
            ->get();

        return Inertia::render('Reservations', [
            'reservations' => $reservations,
        ]);
    }

    public function store(Request $request, $id)
    {
        try {
            Reservation::create([
                'display_time_id' => $request->input('display_time_id'),
                'user_id' => Auth::id(),
                'status' => 'pending',
                'room_order' => $request->input('room_order'),
            ]);
        } catch (\Exception $e) {
            \Log::error('Error creating reservation: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }

        return redirect()->back()->with('success', 'Reservation created successfully.');
    }


    public function destroy($id)
    {
        $reservation = Reservation::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $reservation->delete();

        return redirect()->back()->with('success', 'Reservation deleted successfully.');
    }
}
