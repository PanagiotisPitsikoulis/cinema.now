import { useMemo } from "react";
import type { ExtendedDisplayTime, Reservation } from "@/types/types";

/**
 * A hook to generate seat data for the SeatSelector component.
 * @param display_times - The display times for the movie.
 * @param selectedDisplayTime - The selected display time.
 * @param movieId - The ID of the movie.
 * @returns An array of reservation data.
 */
function useSeatData(
    display_times: ExtendedDisplayTime[] | undefined,
    selectedDisplayTime: number | null,
    movieId: number
): Reservation[] {
    return useMemo(() => {
        if (!display_times || !selectedDisplayTime) return [];

        const currentDisplayTime = display_times.find(
            (dt) => dt.id === selectedDisplayTime
        );
        if (!currentDisplayTime) return [];

        const sortedReservations =
            currentDisplayTime.reservations
                ?.slice()
                ?.sort(
                    (a, b) =>
                        parseInt(a.room_order, 10) - parseInt(b.room_order, 10)
                ) || [];

        const usedReservations = new Set<string>();

        return Array.from({ length: 9 * 4 * 2 + 9 * 7 * 2 }, (_, i) => {
            const roomOrder = (i + 1).toString(); // Ensure this value is unique within its scope

            const existingReservation = sortedReservations.find(
                (reservation) =>
                    reservation.room_order === roomOrder &&
                    !usedReservations.has(reservation.room_order)
            );

            if (existingReservation) {
                usedReservations.add(existingReservation.room_order);
                return {
                    ...existingReservation,
                    id: parseInt(roomOrder, 10),
                    room_order: roomOrder,
                };
            }

            return {
                id: parseInt(roomOrder, 10),
                status: "empty",
                room_order: roomOrder,
                user_id: 0,
                movie_id: movieId,
                display_time_id: currentDisplayTime.id,
                created_at: "",
                updated_at: "",
            };
        });
    }, [display_times, selectedDisplayTime, movieId]);
}

export default useSeatData;
