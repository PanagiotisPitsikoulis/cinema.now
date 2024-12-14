# TypeScript Types 📂

The `resources/js/types` folder contains TypeScript definition files that define and manage types used throughout the application. These files ensure type safety, improve code readability, and provide better developer tooling (like autocompletion) in the project.

---

## 📂 Folder Structure Overview

### 1. **`dashboard-types.ts`**

-   Contains type definitions specific to the dashboard components and features.
-   Used for structuring data and props related to the dashboard UI.

### 2. **`global.d.ts`**

-   Defines global TypeScript types and interfaces.
-   Used to extend or modify global objects, such as adding custom properties to `Window` or `Document`.

### 3. **`index.d.ts`**

-   Serves as an entry point for consolidating and exporting types from other files.
-   Ensures consistent type imports across the application.

### 4. **`types.ts`**

-   Contains shared or commonly used type definitions across the application.
-   Includes utility types, reusable interfaces, and enums.

### 5. **`vite-env.d.ts`**

-   Defines environment variables and configurations used with Vite.
-   Helps manage types for `import.meta.env` and other Vite-specific utilities.

---

## 🛠️ How to Use

1. Import the necessary types into your components or utility functions:
    ```typescript
    import { SomeType } from "@/types/types";
    ```
