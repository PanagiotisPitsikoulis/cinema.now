# Laravel Routes Folder 📂

The `routes` folder in a Laravel application defines the entry points to your application. It contains route files that map incoming requests to the appropriate controllers, middleware, and actions. These routes enable the application to respond to user actions, API requests, and console commands effectively.

---

## 🛠️ Folder Structure Overview

### 1. **`routes/web.php`**

-   **Purpose**: Defines routes for the web interface of the application.
-   **Key Characteristics**:
    -   Uses the `web` middleware group, which includes session state, CSRF protection, and cookie encryption.
    -   Handles routes that render views or handle web-based interactions (e.g., user-facing pages).
-   **Examples**:
    -   User registration, login, and dashboard routes.
    -   Rendering pages like `home`, `movies`, or `profile`.

### 2. **`routes/dashboard-api.php`**

-   **Purpose**: Contains routes for the admin dashboard APIs.
-   **Key Characteristics**:
    -   Facilitates admin-specific functionalities such as managing movies, users, and reservations.
    -   Routes typically return JSON responses or handle AJAX requests.
-   **Examples**:
    -   API routes for managing movies or retrieving dashboard statistics.

### 3. **`routes/console.php`**

-   **Purpose**: Defines routes for custom Artisan console commands.
-   **Key Characteristics**:
    -   Handles CLI-based operations using Laravel's Artisan command-line tool.
    -   Includes closures for defining commands that execute background tasks or utility scripts.
-   **Examples**:
    -   Commands for database cleanup, cache clearing, or scheduled jobs.

### 4. **`routes/auth.php`**

-   **Purpose**: Contains routes related to authentication.
-   **Key Characteristics**:
    -   Manages user authentication workflows such as login, registration, password resets, and email verification.
    -   Works with Laravel's built-in authentication scaffolding.
-   **Examples**:
    -   Routes for logging in (`/login`), registering (`/register`), and password recovery (`/password/reset`).

### 5. **`routes/api.php`**

-   **Purpose**: Defines routes for the application's API endpoints.
-   **Key Characteristics**:
    -   Uses the `api` middleware group, which includes features like rate limiting.
    -   Returns JSON responses and is designed for client-to-server interactions (e.g., mobile apps or external integrations).
-   **Examples**:
    -   Fetching movies, user data, or handling external API requests.

---

## ⚙️ How Routing Works in Laravel

-   **Routing Basics**:
    Laravel's routes map specific URIs to controller methods or closures. Each route file focuses on a particular layer of the application (e.g., web, API, console).

-   **Middleware**:
    Middleware is used to process requests before they reach the route. Common examples include:

    -   `auth` for authentication.
    -   `verified` for email verification.
    -   `throttle` for rate limiting in API routes.

-   **Grouping and Prefixing**:
    Routes can be grouped and prefixed for better organization. For instance:
    ```php
    Route::prefix('dashboard')->middleware(['auth', 'verified'])->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');
    });
    ```
