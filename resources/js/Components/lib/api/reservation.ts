import { createApiRequest } from "@/Components/utils/createApiRequest";
import { Movie } from "@/types/types";
import axios from "axios";
import { router } from "@inertiajs/react";

/**
 * Posts a reservation for a movie and selected display time and seat.
 * @param movie - The movie to reserve.
 * @param selectedDisplayTime - The selected display time.
 * @param selectedSeat - The selected seat.
 * @returns A promise resolving to the created reservation.
 */
export const handlePostReservation = createApiRequest(
    async function (
        movie: Movie,
        selectedDisplayTime: number,
        selectedSeat: string | null
    ) {
        const response = await axios.post("/api/reservations", {
            display_time_id: selectedDisplayTime,
            room_order: selectedSeat ? parseInt(selectedSeat, 10) : null,
            movie_id: movie.id,
        });

        return response.data;
    },
    (data) => {
        router.replace("/reservations");
    },
    undefined, // No specific action on error
    undefined, // No retries
    undefined, // No rethrow
    true // Hide toast
);

/**
 * Deletes a reservation by ID.
 * @param id - The ID of the reservation to delete.
 * @returns A promise resolving when the reservation is deleted.
 */
export const handleDeleteReservation = createApiRequest(
    async (id: number): Promise<void> => {
        await axios.delete(`/api/reservations/${id}`);
    },
    undefined, // No specific action on success
    undefined, // No specific action on error
    undefined, // No retries
    undefined, // No rethrow
    false // Show toast
);
