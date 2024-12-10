<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Models\Movie;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home route
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'movies' => Movie::all(),
    ]);
});

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Movies route
Route::get('movies', function () {
    return Inertia::render('Movies', [
        'movies' => Movie::all(),
    ]);
});

// Movie route
Route::middleware('auth')->group(function () {
    Route::get('movie/{id}', [MovieController::class, 'show'])->name('movies.show');
});

// Reservation route
Route::middleware('auth')->group(function () {
    Route::get('/reservations', [ReservationController::class, 'index'])->name('reservations.index');
});


// Dashboard routes
Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'home'])->name('dashboard.home');
    Route::get('/movies', [DashboardController::class, 'movies'])->name('dashboard.movies');
    Route::get('/display-times', [DashboardController::class, 'displayTimes'])->name('dashboard.display_times');
    Route::get('/reservations', [DashboardController::class, 'reservations'])->name('dashboard.reservations');
    Route::get('/users', [DashboardController::class, 'users'])->name('dashboard.users');
    Route::get('/api', [DashboardController::class, 'api'])->name('dashboard.api');
});


require __DIR__ . '/api.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/dashboard-api.php';
