# API Folder 📂

The `resources/js/Components/lib/api` folder contains utility functions and modules to manage communication between the frontend and backend APIs of the CinemaNow platform. These files encapsulate the logic for making HTTP requests, ensuring consistency and reusability across the application.

---

## 📂 Purpose

The API folder serves as a centralized location for managing API interactions. Its primary goals are to:

-   **Abstract API Logic**: Encapsulate the details of API requests, making the code cleaner and easier to maintain.
-   **Ensure Consistency**: Standardize how API requests are made and handled across the app.
-   **Reusability**: Provide reusable methods for different features like user authentication, movie management, and reservations.

---

## 📂 Folder Structure

1. **`dashboard/`**

    - Contains API utilities specific to the admin dashboard.

    - **`displayTime.ts`**

        - Handles API calls for managing display times of movies.

    - **`reservation.ts`**

        - Manages reservation-related API requests within the dashboard.

    - **`movie.ts`**

        - Handles CRUD operations for movies in the dashboard.

    - **`user.ts`**
        - Manages user-related API requests in the admin dashboard.

2. **`auth.ts`**

    - Contains functions for handling user authentication, such as login, logout, and registration.

3. **`movie.ts`**

    - Manages API requests related to movie data on the public-facing side of the application.

4. **`reservation.ts`**
    - Handles reservation-related API calls for the user-facing part of the app.

---

## 🛠️ How It Fits Into the Project

1. **Centralized API Management**:

    - All API interactions are handled through dedicated modules, reducing redundancy and improving readability.

2. **Modular Design**:

    - Files are organized by functionality, making it easy to locate and update specific API logic.

3. **Scalability**:
    - New API endpoints can be added without impacting existing functionality by following the same structure.

---

## 🌟 Key Benefits

-   **Cleaner Codebase**:

    -   Encapsulating API logic keeps components focused on UI and reduces clutter.

-   **Reusability**:

    -   API methods are reusable across components, avoiding repetitive code.

-   **Error Handling**:
    -   Centralized API logic allows for consistent error handling and response processing.

---

The `api` folder plays a critical role in bridging the frontend and backend, ensuring smooth and reliable communication for features like authentication, movie management, and reservations.
