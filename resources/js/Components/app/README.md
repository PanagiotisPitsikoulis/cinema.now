# App-Specific Components 📂

The `resources/js/Components/app` folder contains components and utilities tailored specifically to the core functionality of the CinemaNow platform. These components are tightly integrated with the application's logic and provide key features like seat selection and theme management.

---

## 📂 Folder Structure

### Component Files

1. **`useSeatData.tsx`**

    - Custom hook for managing seat-related data.

2. **`ThemeProvider.tsx`**

    - Handles theming across the application (e.g., light/dark mode).

3. **`SeatSelector.tsx`**

    - Component for allowing users to select seats during the booking process.

4. **`SeatGroup.tsx`**

    - Manages and displays grouped seat arrangements.

5. **`Providers.tsx`**
    - Wraps the app with global providers for context and state management.

---

## 🛠️ How to Use

-   **Import Components**:
    Use these components wherever app-specific functionality is required:
    ```typescript
    import SeatSelector from "@/Components/app/SeatSelector";
    ```
