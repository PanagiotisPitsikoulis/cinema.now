# API Documentation

This document provides details about the **Reservation**, **Movie**, **Display Time**, and **User** API routes.

---

## Authentication

All routes are protected by the `auth:sanctum` middleware. Ensure you include a valid Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

If authentication or verification fails:

-   **401 Unauthorized**: Token is missing or invalid.
-   **403 Forbidden**: User lacks necessary permissions.

---

## Base URLs

Each resource has its respective base URL:

-   **Reservations**: `/api/reservations`
-   **Movies**: `/api/movies`
-   **Display Times**: `/api/display-times`
-   **Users**: `/api/users`

---

## Reservations API

### Endpoints

1. **GET** `/`  
   List all reservations.  
   **Example Response**:

    ```json
    [
        {
            "id": 1,
            "client_id": 1,
            "display_time_id": 5,
            "status": "confirmed",
            "created_at": "2024-12-01T12:00:00Z"
        }
    ]
    ```

2. **POST** `/`  
   Create a new reservation.  
   **Example Payload**:

    ```json
    {
        "client_id": 1,
        "display_time_id": 5,
        "status": "confirmed"
    }
    ```

3. **PUT** `/{id}`  
   Update a reservation.  
   **Example Payload**:

    ```json
    {
        "status": "cancelled"
    }
    ```

4. **DELETE** `/{id}`  
   Delete a reservation.  
   **Example Response**:
    ```json
    {
        "message": "Reservation deleted successfully."
    }
    ```

---

## Movies API

### Endpoints

1. **GET** `/`  
   List all movies.  
   **Example Response**:

    ```json
    [
        {
            "id": 1,
            "title": "Inception",
            "genre": "Sci-Fi",
            "duration": "02:28:00",
            "created_at": "2024-12-01T12:00:00Z"
        }
    ]
    ```

2. **POST** `/`  
   Create a movie.  
   **Example Payload**:

    ```json
    {
        "title": "Inception",
        "genre": "Sci-Fi",
        "duration": "02:28:00"
    }
    ```

3. **PUT** `/{id}`  
   Update a movie.  
   **Example Payload**:

    ```json
    {
        "title": "Inception (Updated)",
        "genre": "Action"
    }
    ```

4. **DELETE** `/{id}`  
   Delete a movie.  
   **Example Response**:
    ```json
    {
        "message": "Movie deleted successfully."
    }
    ```

---

## Display Times API

### Endpoints

1. **GET** `/`  
   List all display times.  
   **Example Response**:

    ```json
    [
        {
            "id": 1,
            "movie_id": 1,
            "room_id": 2,
            "time_start": "10:00:00",
            "time_end": "12:00:00"
        }
    ]
    ```

2. **POST** `/`  
   Create a display time.  
   **Example Payload**:

    ```json
    {
        "movie_id": 1,
        "room_id": 2,
        "time_start": "10:00:00",
        "time_end": "12:00:00"
    }
    ```

3. **PUT** `/{id}`  
   Update a display time.  
   **Example Payload**:

    ```json
    {
        "time_start": "11:00:00",
        "time_end": "13:00:00"
    }
    ```

4. **DELETE** `/{id}`  
   Delete a display time.  
   **Example Response**:
    ```json
    {
        "message": "Display time deleted successfully."
    }
    ```

---

## Users API

### Endpoints

1. **GET** `/`  
   List all users.  
   **Example Response**:

    ```json
    [
        {
            "id": 1,
            "name": "Alice Johnson",
            "email": "alice@example.com",
            "role": "client",
            "created_at": "2024-12-01T12:00:00Z"
        }
    ]
    ```

2. **POST** `/`  
   Create a user.  
   **Example Payload**:

    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "securePassword123",
        "role": "client"
    }
    ```

3. **PUT** `/{id}`  
   Update a user.  
   **Example Payload**:

    ```json
    {
        "name": "John Doe (Updated)"
    }
    ```

4. **DELETE** `/{id}`  
   Delete a user.  
   **Example Response**:
    ```json
    {
        "message": "User deleted successfully."
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

-   **IDs** in the endpoints refer to the primary keys of resources in the database.
-   Proper validation is applied to ensure data integrity.
-   Ensure all request payloads match the expected structure.
