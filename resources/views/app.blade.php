<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'CINEMA.NOW') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Favicon and Icons -->
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('icons/favicon-16x16.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('icons/favicon-32x32.png') }}">
    <link rel="shortcut icon" href="{{ asset('icons/favicon.ico') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('icons/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('icons/android-chrome-192x192.png') }}">
    <link rel="icon" type="image/png" sizes="512x512" href="{{ asset('icons/android-chrome-512x512.png') }}">

    <!-- Microsoft Tiles -->
    <meta name="msapplication-square70x70logo" content="{{ asset('icons/mstile-70x70.png') }}">
    <meta name="msapplication-square144x144logo" content="{{ asset('icons/mstile-144x144.png') }}">
    <meta name="msapplication-square150x150logo" content="{{ asset('icons/mstile-150x150.png') }}">
    <meta name="msapplication-wide310x150logo" content="{{ asset('icons/mstile-310x150.png') }}">
    <meta name="msapplication-square310x310logo" content="{{ asset('icons/mstile-310x310.png') }}">

    <!-- Isotipo and Logo -->
    <link rel="icon" type="image/png" href="{{ asset('icons/isotipo.png') }}">
    <link rel="icon" type="image/svg+xml" href="{{ asset('icons/logo.svg') }}">

    <!-- Manifest for PWAs -->
    <link rel="manifest" href="{{ asset('manifest.json') }}">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>