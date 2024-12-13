import axios from "axios";
import { createApiRequest } from "@/Components/utils/createApiRequest";
import { router } from "@inertiajs/react";

/**
 * Handles user logout by sending a POST request to the logout endpoint.
 * @returns A promise resolving to a success message or void.
 */
export const handleLogout = createApiRequest(
    async function logout(): Promise<void> {
        await axios.post("/logout", {});
    },
    function onSuccess() {
        // Redirect to home page after successful logout
        router.replace("/");
    },
    function onError(error) {
        // Log the error or show a toast notification
        console.error("Logout failed:", error);
    },
    undefined, // No retries
    undefined, // No rethrow
    true // Hide toast
);
