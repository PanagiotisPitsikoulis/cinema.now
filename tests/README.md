# Laravel Tests 📂

The `tests` folder in a Laravel application contains automated tests that verify the functionality and reliability of the application's features and logic. These tests ensure that new changes do not break existing functionality and help maintain a high-quality codebase.

---

## 📂 Folder Structure Overview

### 1. **`tests/Feature`**

-   **Purpose**: Contains feature tests that simulate user actions and test the application as a whole. These tests focus on the behavior of the application and ensure that different parts of the system work together correctly.
-   **Files**:
    -   **`Auth/AuthenticationTest.php`**:
        -   Verifies user login functionality.
        -   Tests scenarios such as successful login, incorrect credentials, and unauthenticated access redirection.
    -   **`Auth/EmailVerificationTest.php`**:
        -   Ensures email verification processes work as expected.
        -   Covers email link generation, email verification confirmation, and redirection for unverified users.
    -   **`Auth/PasswordConfirmationTest.php`**:
        -   Tests password confirmation for sensitive actions.
        -   Ensures correct handling of valid and invalid password submissions.
    -   **`Auth/PasswordResetTest.php`**:
        -   Verifies the password reset workflow.
        -   Tests request for a reset link, form validation, and updating the password with a valid token.
    -   **`Auth/PasswordUpdateTest.php`**:
        -   Checks password update functionality for authenticated users.
        -   Validates correct handling of mismatched passwords and successful updates.
    -   **`Auth/RegistrationTest.php`**:
        -   Tests the user registration process.
        -   Ensures new accounts are created successfully and email verification is handled correctly.
    -   **`ProfileTest.php`**:
        -   Verifies profile management functionality.
        -   Tests viewing, editing, and updating user profiles.
    -   **`ExampleTest.php`**:
        -   A sample feature test provided by Laravel to demonstrate how feature tests work.

---

### 2. **`tests/Unit`**

-   **Purpose**: Contains unit tests that focus on testing individual pieces of code, such as functions or methods, in isolation.
-   **Files**:
    -   **`ExampleTest.php`**:
        -   A sample unit test provided by Laravel to demonstrate how unit tests work.
        -   Tests isolated logic without relying on external systems.

---

### 3. **`tests/Pest.php`**

-   **Purpose**: Configures Pest, a testing framework used for writing simpler and expressive tests in Laravel.
-   **Details**:
    -   Defines shared configurations or functions for Pest tests.
    -   Used for creating clean and intuitive test syntax.

---

### 4. **`tests/TestCase.php`**

-   **Purpose**: The base class for all test cases in the application.
-   **Details**:
    -   Extends Laravel's `Illuminate\Foundation\Testing\TestCase`.
    -   Provides shared setup and teardown logic for tests.
    -   Includes utilities for simulating HTTP requests, database migrations, and more.

---

## 🛠️ Running Tests

1. **Run All Tests**:
    ```bash
    php artisan test
    Run Specific Test Files:
    ```
