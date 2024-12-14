# Config Folder 📂

The `resources/js/Components/lib/config` folder is responsible for organizing and managing configuration files that define page-specific and global settings. These configurations provide structured props and settings for various parts of the application, ensuring modularity and consistency.

---

## 📂 Purpose

The `config` folder serves as the backbone for handling configurations across the application. It provides:

-   **Page-Specific Configurations**: Supplies predefined props and settings for individual pages.
-   **Global Configurations**: Centralizes settings and constants used throughout the app.
-   **Maintainability**: Reduces redundancy by storing reusable configuration logic in one place.
-   **Consistency**: Ensures uniform data structures and props for different components and pages.

---

## 📂 Folder Structure

1. **`ReservationsPageProps.tsx`**

    - Contains configuration and props for the Reservations page.

2. **`WelcomePageProps.tsx`**

    - Provides structured settings for the Welcome page.

3. **`MoviesPageProps.tsx`**

    - Manages props and configurations for the Movies listing page.

4. **`MoviePageProps.tsx`**

    - Supplies specific props for individual movie detail pages.

5. **`config.ts`**

    - Stores global configuration variables or constants used across the app.

6. **`dashboard/`**
    - Houses configurations specifically related to the admin dashboard.

---

## 🛠️ How It Fits Into the Project

1. **Streamlined Props Management**:

    - Centralizes the logic for props generation, reducing complexity in page components.

2. **Scalability**:

    - Simplifies the addition of new pages or features by providing a structured way to manage configurations.

3. **Separation of Concerns**:
    - Keeps configuration logic separate from components, enhancing readability and maintainability.

---

## 🌟 Key Benefits

-   **Modularity**: Configurations are organized by purpose and functionality, making them easy to locate and update.
-   **Consistency**: Ensures that similar pages or components share a uniform structure for props and settings.
-   **Efficiency**: Reduces duplication of logic, enabling faster development and easier debugging.

---

The `config` folder is integral to maintaining a well-organized, scalable, and consistent structure for handling page-specific and global settings in the CinemaNow application.
