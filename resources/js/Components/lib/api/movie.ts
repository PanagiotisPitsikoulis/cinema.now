import axios from "axios";
import {Movie} from "@/types/types";
import {createApiRequest} from "@/Components/utils/createApiRequest";

/**
 * Fetches more movies based on the current page and items per page.
 * @param currentPage - The current page number.
 * @param itemsPerPage - The number of items to fetch per page.
 * @returns A promise resolving to the fetched movies and a boolean indicating if there are more movies to fetch.
 */
export const handleFetchMoreMovies = createApiRequest(
    async function fetchMoreMovies(
        currentPage: number,
        itemsPerPage: number
    ): Promise<{ movies: Movie[]; hasMore: boolean }> {
        const response = await axios.get("/api/movies", {
            params: {
                page: currentPage,
                per_page: itemsPerPage,
            },
        });

        return response.data;
    },
    undefined, // No specific action on success
    undefined, // No specific action on error
    undefined, // No retries
    undefined, // No rethrow
    true // Hide toast
);
