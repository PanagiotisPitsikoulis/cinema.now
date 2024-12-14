import { PageProps } from "@/types";
import {
    DashboardMoviesData,
    DashboardPageProps,
} from "@/types/dashboard-types";
import { Key, useCallback, useMemo } from "react";
import { Movie } from "@/types/types";
import {
    createMovie,
    deleteMovie,
    editMovie,
    fetchMovies,
} from "@/Components/lib/api/dashboard/movie";
import { Button } from "@nextui-org/react";
import { Link } from "@inertiajs/react";
import { useDashboardPage } from "@/Components/hooks/use-dashboard-page";

/**
 * Generate props for the DashboardMoviesPage component.
 */
export function generateDashboardMoviesPageProps({
    auth,
    movies,
}: PageProps<DashboardMoviesData>): DashboardPageProps<Movie> {
    const {
        selectedId,
        setSelectedId,
        displayedItems: displayedMovies,
        setDisplayedItems,
        selectedItem,
        hasMore,
        onLoadMore,
        loading,
        handleSelectionChange,
    } = useDashboardPage<Movie>({
        initialData: movies.data,
        hasMoreInitial: movies.has_more,
        fetchItems: fetchMovies,
    });

    // Movie table columns
    const movieColumns = useMemo(
        () => [
            { key: "id", label: "ID" },
            { key: "name", label: "Name" },
            { key: "description", label: "Description" },
            { key: "actions", label: "Actions" },
        ],
        []
    );

    // Render cell logic
    const renderCell = useCallback((movie: Movie, columnKey: Key) => {
        switch (columnKey) {
            case "id":
                return movie.id;
            case "name":
                return <div>{movie.name}</div>;
            case "description":
                return <p>{movie.description}</p>;
            case "actions":
                return (
                    <Button size="sm" href={`/movie/${movie.id}`} as={Link}>
                        View
                    </Button>
                );
            default:
                return null;
        }
    }, []);

    // Props sections
    const text = {
        createTitle: "Create a New Movie",
        createSubtitle: "Add a new movie to the collection.",
        editTitle: "Edit Movie",
        editSubtitle: "Modify the details of the selected movie.",
    };

    const createForm = {
        schema: {
            fields: [
                {
                    label: "Name",
                    name: "name" as keyof Movie,
                    type: "text",
                    required: true,
                },
                {
                    label: "Description",
                    name: "description" as keyof Movie,
                    type: "textarea",
                },
                {
                    label: "Image Link",
                    name: "image_link" as keyof Movie,
                    type: "text",
                },
                {
                    label: "Category",
                    name: "category" as keyof Movie,
                    type: "text",
                },
                { label: "Label", name: "label" as keyof Movie, type: "text" },
            ],
        },
        initialValues: {
            category: "",
            label: "",
            image_link: "",
            description: "",
            name: "",
        },
        onSubmit: async (values: Partial<Movie>) => {
            const { data: newMovie } = await createMovie(values);
            newMovie && setDisplayedItems((prev) => [...prev, newMovie]);
        },
    };

    const editForm = {
        schema: {
            fields: [
                {
                    label: "Name",
                    name: "name" as keyof Movie,
                    type: "text",
                    required: true,
                },
                {
                    label: "Description",
                    name: "description" as keyof Movie,
                    type: "textarea",
                },
                {
                    label: "Image Link",
                    name: "image_link" as keyof Movie,
                    type: "text",
                },
            ],
        },
        onSubmit: async (values: Partial<Movie>) => {
            if (!selectedId) return;
            const { data: updatedMovie } = await editMovie(selectedId, values);
            setDisplayedItems((prev) =>
                prev.map((movie) =>
                    movie.id === updatedMovie.id ? updatedMovie : movie
                )
            );
        },
    };

    const table = {
        columns: movieColumns,
        data: displayedMovies,
        renderCell,
    };

    const pagination = {
        hasMore,
        loading,
        onLoadMore,
    };

    const onDeleteItem = async (item: Movie) => {
        try {
            await deleteMovie(item.id);
            setDisplayedItems((prev) =>
                prev.filter((movie) => movie.id !== item.id)
            );
            setSelectedId(null);
        } catch (error) {
            console.error("Error deleting movie:", error);
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
        activeItem: "Movies",
        text,
        createForm,
        editForm,
        selectedItem,
        onDeleteItem,
        table,
        pagination,
        tableProps,
    };
}
