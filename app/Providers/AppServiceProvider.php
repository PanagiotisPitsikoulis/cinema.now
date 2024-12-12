<?php

namespace App\Providers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Apply these settings only in production
        if (App::environment('production')) {
            // Without this, JavaScript and CSS won't load properly in production
            Vite::prefetch(concurrency: 3);
            URL::forceScheme('https');
        }
    }
}
