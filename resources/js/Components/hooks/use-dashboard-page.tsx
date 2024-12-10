import {useCallback, useMemo, useState} from "react";

interface UseDashboardPageProps<T extends { id: number }> {
    initialData: T[];
    hasMoreInitial: boolean;
    fetchItems: (page: number, pageSize: number) => Promise<{ data: T[]; hasMore: boolean }>;
    pageSize?: number; // Optional page size
}

/**
 * Custom hook for managing shared state and logic for dashboard pages.
 * @param initialData - The initial data to display.
 * @param hasMoreInitial - Whether there are more items to load.
 * @param fetchItems - A function to fetch more items.
 * @param pageSize - The number of items to fetch per page.
 * @returns The dashboard page state and functions.
 */
export function useDashboardPage<T extends { id: number }>({
                                                               initialData,
                                                               hasMoreInitial,
                                                               fetchItems,
                                                               pageSize = 20, // Default to 20
                                                           }: UseDashboardPageProps<T>) {
    // State to track the selected item
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [displayedItems, setDisplayedItems] = useState<T[]>(initialData);
    const [hasMore, setHasMore] = useState(hasMoreInitial);
    const [loading, setLoading] = useState(false);

    // Memoized selected item
    const selectedItem = useMemo(
        () => displayedItems.find((item) => item.id === selectedId) || null,
        [displayedItems, selectedId]
    );

    // Load more items
    const onLoadMore = useCallback(async () => {
        if (loading || !hasMore) return;

        try {
            setLoading(true);
            const nextPage = Math.ceil(displayedItems.length / pageSize) + 1;
            const response = await fetchItems(nextPage, pageSize);

            // Check for valid response structure
            if (!response?.data || !Array.isArray(response.data)) {
                console.error("Invalid response structure:", response);
                return;
            }

            setDisplayedItems((prev) => [
                ...prev.filter((item) => !response.data.some((newItem) => newItem.id === item.id)),
                ...response.data,
            ]);
            setHasMore(response.hasMore);
        } catch (error) {
            console.error("Error loading more items:", error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore, displayedItems, fetchItems, pageSize]);

    // Handle selection change
    const handleSelectionChange = useCallback((keys: Set<string>) => {
        const selectedIdStr = Array.from(keys)[0];
        if (!selectedIdStr) return;
        setSelectedId(parseInt(selectedIdStr, 10));
    }, []);

    return {
        selectedId,
        setSelectedId,
        displayedItems,
        setDisplayedItems,
        selectedItem,
        hasMore,
        onLoadMore,
        loading,
        handleSelectionChange,
    };
}
