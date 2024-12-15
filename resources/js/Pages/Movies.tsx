import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { Movie } from "@/types/types";
import React, { useState } from "react";
import { Grid, ItemGridProps } from "@/Components/lib/ui/Grid";
import { GridItem } from "@/Components/lib/ui/GridItem";
import { LandingSection } from "@/Components/lib/ui/landing/LandingSection";
import { Spacer } from "@nextui-org/react";
import { generateMoviesPageProps } from "@/Components/lib/config/MoviesPageProps";
import { handleFetchMoreMovies } from "@/Components/lib/api/movie";
import { Head } from "@inertiajs/react";

/**
 * Display a list of movies along with a featured carousel and a grid of movies.
 * @param auth - The authenticated user.
 * @param movies - The list of movies to display.
 * @returns JSX.Element
 */
export default function Movies({
    auth,
    movies,
}: PageProps<{ movies: Movie[] }>) {
    // Number of items to display per page
    const ITEMS_PER_PAGE = 20;
    // Currently displayed movies
    const [displayedMovies, setDisplayedMovies] = useState<Movie[]>(
        movies.slice(20, 20 + ITEMS_PER_PAGE)
    );
    // Whether there are more movies to load
    const [hasMore, setHasMore] = useState<boolean>(true);

    /**
     * Fetch and load more movies when triggered.
     */
    const loadMoreMovies = async () => {
        const currentPage =
            Math.ceil(displayedMovies.length / ITEMS_PER_PAGE) + 1;

        try {
            const { movies: newMovies, hasMore: moreAvailable } =
                await handleFetchMoreMovies(currentPage, ITEMS_PER_PAGE);

            setDisplayedMovies((prev) => [...prev, ...newMovies]);
            setHasMore(moreAvailable);
        } catch (error) {
            console.error("Error fetching more movies:", error);
        }
    };

    /**
     * Generate component props for the Movies page.
     */
    const { featuredSectionProps, gridProps } = generateMoviesPageProps(
        movies,
        displayedMovies,
        hasMore,
        loadMoreMovies
    );

    return (
        // Reusable layout component with Navbar and footer.
        <Layout>
            {/* Page Title */}
            <Head title="Choose from thousands of movies" />
            {/* Featured Movie Section */}
            <LandingSection {...featuredSectionProps} />
            {/* Spacer component, it is meant to add some spacing between sections */}
            <Spacer y={10} />
            {/* Movies Grid */}
            <Grid {...(gridProps as ItemGridProps<Movie>)}>
                {(data) => (
                    // Callback function that renders the GridItem component for each movie in the grid.
                    <GridItem
                        href={`/movie/${data.id}`}
                        header={{
                            title: data.name,
                            subtitle: data.category,
                        }}
                        image={data.image_link}
                        footer={{
                            appName: "Cinema Now",
                            description: data.description,
                            buttonLabel: "Book",
                        }}
                    />
                )}
            </Grid>
        </Layout>
    );
}
