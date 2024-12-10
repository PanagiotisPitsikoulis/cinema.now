<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DisplayTimeController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

// Reservation API Routes
Route::middleware('auth:sanctum')->prefix('api/reservations')->group(function () {
    Route::get('/', [ReservationController::class, 'index'])->name('api.reservations.index');
    Route::post('/', [ReservationController::class, 'store'])->name('api.reservations.store');
    Route::put('{id}', [ReservationController::class, 'update'])->name('api.reservations.update');
    Route::delete('{id}', [ReservationController::class, 'destroy'])->name('api.reservations.destroy');
});

// Movie API Routes
Route::middleware('auth:sanctum')->prefix('api/movies')->group(function () {
    Route::get('/', [MovieController::class, 'index'])->name('api.movies.index');
    Route::post('/', [MovieController::class, 'store'])->name('api.movies.store');
    Route::put('{id}', [MovieController::class, 'update'])->name('api.movies.update');
    Route::delete('{id}', [MovieController::class, 'destroy'])->name('api.movies.destroy');
});

// Display Time API Routes
Route::middleware('auth:sanctum')->prefix('api/display-times')->group(function () {
    Route::get('/', [DisplayTimeController::class, 'index'])->name('api.display-times.index');
    Route::post('/', [DisplayTimeController::class, 'store'])->name('api.display-times.store');
    Route::put('{id}', [DisplayTimeController::class, 'update'])->name('api.display-times.update');
    Route::delete('{id}', [DisplayTimeController::class, 'destroy'])->name('api.display-times.destroy');
});

// User API Routes
Route::middleware('auth:sanctum')->prefix('api/users')->group(function () {
    Route::get('/', [RegisteredUserController::class, 'index'])->name('api.users.index');
    Route::post('/', [RegisteredUserController::class, 'store'])->name('api.users.store');
    Route::put('{id}', [RegisteredUserController::class, 'update'])->name('api.users.update');
    Route::delete('{id}', [RegisteredUserController::class, 'destroy'])->name('api.users.destroy');
});
