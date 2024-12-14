<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

// Routes for unauthenticated users
Route::middleware('guest')->group(function () {
    // Registration Routes
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register'); // Display the registration form

    Route::post('register', [RegisteredUserController::class, 'store']); // Handle registration form submission

    // Login Routes
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login'); // Display the login form

    Route::post('login', [AuthenticatedSessionController::class, 'store']); // Handle login form submission

    // Forgot Password Routes
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request'); // Display the password reset request form

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email'); // Handle password reset request submission

    // Password Reset Routes
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset'); // Display the password reset form

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store'); // Handle password reset form submission
});

// Routes for authenticated users
Route::middleware('auth')->group(function () {
    // Email Verification Routes
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice'); // Show a notification asking the user to verify their email

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1']) // Ensure the link is signed and limit the rate
        ->name('verification.verify'); // Handle email verification link

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1') // Limit how often verification emails can be resent
        ->name('verification.send'); // Resend email verification link

    // Password Confirmation Routes
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm'); // Display the password confirmation form

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']); // Handle password confirmation

    // Password Update Route
    Route::put('password', [PasswordController::class, 'update'])
        ->name('password.update'); // Handle password updates

    // Logout Route
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout'); // Log the user out and invalidate their session
});
