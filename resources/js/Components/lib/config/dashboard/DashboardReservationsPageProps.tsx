import {PageProps} from "@/types";
import {DashboardPageProps, DashboardReservationsData} from "@/types/dashboard-types";
import {Key, useCallback, useMemo} from "react";
import {Reservation} from "@/types/types";
import {
    createReservation,
    deleteReservation,
    editReservation,
    fetchReservations
} from "@/Components/lib/api/dashboard/reservation";
import {useDashboardPage} from "@/Components/hooks/use-dashboard-page";

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

    // Reservation table columns
    const reservationColumns = useMemo(
        () => [
            {key: "id", label: "ID"},
            {key: "user_name", label: "User Name"},
            {key: "room_order", label: "Room Order"},
        ],
        []
    );

    // Render cell logic
    const renderCell = useCallback(
        (reservation: Reservation, columnKey: Key) => {
            switch (columnKey) {
                case "id":
                    return reservation.id;
                case "user_name":
                    return <div>{reservation.user_id}</div>;
                case "room_order":
                    return <div>{reservation.room_order}</div>;
                default:
                    return null;
            }
        },
        []
    );

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
                {label: "User Name", name: "user_name" as keyof Reservation, type: "text", required: true},
                {label: "Reserved Date", name: "room_order" as keyof Reservation, type: "date", required: true},
            ],
        },
        initialValues: {} as Partial<Reservation>,
        onSubmit: async (values: Partial<Reservation>) => {
            try {
                const {data: newReservation} = await createReservation(values);
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
                {label: "User Name", name: "user_name" as keyof Reservation, type: "text", required: true},
                {label: "Reserved Date", name: "room_order" as keyof Reservation, type: "date", required: true},
            ],
        },
        onSubmit: async (values: Partial<Reservation>) => {
            if (!selectedId) return;

            try {
                const {data: updatedReservation} = await editReservation(selectedId, values);
                setDisplayedReservations((prev) =>
                    prev.map((reservation) =>
                        reservation.id === updatedReservation.id ? updatedReservation : reservation
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
        pagination: {hasMore, loading, onLoadMore},
        tableProps,
    };
}
