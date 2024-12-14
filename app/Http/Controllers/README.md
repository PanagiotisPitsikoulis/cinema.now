# Laravel Controllers 📂

The `app/Http/Controllers` folder contains the core logic for handling incoming requests in a Laravel application. Controllers act as intermediaries between routes and models, processing user requests, interacting with data, and returning responses.

---

## 📂 Folder Structure Overview

### 1. **`Controller.php`**

-   **Purpose**: The base controller class that other controllers extend.
-   **Key Characteristics**:
    -   Provides shared functionality, such as middleware or helper methods, that can be used across multiple controllers.
-   **Example Use**:

    ```php
    namespace App\Http\Controllers;

    use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
    use Illuminate\Foundation\Bus\DispatchesJobs;
    use Illuminate\Routing\Controller as BaseController;

    class Controller extends BaseController
    {
        use AuthorizesRequests, DispatchesJobs;
    }
    ```

---

### 2. **`DashboardController.php`**

-   **Purpose**: Manages routes and logic for the admin dashboard.
-   **Key Characteristics**:
    -   Handles admin-only views and actions, such as managing movies, reservations, and users.
-   **Example Methods**:
    -   `home()`: Returns the main dashboard view.
    -   `movies()`: Displays a list of movies for admin management.
    -   `reservations()`: Shows reservation data for admin review.
-   **Example Use**:
    ```php
    public function home()
    {
        return view('dashboard.home');
    }
    ```

---

### 3. **`DisplayTimeController.php`**

-   **Purpose**: Manages display times for movies.
-   **Key Characteristics**:
    -   Allows admins to create, edit, and delete showtimes for movies.
-   **Example Methods**:
    -   `index()`: Displays all showtimes.
    -   `store()`: Adds a new showtime.
    -   `update()`: Updates an existing showtime.
    -   `destroy()`: Deletes a showtime.
-   **Example Use**:
    ```php
    public function index()
    {
        return view('display_times.index', [
            'displayTimes' => DisplayTime::all(),
        ]);
    }
    ```

---

### 4. **`MovieController.php`**

-   **Purpose**: Handles logic related to movies.
-   **Key Characteristics**:
    -   Serves both user-facing and admin-related functionality.
-   **Example Methods**:
    -   `index()`: Lists all available movies.
    -   `show($id)`: Displays details for a specific movie.
    -   `store()`: Adds a new movie (admin).
    -   `update($id)`: Updates movie details (admin).
    -   `destroy($id)`: Deletes a movie (admin).
-   **Example Use**:
    ```php
    public function show($id)
    {
        $movie = Movie::findOrFail($id);
        return view('movies.show', compact('movie'));
    }
    ```

---

### 5. **`ProfileController.php`**

-   **Purpose**: Manages user profile-related functionality.
-   **Key Characteristics**:
    -   Allows users to view, edit, and delete their profiles.
-   **Example Methods**:
    -   `edit()`: Displays the profile edit form.
    -   `update()`: Updates user profile details.
    -   `destroy()`: Deletes the user account.
-   **Example Use**:
    ```php
    public function update(Request $request)
    {
        $request->user()->update($request->all());
        return redirect()->route('profile.edit')->with('success', 'Profile updated.');
    }
    ```

---

### 6. **`ReservationController.php`**

-   **Purpose**: Handles booking and reservation logic.
-   **Key Characteristics**:
    -   Users can book tickets and view their reservations.
-   **Example Methods**:
    -   `index()`: Displays the user's reservations.
    -   `store()`: Creates a new reservation.
    -   `destroy($id)`: Cancels a reservation.
-   **Example Use**:
    ```php
    public function store(Request $request)
    {
        $reservation = Reservation::create($request->all());
        return redirect()->route('reservations.index')->with('success', 'Reservation made.');
    }
    ```

---

## 🛠️ Best Practices for Controllers

1. **Keep Controllers Thin**:

    - Controllers should focus on handling requests and delegating logic to services or models.
    - Avoid placing heavy business logic directly in controllers.

2. **Use Resource Controllers**:

    - For CRUD operations, use Laravel's resource controllers to simplify routes and controller methods.
        ```bash
        php artisan make:controller MovieController --resource
        ```

3. **Middleware**:

    - Protect sensitive routes using middleware like `auth` or `verified`.
        ```php
        public function __construct()
        {
            $this->middleware('auth');
        }
        ```

4. **Validation**:
    - Use `Request` classes to validate input data.
        ```php
        public function store(MovieRequest $request)
        {
            Movie::create($request->validated());
        }
        ```

---

## 🌟 Summary

Each controller in this folder serves a specific purpose in the application:

-   **`Controller.php`**: Base class for shared logic.
-   **`DashboardController.php`**: Admin dashboard management.
-   **`DisplayTimeController.php`**: Showtime management.
-   **`MovieController.php`**: Movie-related actions for users and admins.
-   **`ProfileController.php`**: User profile management.
-   **`ReservationController.php`**: Ticket booking and reservation handling.

By organizing your application's logic into these controllers, you maintain a clean and scalable codebase.
