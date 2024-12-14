# Dashboard Pages 📂

The `resources/js/Pages/Dashboard` folder contains components for the admin dashboard. These pages allow administrators to manage the application's key features, such as movies, users, reservations, and system settings.

---

## 📂 Folder Structure Overview

### 1. **`Api.tsx`**

-   Displays API-related information for the admin.
-   Includes the user API token and other details for interacting with the platform's API.

### 2. **`DisplayTimes.tsx`**

-   Manages movie showtimes.
-   Allows admins to view, add, edit, or delete display times for movies.

### 3. **`Movies.tsx`**

-   Provides an interface for managing movies in the system.
-   Admins can add new movies, update existing details, or remove movies from the platform.

### 4. **`Users.tsx`**

-   Manages user accounts.
-   Allows admins to view user details, update roles, or deactivate accounts.

### 5. **`Reservations.tsx`**

-   Displays and manages reservations made by users.
-   Admins can track bookings and manage reservation statuses.

### 6. **`Home.tsx`**

-   Serves as the main dashboard overview page.
-   Displays key metrics, summaries, and links to other dashboard features.

---

## 🛠️ How to Use

1. **Accessing Pages**:

    - Each page is linked to a route in the Laravel `routes/dashboard-api.php` or similar route files.
    - Example: `/dashboard/movies` loads the `Movies.tsx` page.

2. **Customizing Functionality**:

    - Update these files to add or modify features in the admin dashboard.

3. **Navigation**:
    - Use the admin sidebar or navigation components to switch between these pages seamlessly.

---

## 🌟 Summary of Dashboard Pages

| **File**           | **Purpose**                                    |
| ------------------ | ---------------------------------------------- |
| `Api.tsx`          | Manage API tokens and related information.     |
| `DisplayTimes.tsx` | Administer movie showtimes.                    |
| `Movies.tsx`       | Manage the movie collection.                   |
| `Users.tsx`        | View and manage user accounts.                 |
| `Reservations.tsx` | Track and manage user reservations.            |
| `Home.tsx`         | Dashboard overview with key metrics and links. |

---

## Best Practices

-   **Modular Design**: Keep the logic for each feature within its corresponding page to ensure maintainability.
-   **Reuse Components**: Use shared components for forms, tables, and modals to maintain consistency.
-   **Secure Access**: Ensure routes to these pages are protected with appropriate authentication and authorization middleware.

By structuring the dashboard pages in this organized way, the platform provides a robust and efficient admin interface.
