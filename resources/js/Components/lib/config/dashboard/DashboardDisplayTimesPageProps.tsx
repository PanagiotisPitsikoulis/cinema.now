import { PageProps } from "@/types";
import {
    DashboardDisplayTimesData,
    DashboardPageProps,
} from "@/types/dashboard-types";
import { Key, useCallback, useMemo } from "react";
import { DisplayTime } from "@/types/types";
import {
    createDisplayTime,
    deleteDisplayTime,
    editDisplayTime,
    fetchDisplayTimes,
} from "@/Components/lib/api/dashboard/displayTime";
import { useDashboardPage } from "@/Components/hooks/use-dashboard-page";

/**
 * Generate props for the DashboardDisplayTimesPage component.
 * @param auth - The authenticated user object.
 * @param displayTimes - The initial display times data.
 * @returns Props for the DashboardPage component.
 */
export function generateDashboardDisplayTimesPageProps({
    auth,
    display_times: displayTimes,
}: PageProps<DashboardDisplayTimesData>): DashboardPageProps<DisplayTime> {
    const {
        selectedId,
        setSelectedId,
        displayedItems: displayedDisplayTimes,
        setDisplayedItems: setDisplayedDisplayTimes,
        selectedItem,
        hasMore,
        onLoadMore,
        loading,
        handleSelectionChange,
    } = useDashboardPage<DisplayTime>({
        initialData: displayTimes.data,
        hasMoreInitial: displayTimes.has_more,
        fetchItems: fetchDisplayTimes,
    });

    // Table columns
    const displayTimeColumns = useMemo(
        () => [
            { key: "id", label: "ID" },
            { key: "start_time", label: "Start Time" },
            { key: "end_time", label: "End Time" },
        ],
        []
    );

    // Render cell logic
    const renderCell = useCallback(
        (displayTime: DisplayTime, columnKey: Key) => {
            switch (columnKey) {
                case "id":
                    return displayTime.id;
                case "start_time":
                    return <div>{displayTime.time_start}</div>;
                case "end_time":
                    return <div>{displayTime.time_end}</div>;
                default:
                    return null;
            }
        },
        []
    );

    // Props sections
    const text = {
        createTitle: "Create a New Display Time",
        createSubtitle: "Add a new display time entry.",
        editTitle: "Edit Display Time",
        editSubtitle: "Modify the details of the selected display time.",
    };

    const createForm = {
        schema: {
            fields: [
                {
                    label: "Start Time",
                    name: "time_start" as keyof DisplayTime,
                    type: "text",
                    required: true,
                },
                {
                    label: "End Time",
                    name: "time_end" as keyof DisplayTime,
                    type: "text",
                    required: true,
                },
            ],
        },
        initialValues: {} as Partial<DisplayTime>,
        onSubmit: async (values: Partial<DisplayTime>) => {
            try {
                const { data: newDisplayTime } = await createDisplayTime(
                    values
                );
                setDisplayedDisplayTimes((prev) => [...prev, newDisplayTime]);
            } catch (error) {
                console.error("Error creating display time:", error);
            }
        },
    };

    const editForm = {
        schema: {
            fields: [
                {
                    label: "Start Time",
                    name: "time_start" as keyof DisplayTime,
                    type: "text",
                    required: true,
                },
                {
                    label: "End Time",
                    name: "time_end" as keyof DisplayTime,
                    type: "text",
                    required: true,
                },
            ],
        },
        onSubmit: async (values: Partial<DisplayTime>) => {
            if (!selectedId) return;

            try {
                const { data: updatedDisplayTime } = await editDisplayTime(
                    selectedId,
                    values
                );
                setDisplayedDisplayTimes((prev) =>
                    prev.map((displayTime) =>
                        displayTime.id === updatedDisplayTime.id
                            ? updatedDisplayTime
                            : displayTime
                    )
                );
            } catch (error) {
                console.error("Error editing display time:", error);
            }
        },
    };

    const table = {
        columns: displayTimeColumns,
        data: displayedDisplayTimes,
        renderCell,
    };

    const onDeleteItem = async (item: DisplayTime) => {
        try {
            await deleteDisplayTime(item.id);
            setDisplayedDisplayTimes((prev) =>
                prev.filter((displayTime) => displayTime.id !== item.id)
            );
            setSelectedId(null);
        } catch (error) {
            console.error("Error deleting display time:", error);
        }
    };

    const tableProps = {
        selectedKeys: selectedId ? new Set([selectedId.toString()]) : new Set(),
        onSelectionChange: handleSelectionChange as any,
    };

    return {
        hasMore,
        selectedId,
        setSelectedId,
        auth,
        activeItem: "Display Times",
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
