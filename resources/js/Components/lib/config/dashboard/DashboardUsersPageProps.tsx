import {PageProps, User} from "@/types";
import {DashboardPageProps, DashboardUsersData} from "@/types/dashboard-types";
import {Key, useCallback, useMemo} from "react";
import {createUser, deleteUser, editUser, fetchUsers,} from "@/Components/lib/api/dashboard/user";
import {useDashboardPage} from "@/Components/hooks/use-dashboard-page";

/**
 * Generate props for the DashboardUsersPage component.
 * @param auth - The authenticated user object.
 * @param users - The initial users data.
 * @returns Props for the DashboardPage component.
 */
export function generateDashboardUsersPageProps({
                                                    auth,
                                                    users,
                                                }: PageProps<DashboardUsersData>): DashboardPageProps<User> {
    const {
        selectedId,
        setSelectedId,
        displayedItems: displayedUsers,
        setDisplayedItems: setDisplayedUsers,
        selectedItem,
        hasMore,
        onLoadMore,
        loading,
        handleSelectionChange,
    } = useDashboardPage<User>({
        initialData: users.data,
        hasMoreInitial: users.has_more,
        fetchItems: fetchUsers,
    });

    // User table columns
    const userColumns = useMemo(
        () => [
            {key: "id", label: "ID"},
            {key: "name", label: "Name"},
            {key: "email", label: "Email"},
            {key: "actions", label: "Actions"},
        ],
        []
    );

    // Render cell logic
    const renderCell = useCallback(
        (user: User, columnKey: Key) => {
            switch (columnKey) {
                case "id":
                    return user.id;
                case "name":
                    return <div>{user.name}</div>;
                case "email":
                    return <div>{user.email}</div>;
                case "actions":
                    return (
                        <button
                            onClick={() => console.log(`View details for user ID: ${user.id}`)}
                        >
                            View
                        </button>
                    );
                default:
                    return null;
            }
        },
        []
    );

    // Text for forms and headers
    const text = {
        createTitle: "Create a New User",
        createSubtitle: "Add a new user entry.",
        editTitle: "Edit User",
        editSubtitle: "Modify the details of the selected user.",
    };

    // User create form
    const createForm = {
        schema: {
            fields: [
                {label: "Name", name: "name" as keyof User, type: "text", required: true},
                {label: "Email", name: "email" as keyof User, type: "email", required: true},
                {label: "Password", name: "password" as keyof User, type: "password", required: true},
            ],
        },
        initialValues: {} as Partial<User>,
        onSubmit: async (values: Partial<User>) => {
            try {
                const {user: newUser} = await createUser(values);
                setDisplayedUsers((prev) => [...prev, newUser]);
            } catch (error) {
                console.error("Error creating user:", error);
            }
        },
    };

    // User edit form
    const editForm = {
        schema: {
            fields: [
                {label: "Name", name: "name" as keyof User, type: "text", required: true},
                {label: "Email", name: "email" as keyof User, type: "email", required: true},
                {label: "Password", name: "password" as keyof User, type: "password"},
            ],
        },
        onSubmit: async (values: Partial<User>) => {
            if (!selectedId) return;

            try {
                const {data: updatedUser} = await editUser(selectedId, values);
                setDisplayedUsers((prev) =>
                    prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
                );
            } catch (error) {
                console.error("Error editing user:", error);
            }
        },
    };

    // User table
    const table = {
        columns: userColumns,
        data: displayedUsers,
        renderCell,
    };

    // User delete handler
    const onDeleteItem = async (item: User) => {
        try {
            await deleteUser(item.id);
            setDisplayedUsers((prev) => prev.filter((user) => user.id !== item.id));
            setSelectedId(null);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // User table props
    const tableProps = {
        selectedKeys: selectedId ? new Set([selectedId.toString()]) : new Set(),
        onSelectionChange: handleSelectionChange as any,
    };

    return {
        hasMore,
        selectedId, setSelectedId,
        auth,
        activeItem: "Users",
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
