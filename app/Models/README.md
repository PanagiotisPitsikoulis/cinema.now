# Laravel Models 📂

The `app/Models` folder contains the Eloquent models that represent and interact with the application's database tables. Each model is tied to a specific table and encapsulates the business logic for managing its data.

---

## 📂 Folder Structure Overview

### 1. **`DisplayTime.php`**

-   **Purpose**: Represents the showtimes for movies.
-   **Key Responsibilities**:
    -   Stores information about when movies are displayed (start time, end time).
    -   Links to the movie it belongs to.
-   **Relationships**:
    -   **Belongs to Movie**: Each showtime is associated with a specific movie.

---

### 2. **`Movie.php`**

-   **Purpose**: Represents the movies available in the platform.
-   **Key Responsibilities**:
    -   Contains information about movies, such as title, description, genre, and release date.
    -   Manages relationships with reservations and display times.
-   **Relationships**:
    -   **Has Many Display Times**: A movie can have multiple scheduled showtimes.
    -   **Has Many Reservations**: A movie can be reserved multiple times by users.

---

### 3. **`Reservation.php`**

-   **Purpose**: Represents a user's reservation for a movie showtime.
-   **Key Responsibilities**:
    -   Tracks which user reserved a specific showtime for a movie.
    -   Stores details such as the number of seats reserved.
-   **Relationships**:
    -   **Belongs to User**: Each reservation is associated with a specific user.
    -   **Belongs to Movie**: Each reservation is tied to a specific movie.
    -   **Belongs to Display Time**: Reservations are linked to a specific showtime.

---

### 4. **`User.php`**

-   **Purpose**: Represents the users of the application.
-   **Key Responsibilities**:
    -   Manages user data such as name, email, and password.
    -   Facilitates authentication and role-based access.
-   **Relationships**:
    -   **Has Many Reservations**: A user can make multiple reservations.

---

## 🛠️ How Models Work in Laravel

1. **Database Mapping**:
   Each model corresponds to a table in the database and provides a simple interface for interacting with it.

2. **Eloquent ORM**:
   Laravel's Eloquent ORM simplifies complex database operations by using intuitive syntax.

3. **Relationships**:
   Models define relationships that express how database tables are connected, such as one-to-many and many-to-many.

4. **Mass Assignment**:
   Fields that can be mass-assigned are specified in the `$fillable` property to prevent unauthorized modifications.

---

## 🌟 Summary of Models

| **Model**     | **Purpose**               | **Relationships**                             |
| ------------- | ------------------------- | --------------------------------------------- |
| `DisplayTime` | Manages movie showtimes   | Belongs to Movie                              |
| `Movie`       | Represents movies         | Has Many Display Times, Has Many Reservations |
| `Reservation` | Tracks user reservations  | Belongs to User, Movie, and Display Time      |
| `User`        | Represents platform users | Has Many Reservations                         |

---

## Best Practices

1. **Keep Models Focused**:
   Each model should manage a single database table and its associated business logic.

2. **Use Relationships**:
   Define relationships to simplify data fetching and linking related tables.

3. **Secure Data**:
   Use the `$fillable` or `$guarded` property to control which fields are safe for mass assignment.

4. **Leverage Scopes**:
   Use query scopes to encapsulate reusable query logic within the model.

---

By organizing the application's data interactions within these models, Laravel ensures clean, maintainable, and scalable code for managing complex database operations.
