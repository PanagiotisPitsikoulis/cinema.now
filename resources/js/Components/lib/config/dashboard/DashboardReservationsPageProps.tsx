import { PageProps } from "@/types";
import {
    DashboardPageProps,
    DashboardReservationsData,
} from "@/types/dashboard-types";
import { Key, useCallback, useMemo } from "react";
import { Reservation } from "@/types/types";
import {
    createReservation,
    deleteReservation,
    editReservation,
    fetchReservations,
} from "@/Components/lib/api/dashboard/reservation";
import { useDashboardPage } from "@/Components/hooks/use-dashboard-page";
import { Avatar, Chip } from "@nextui-org/react";
import { getStatusColor } from "../config";
import { getAvatarUrl } from "@/Components/utils";

/**
 * Generate props for the DashboardReservationsPage component.
 * @param auth - The authenticated user object.
 * @param reservations - The initial reservations data.
 * @returns Props for the DashboardPage component.
 */
export function generateDashboardReservationsPageProps({
    auth,
    reservations,
}: PageProps<DashboardReservationsData>): DashboardPageProps<Reservation> {
    const {
        selectedId,
        setSelectedId,
        displayedItems: displayedReservations,
        setDisplayedItems: setDisplayedReservations,
        selectedItem,
        hasMore,
        onLoadMore,
        loading,
        handleSelectionChange,
    } = useDashboardPage<Reservation>({
        initialData: reservations.data,
        hasMoreInitial: reservations.has_more,
        fetchItems: fetchReservations,
    });

    console.log(reservations);

    // Reservation table columns
    const reservationColumns = useMemo(
        () => [
            { key: "id", label: "ID" },
            { key: "user_name", label: "User Name" },
            { key: "room_order", label: "Room Order" },
            { key: "status", label: "Status" },
            { key: "movie_name", label: "Movie Name" },
            { key: "display_time", label: "Display Time" },
        ],
        []
    );

    // Render cell logic
    const renderCell = useCallback((reservation: any, columnKey: Key) => {
        switch (columnKey) {
            case "id":
                return reservation.id;
            case "user_name":
                return <div>{reservation.user?.name || "N/A"}</div>;
            case "room_order":
                return <div>{reservation.room_order}</div>;
            case "status":
                return (
                    <Chip
                        size={"sm"}
                        variant={"flat"}
                        className={`capitalize`}
                        color={getStatusColor(reservation.status)}
                    >
                        {reservation.status}
                    </Chip>
                );
            case "user":
                return reservation.user_id ? (
                    <Avatar
                        size="sm"
                        src={getAvatarUrl(reservation.user_id.toString())}
                        alt={`User ${reservation.user_id}`}
                    />
                ) : (
                    "N/A"
                );
            case "movie_name":
                return (
                    <div>{reservation.display_time?.movie?.name || "N/A"}</div>
                );
            case "display_time":
                return (
                    <div>
                        {reservation.display_time?.time_start} -{" "}
                        {reservation.display_time?.time_end}
                    </div>
                );
            default:
                return null;
        }
    }, []);

    // Props sections
    const text = {
        createTitle: "Create a New Reservation",
        createSubtitle: "Add a new reservation entry.",
        editTitle: "Edit Reservation",
        editSubtitle: "Modify the details of the selected reservation.",
    };

    // Reservation create form
    const createForm = {
        schema: {
            fields: [
                {
                    label: "Movie ID",
                    name: "movie_id" as keyof Reservation,
                    type: "text",
                    required: true,
                },
                {
                    label: "Room Order",
                    name: "room_order" as keyof Reservation,
                    type: "text",
                    required: true,
                },
                {
                    label: "Status",
                    name: "status" as keyof Reservation,
                    type: "text",
                    required: true,
                },
            ],
        },
        initialValues: {} as Partial<Reservation>,
        onSubmit: async (values: Partial<Reservation>) => {
            try {
                const { data: newReservation } = await createReservation(
                    values
                );
                setDisplayedReservations((prev) => [...prev, newReservation]);
            } catch (error) {
                console.error("Error creating reservation:", error);
            }
        },
    };

    // Reservation edit form
    const editForm = {
        schema: {
            fields: [
                {
                    label: "Room Order",
                    name: "room_order" as keyof Reservation,
                    type: "text",
                    required: true,
                },
                {
                    label: "Status",
                    name: "status" as keyof Reservation,
                    type: "text",
                    required: true,
                },
            ],
        },
        onSubmit: async (values: Partial<Reservation>) => {
            if (!selectedId) return;

            try {
                const { data: updatedReservation } = await editReservation(
                    selectedId,
                    values
                );
                setDisplayedReservations((prev) =>
                    prev.map((reservation) =>
                        reservation.id === updatedReservation.id
                            ? updatedReservation
                            : reservation
                    )
                );
            } catch (error) {
                console.error("Error editing reservation:", error);
            }
        },
    };

    // Reservation table
    const table = {
        columns: reservationColumns,
        data: displayedReservations,
        renderCell,
    };

    // Reservation delete handler
    const onDeleteItem = async (item: Reservation) => {
        try {
            await deleteReservation(item.id);
            setDisplayedReservations((prev) =>
                prev.filter((reservation) => reservation.id !== item.id)
            );
            setSelectedId(null);
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    };

    // Reservation table props
    const tableProps = {
        selectedKeys: selectedId ? new Set([selectedId.toString()]) : new Set(),
        onSelectionChange: handleSelectionChange as any,
    };

    return {
        hasMore,
        setSelectedId,
        selectedId,
        auth,
        activeItem: "Reservations",
        text,
        createForm,
        editForm,
        selectedItem,
        onDeleteItem,
        table,
        pagination: { hasMore, loading, onLoadMore },
        tableProps,
    };
}
