import {createApiRequest} from "@/Components/utils/createApiRequest";
import axios from "axios";
import {User} from "@/types";

// Base URL for admin endpoints
const adminApiBase = "/admin/api";


/**
 * Fetches all users with pagination from the admin API.
 */
export const fetchUsers = createApiRequest(
    async function fetchUsers(
        page: number,
        perPage: number
    ): Promise<{ data: User[]; hasMore: boolean }> {
        const response = await axios.get(`${adminApiBase}/users`, {
            params: {page, data: perPage},
        });
        return response.data;
    },
    undefined, // No specific action on success
    undefined, // No specific action on error
    undefined, // No retries
    undefined, // No rethrow
    true // Hide toast
);


/**
 * Creates a new user using the admin API.
 */
export const createUser = createApiRequest(
    async function createUser(userData: Partial<User>): Promise<{ success: boolean; message: string; user: User }> {
        const response = await axios.post(`${adminApiBase}/users`, userData);
        return response.data;
    }
);

/**
 * Updates an existing user using the admin API.
 */
export const editUser = createApiRequest(
    async function editUser(userId: number, userData: Partial<User>): Promise<{
        success: boolean;
        message: string;
        data: User
    }> {
        const response = await axios.put(`${adminApiBase}/users/${userId}`, userData);
        return response.data;
    }
);

/**
 * Deletes a user by its ID using the admin API.
 */
export const deleteUser = createApiRequest(
    async function deleteUser(userId: number): Promise<{ success: boolean; message: string }> {
        const response = await axios.delete(`${adminApiBase}/users/${userId}`);
        return response.data;
    }
);
