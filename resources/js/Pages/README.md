# Pages 📂

The `resources/js/Pages` folder contains the main page components for the application. Each file or subfolder represents a distinct page or feature, defining the UI and logic for that specific section of the app.

---

## 📂 Folder Structure Overview

### 1. **`Welcome.tsx`**

-   Represents the home page of the application.
-   Displays introductory content and a summary of the platform's features.

### 2. **`Reservations.tsx`**

-   Handles the display and management of user reservations.
-   Allows users to view and manage their booking history.

### 3. **`Movies.tsx`**

-   Lists all available movies on the platform.
-   Provides filters, search options, and navigation to individual movie details.

### 4. **`Movie.tsx`**

-   Represents the details page for a single movie.
-   Displays information like description, genre, showtimes, and a booking interface.

### 5. **`Profile`**

-   A folder containing components and logic related to user profile management.
-   Allows users to view and update their personal information, such as name, email, and password.

### 6. **`Dashboard`**

-   A folder containing components for the admin dashboard.
-   Includes tools for managing movies, users, reservations, and system settings.

### 7. **`Auth`**

-   A folder containing authentication-related pages.
-   Includes pages for login, registration, password reset, and email verification.

### 8. **`Pages`**

-   The base directory for all application pages.
-   Ensures a structured and organized approach to managing the app's views.

---

## 🛠️ How to Use

1. **Routing**:

    - Each page is linked to a route defined in Laravel's `routes` files (e.g., `web.php` or `api.php`).
    - Example: `/movies` route loads `Movies.tsx`.

2. **Navigation**:

    - Use the `Inertia` library to navigate between pages seamlessly:
        ```tsx
        <Link href="/movies">Go to Movies</Link>
        ```

3. **Customization**:
    - Extend or modify these pages to add new features or update existing ones.

---

## 🌟 Summary of Pages

| **File/Folder**    | **Purpose**                                 |
| ------------------ | ------------------------------------------- |
| `Welcome.tsx`      | Home page with an overview of the platform. |
| `Reservations.tsx` | Manages user reservations and bookings.     |
| `Movies.tsx`       | Lists all available movies.                 |
| `Movie.tsx`        | Displays details for a specific movie.      |
| `Profile`          | User profile management.                    |
| `Dashboard`        | Admin dashboard for managing the system.    |
| `Auth`             | Authentication-related pages.               |

---

By organizing the `Pages` folder in this structured manner, the project maintains clarity and ensures easier scalability and maintenance.
