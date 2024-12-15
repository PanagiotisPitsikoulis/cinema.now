# Admin API Documentation

This document provides details of the **Admin API** routes for managing **movies**, **display times**, **reservations**, and **users**. These routes are protected by `auth` and `verified` middleware, ensuring only authenticated and verified administrators can access them.

---

## Authentication

Include the `Authorization` header with a valid Bearer token in every request:

If authentication or verification fails:

-   **401 Unauthorized**: Token is missing or invalid.
-   **403 Forbidden**: User lacks necessary permissions.

---

## Base URL

All routes are prefixed with `/admin/api`.

Example: To retrieve paginated movies, use `/admin/api/movies`.

---

## Movies API

**Base URL:** `/admin/api/movies`

### Endpoints

1. **GET** `/`
   Retrieve a paginated list of movies.
   **Example Response**:

    ```json
    {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "title": "Inception",
                "genre": "Sci-Fi",
                "duration": "02:28:00",
                "created_at": "2024-12-10T12:00:00Z"
            }
        ],
        "total": 25,
        "per_page": 10
    }
    ```

2. **POST** `/`
   Create a new movie.
   **Example Payload**:

    ```json
    {
        "title": "Inception",
        "genre": "Sci-Fi",
        "duration": "02:28:00"
    }
    ```

    **Validation Rules**:

    - `title`: required, string, unique
    - `genre`: required, string
    - `duration`: required, formatted as `HH:MM:SS`

    **Example Response**:

    ```json
    {
        "message": "Movie created successfully.",
        "movie": {
            "id": 3,
            "title": "Inception",
            "genre": "Sci-Fi",
            "duration": "02:28:00"
        }
    }
    ```

3. **GET** `/{movie}`
   Retrieve details of a specific movie.
   **Example Response**:

    ```json
    {
        "id": 1,
        "title": "Inception",
        "genre": "Sci-Fi",
        "duration": "02:28:00",
        "created_at": "2024-12-10T12:00:00Z"
    }
    ```

4. **PUT** `/{movie}`
   Update an existing movie.
   **Example Payload**:

    ```json
    {
        "title": "Inception (Updated)",
        "genre": "Sci-Fi",
        "duration": "02:30:00"
    }
    ```

    **Example Response**:

    ```json
    {
        "message": "Movie updated successfully.",
        "movie": {
            "id": 1,
            "title": "Inception (Updated)",
            "genre": "Sci-Fi",
            "duration": "02:30:00"
        }
    }
    ```

5. **DELETE** `/{movie}`
   Delete a movie.
   **Example Response**:
    ```json
    {
        "message": "Movie deleted successfully."
    }
    ```

---

## Display Times API

**Base URL:** `/admin/api/display-times`

### Endpoints

1. **GET** `/`
   Retrieve paginated display times.
   **Example Response**:

    ```json
    {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "movie_id": 1,
                "room_id": 2,
                "time_start": "10:00:00",
                "time_end": "12:00:00"
            }
        ],
        "total": 5,
        "per_page": 10
    }
    ```

2. **POST** `/`
   Create a new display time.
   **Example Payload**:
    ```json
    {
        "movie_id": 1,
        "room_id": 2,
        "time_start": "10:00:00",
        "time_end": "12:00:00"
    }
    ```

---

## Reservations API

**Base URL:** `/admin/api/reservations`

### Endpoints

1. **GET** `/`
   Retrieve paginated reservations.
   **Example Response**:

    ```json
    {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "client_id": 3,
                "display_time_id": 5,
                "status": "confirmed"
            }
        ],
        "total": 15,
        "per_page": 10
    }
    ```

2. **POST** `/`
   Create a new reservation.
   **Example Payload**:
    ```json
    {
        "client_id": 3,
        "display_time_id": 5,
        "status": "confirmed"
    }
    ```

---

## Users API

**Base URL:** `/admin/api/users`

### Endpoints

1. **GET** `/`
   Retrieve paginated users.
   **Example Response**:

    ```json
    {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "name": "Alice Johnson",
                "email": "alice@example.com",
                "role": "admin"
            }
        ],
        "total": 50,
        "per_page": 10
    }
    ```

2. **POST** `/`
   Create a new user.
   **Example Payload**:
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "securePassword123",
        "role": "client"
    }
    ```

---

## Status Codes

-   **200 OK** - Request succeeded.
-   **201 Created** - Resource created successfully.
-   **400 Bad Request** - Invalid input data.
-   **401 Unauthorized** - Missing or invalid token.
-   **403 Forbidden** - Insufficient permissions.
-   **404 Not Found** - Resource not found.
-   **500 Internal Server Error** - Unexpected server issue.

---

## Notes

-   **Pagination**: All list endpoints support `?page=` and `?per_page=` query parameters.
-   **Filtering**:
    -   `GET /admin/api/users?role=client`: List all client users.
    -   `GET /admin/api/display-times?movie_id=1`: Display times for a specific movie.
