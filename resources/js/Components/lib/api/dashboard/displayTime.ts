import {createApiRequest} from "@/Components/utils/createApiRequest";
import {DisplayTime} from "@/types/types";
import axios from "axios";

// Base URL for admin endpoints
const adminApiBase = "/admin/api";

/**
 * Fetches all display times with pagination from the admin API.
 */
export const fetchDisplayTimes = createApiRequest(
    async function fetchDisplayTimes(
        page: number,
        perPage: number
    ): Promise<{ data: DisplayTime[]; hasMore: boolean }> {
        const response = await axios.get(`${adminApiBase}/display-times`, {
            params: {page, per_page: perPage},
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
 * Creates a new display time using the admin API.
 */
export const createDisplayTime = createApiRequest(
    async function createDisplayTime(displayTimeData: Partial<DisplayTime>): Promise<{
        success: boolean;
        message: string;
        data: DisplayTime
    }> {
        const response = await axios.post(`${adminApiBase}/display-times`, displayTimeData);
        return response.data;
    }
);

/**
 * Updates an existing display time using the admin API.
 */
export const editDisplayTime = createApiRequest(
    async function editDisplayTime(displayTimeId: number, displayTimeData: Partial<DisplayTime>): Promise<{
        success: boolean;
        message: string;
        data: DisplayTime
    }> {
        const response = await axios.put(`${adminApiBase}/display-times/${displayTimeId}`, displayTimeData);
        return response.data;
    }
);

/**
 * Deletes a display time by its ID using the admin API.
 */
export const deleteDisplayTime = createApiRequest(
    async function deleteDisplayTime(displayTimeId: number): Promise<{ success: boolean; message: string }> {
        const response = await axios.delete(`${adminApiBase}/display-times/${displayTimeId}`);
        return response.data;
    }
);
