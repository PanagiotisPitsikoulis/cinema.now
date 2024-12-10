import {createApiRequest} from "@/Components/utils/createApiRequest";
import {Reservation} from "@/types/types";
import axios from "axios";

// Base URL for admin endpoints
const adminApiBase = "/admin/api";


/**
 * Fetches all reservations with pagination from the admin API.
 */
export const fetchReservations = createApiRequest(
    async function fetchReservations(
        page: number,
        perPage: number
    ): Promise<{ data: Reservation[]; hasMore: boolean }> {
        const response = await axios.get(`${adminApiBase}/reservations`, {
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
 * Creates a new reservation using the admin API.
 */
export const createReservation = createApiRequest(
    async function createReservation(reservationData: Partial<Reservation>): Promise<{
        success: boolean;
        message: string;
        data: Reservation
    }> {
        const response = await axios.post(`${adminApiBase}/reservations`, reservationData);
        return response.data;
    }
);

/**
 * Updates an existing reservation using the admin API.
 */
export const editReservation = createApiRequest(
    async function editReservation(reservationId: number, reservationData: Partial<Reservation>): Promise<{
        success: boolean;
        message: string;
        data: Reservation
    }> {
        const response = await axios.put(`${adminApiBase}/reservations/${reservationId}`, reservationData);
        return response.data;
    }
);

/**
 * Deletes a reservation by its ID using the admin API.
 */
export const deleteReservation = createApiRequest(
    async function deleteReservation(reservationId: number): Promise<{ success: boolean; message: string }> {
        const response = await axios.delete(`${adminApiBase}/reservations/${reservationId}`);
        return response.data;
    }
);
