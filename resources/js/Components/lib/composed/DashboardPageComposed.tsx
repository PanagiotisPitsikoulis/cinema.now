import React, {Dispatch, SetStateAction, useCallback, useMemo} from "react";
import {SidebarComposed} from "@/Components/lib/composed/SidebarComposed";
import {LandingText} from "@/Components/lib/ui/landing/LandingText";
import {Form} from "@/Components/lib/ui/form";
//@ts-ignore
import {Column, Table} from "@/Components/lib/ui/table";
import {Button, Spacer} from "@nextui-org/react";
import {ArrowRightIcon, TrashIcon} from "lucide-react";
import {PageProps, User} from "@/types";
import {generateSidebarConfig} from "@/Components/lib/config/dashboard/DashboardSidebarConfig";

export type FieldSchema<T> = {
    label: string;
    name: keyof T;
    type: string;
    required?: boolean;
};

export type FormSchema<T> = {
    fields: FieldSchema<T>[];
};

export type DashboardPageProps<T extends { id: number; name?: string }> = PageProps & {
    hasMore: boolean;
    selectedId: number | null;
    setSelectedId: Dispatch<SetStateAction<number | null>>;
    auth: { user: User };
    activeItem?: string;

    text: {
        createTitle: string;
        createSubtitle: string;
        editTitle?: string;
        editSubtitle?: string;
    };

    createForm: {
        schema: FormSchema<Partial<T>>;
        initialValues: Partial<T>;
        onSubmit: (values: Partial<T>) => Promise<void>;
    };

    editForm?: {
        schema: FormSchema<Partial<T>>;
        onSubmit: (values: Partial<T>) => Promise<void>;
    };

    table: {
        columns: Column[];
        data: T[];
        renderCell: (item: T, columnKey: keyof T | React.Key) => React.ReactNode;
    };

    pagination: {
        hasMore: boolean;
        loading: boolean;
        onLoadMore: () => Promise<void>;
    };

    onDeleteItem?: (item: T) => Promise<void>;
};

/**
 * Display a dashboard page with a sidebar, a header, and content area.
 * Fully customizable using props and classNames.
 * @param auth - The authenticated user object.
 * @param activeItem - The currently active item in the sidebar.
 * @param text - Text props for the sidebar.
 * @param createForm - Form props for the create form.
 * @param editForm - Form props for the edit form.
 * @param table - Table props for the table.
 * @param pagination - Pagination props for the pagination.
 * @param onDeleteItem - Callback function for when an item is deleted.
 * @param setSelectedId - Callback function to set the selected item ID.
 * @param selectedId - The currently selected item ID.
 * @param hasMore - Whether there are more items to load.
 * @returns JSX.Element
 */
export function DashboardPage<T extends { id: number; name?: string }>({
                                                                           auth,
                                                                           activeItem,
                                                                           text,
                                                                           createForm,
                                                                           editForm,
                                                                           table,
                                                                           hasMore,
                                                                           pagination,
                                                                           onDeleteItem,
                                                                           setSelectedId, selectedId

                                                                       }: DashboardPageProps<T>) {

    const selectedItem = useMemo(
        () => table.data.find((item) => item.id === selectedId) || null,
        [table.data, selectedId]
    );

    const handleSelectionChange = useCallback((keys: Set<string>) => {
        const selectedIdStr = Array.from(keys)[0];
        if (!selectedIdStr) return;
        setSelectedId(parseInt(selectedIdStr, 10));
    }, []);

    const handleDeleteSelected = async () => {
        if (!selectedItem || !onDeleteItem) return;
        await onDeleteItem(selectedItem);
        setSelectedId(null);
    };

    const sidebarProps = useMemo(
        () => generateSidebarConfig(auth.user, activeItem || "Dashboard"),
        [auth.user, activeItem]
    );

    return (
        <SidebarComposed {...sidebarProps}>
            <div className="p-4 lg:px-8">
                {/* Create Form Section */}
                <LandingText
                    classNames={{
                        title: "lg:max-w-[30rem]",
                        subtitle: "lg:max-w-[30rem]",
                        bottomContent: "w-full overflow-x-scroll max-md:w-[90vw]",
                    }}
                    orientation="left"
                    size="sm"
                    title={text.createTitle}
                    subtitle={text.createSubtitle}
                    bottomContent={
                        <Form
                            key={selectedItem?.id}
                            schema={createForm.schema as any}
                            initialValues={createForm.initialValues as any}
                            onSubmit={createForm.onSubmit}
                        />
                    }
                />
                <Spacer y={10}/>

                {/* Edit Form Section */}
                {selectedItem && editForm && (
                    <>
                        <LandingText
                            key={selectedItem.id}
                            classNames={{
                                title: "lg:max-w-[30rem]",
                                subtitle: "lg:max-w-[30rem]",
                                bottomContent: "w-full overflow-x-scroll max-md:w-[90vw]",
                            }}
                            orientation="left"
                            size="sm"
                            title={text.editTitle || "Edit Item"}
                            subtitle={text.editSubtitle || "Modify the details of the selected item below."}
                            bottomContent={
                                <Form
                                    schema={editForm.schema as any}
                                    initialValues={selectedItem as any}
                                    onSubmit={editForm.onSubmit}
                                />
                            }
                        />
                        <Spacer y={10}/>
                    </>
                )}

                {/* Delete Selected Item Section */}
                {selectedItem && onDeleteItem && (
                    <div
                        key={selectedItem.id}
                        className="flex justify-between items-center p-4 border bg-danger-50 dark:bg-content1 dark:border-content2 border-danger-100 rounded-xl"
                    >
                        <p className="text-base text-danger-800 dark:text-foreground-600">
                            Delete item: <strong>{selectedItem.name || "this item"}</strong>?
                        </p>
                        <Button
                            size="sm"
                            color="danger"
                            onPress={handleDeleteSelected}
                            isLoading={pagination.loading}
                            startContent={<TrashIcon className="size-4"/>}
                        >
                            Delete
                        </Button>
                    </div>
                )}
                <Spacer y={10}/>

                {/* Data Table */}
                <Table
                    disablePagination
                    disableSearch
                    columns={table.columns}
                    data={table.data}
                    renderCell={table.renderCell}
                    tableProps={{
                        className: "text-foreground-500",
                        selectionMode: "single",
                        color: "primary",
                        selectedKeys: selectedId ? new Set([selectedId.toString()]) : new Set(),
                        onSelectionChange: (selection: any) => {
                            handleSelectionChange(selection);
                            window.scrollTo(0, 0);
                        },
                    }}
                    tableTopContentProps={{
                        text: {search: "Search..."},
                    }}
                />

                {/* Load More Button */}
                {hasMore && <div className="flex justify-center my-5">
                    <Button
                        size="sm"
                        endContent={<ArrowRightIcon className="size-4"/>}
                        color="primary"
                        onPress={pagination.onLoadMore}
                        disabled={!pagination.hasMore || pagination.loading}
                        isLoading={pagination.loading}
                    >
                        Load More
                    </Button>
                </div>}
            </div>
        </SidebarComposed>
    );
}
