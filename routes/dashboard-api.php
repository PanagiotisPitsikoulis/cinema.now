<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

// Admin API routes
Route::prefix('/admin/api')->middleware(['auth', 'verified'])->group(function () {
    // Movie CRUD
    Route::get('/movies', [DashboardController::class, 'getMovies'])->name('admin.movies.index'); // List paginated movies
    Route::post('/movies', [DashboardController::class, 'storeMovie'])->name('admin.movies.store'); // Create a movie
    Route::get('/movies/{movie}', [DashboardController::class, 'editMovie'])->name('admin.movies.show'); // Show movie details
    Route::put('/movies/{movie}', [DashboardController::class, 'updateMovie'])->name('admin.movies.update'); // Update a movie
    Route::delete('/movies/{movie}', [DashboardController::class, 'deleteMovie'])->name('admin.movies.destroy'); // Delete a movie

    // DisplayTime CRUD
    Route::get('/display-times', [DashboardController::class, 'getDisplayTimes'])->name('admin.display-times.index'); // List paginated display times
    Route::post('/display-times', [DashboardController::class, 'storeDisplayTime'])->name('admin.display-times.store'); // Create a display time
    Route::get('/display-times/{displayTime}', [DashboardController::class, 'editDisplayTime'])->name('admin.display-times.show'); // Show display time details
    Route::put('/display-times/{displayTime}', [DashboardController::class, 'updateDisplayTime'])->name('admin.display-times.update'); // Update a display time
    Route::delete('/display-times/{displayTime}', [DashboardController::class, 'deleteDisplayTime'])->name('admin.display-times.destroy'); // Delete a display time

    // Reservation CRUD
    Route::get('/reservations', [DashboardController::class, 'getReservations'])->name('admin.reservations.index'); // List paginated reservations
    Route::post('/reservations', [DashboardController::class, 'storeReservation'])->name('admin.reservations.store'); // Create a reservation
    Route::get('/reservations/{reservation}', [DashboardController::class, 'editReservation'])->name('admin.reservations.show'); // Show reservation details
    Route::put('/reservations/{reservation}', [DashboardController::class, 'updateReservation'])->name('admin.reservations.update'); // Update a reservation
    Route::delete('/reservations/{reservation}', [DashboardController::class, 'deleteReservation'])->name('admin.reservations.destroy'); // Delete a reservation

    // User CRUD
    Route::get('/users', [DashboardController::class, 'getUsers'])->name('admin.users.index'); // List paginated users
    Route::post('/users', [DashboardController::class, 'storeUser'])->name('admin.users.store'); // Create a user
    Route::get('/users/{user}', [DashboardController::class, 'editUser'])->name('admin.users.show'); // Show user details
    Route::put('/users/{user}', [DashboardController::class, 'updateUser'])->name('admin.users.update'); // Update a user
    Route::delete('/users/{user}', [DashboardController::class, 'deleteUser'])->name('admin.users.destroy'); // Delete a user
});
