<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Models\Movie;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'movies' => Movie::all(),
    ]);
})->name('home');

// Private Routes (Protected)
Route::middleware('verified')->group(function () {
    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Movies Routes
    Route::get('/movies', function () {
        return Inertia::render('Movies', [
            'movies' => Movie::all(),
        ]);
    })->name('movies.index');
    Route::get('/movie/{id}', [MovieController::class, 'show'])->name('movies.show');

    // Reservations Routes
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
});

// Admin-Only Routes
Route::prefix('dashboard')->middleware(['verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'home'])->name('dashboard.home');
    Route::get('/movies', [DashboardController::class, 'movies'])->name('dashboard.movies');
    Route::get('/display-times', [DashboardController::class, 'displayTimes'])->name('dashboard.display_times');
    Route::get('/reservations', [DashboardController::class, 'reservations'])->name('dashboard.reservations');
    Route::get('/users', [DashboardController::class, 'users'])->name('dashboard.users');
    Route::get('/api', [DashboardController::class, 'api'])->name('dashboard.api');
});

// Additional Route Files
require __DIR__ . '/api.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/dashboard-api.php';
