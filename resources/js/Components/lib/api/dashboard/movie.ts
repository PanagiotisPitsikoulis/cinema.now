import { createApiRequest } from "@/Components/utils/createApiRequest";
import axios from "axios";
import { Movie } from "@/types/types";

// Base URL for admin endpoints
const adminApiBase = "/admin/api";

/**
 * Fetches all movies with pagination from the admin API.
 */
export const fetchMovies = createApiRequest(
    async function fetchMovies(
        page: number,
        perPage: number
    ): Promise<{ data: Movie[]; hasMore: boolean }> {
        const response = await axios.get(`${adminApiBase}/movies`, {
            params: { page, per_page: perPage },
        });
        return response.data;
    },
    undefined, // No specific action on success
    undefined, // No specific action on error
    undefined, // No retries
    undefined, // No rethrow
    true // Hide toast
);

/**
 * Creates a new movie using the admin API.
 */
export const createMovie = createApiRequest(async function createMovie(
    movieData: Partial<Movie>
): Promise<{
    success: boolean;
    message: string;
    data: Movie;
}> {
    const response = await axios.post(`${adminApiBase}/movies`, movieData);
    return response.data;
});

/**
 * Updates an existing movie using the admin API.
 */
export const editMovie = createApiRequest(async function editMovie(
    movieId: number,
    movieData: Partial<Movie>
): Promise<{
    success: boolean;
    message: string;
    data: Movie;
}> {
    const response = await axios.put(
        `${adminApiBase}/movies/${movieId}`,
        movieData
    );
    return response.data;
});

/**
 * Deletes a movie by its ID using the admin API.
 */
export const deleteMovie = createApiRequest(async function deleteMovie(
    movieId: number
): Promise<{ success: boolean; message: string }> {
    const response = await axios.delete(`${adminApiBase}/movies/${movieId}`);
    return response.data;
});
