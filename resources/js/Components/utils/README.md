# Utilities 📂

The `resources/js/Components/utils` folder contains utility functions that support various features of the application. These utilities are reusable, modular, and designed to simplify complex operations like API requests, error handling, and general-purpose tasks.

---

## 📂 Folder Structure Overview

### 1. **`createApiRequest.ts`**

-   Provides a utility for creating standardized API requests.
-   Includes features like custom error handling, retries, and optional toast notifications for success or failure messages.

### 2. **`error.ts`**

-   Contains error-handling utilities.
-   Helps manage application-level errors, format error messages, and ensure consistent error reporting throughout the app.

### 3. **`index.ts`**

-   Serves as the entry point for exporting all utilities from the `utils` folder.
-   Simplifies importing utilities by consolidating them into a single export file.

---

## 🛠️ How to Use

1. **Import Utilities**:

    - Use the `index.ts` file to import utilities seamlessly:
        ```typescript
        import { createApiRequest, handleError } from "@/Components/utils";
        ```

2. **API Requests**:

    - Use `createApiRequest` to make HTTP requests with consistent behavior across the application:
        ```typescript
        const fetchData = createApiRequest(async () => {
            const response = await axios.get("/api/data");
            return response.data;
        });
        ```

3. **Error Handling**:
    - Leverage `error.ts` for managing and displaying errors:
        ```typescript
        try {
            // some code
        } catch (error) {
            handleError(error);
        }
        ```

---

## 🌟 Summary of Utilities

| **File**              | **Purpose**                                   |
| --------------------- | --------------------------------------------- |
| `createApiRequest.ts` | Standardizes and simplifies API requests.     |
| `error.ts`            | Manages error handling and formatting.        |
| `index.ts`            | Exports utilities for easy and clean imports. |

---

## Best Practices

-   **Reusability**: Write utilities that are generic and reusable across multiple components or pages.
-   **Error Consistency**: Use `error.ts` to ensure consistent error handling throughout the application.
-   **Clean Imports**: Utilize `index.ts` for importing utilities to maintain a clean and organized codebase.

By maintaining a modular `utils` folder, the application ensures maintainability, scalability, and a streamlined developer experience.
