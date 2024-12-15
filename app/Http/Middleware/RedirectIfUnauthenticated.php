<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RedirectIfUnauthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // if (!Auth::check()) {
        //     // Log the redirection
        //     Log::info('Redirecting unauthenticated user.', [
        //         'path' => $request->path(),
        //         'ip' => $request->ip(),
        //         'url' => $request->fullUrl(),
        //         'redirect_to' => route(name: 'login'),
        //     ]);

        //     return redirect()->route('login');
        // }

        return $next($request);
    }
}
