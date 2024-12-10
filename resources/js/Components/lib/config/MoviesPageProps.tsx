import {Movie} from "@/types/types";
import {LandingSectionProps} from "@/Components/lib/ui/landing/LandingSection";
import {FeaturedCarousel} from "@/Components/lib/ui/FeaturedCarousel";
import {ItemGridProps} from "@/Components/lib/ui/Grid";

export type MoviesPageProps = {
    featuredSectionProps: LandingSectionProps;
    gridProps: Partial<ItemGridProps<Movie>>;
}

/**
 * Generates component props for the Movies page.
 * @param movies - The list of movies available on the page.
 * @param displayedMovies - The currently displayed movies on the page.
 * @param hasMore - Boolean indicating if more movies can be loaded.
 * @param loadMoreMovies - Function to load more movies when triggered.
 * @returns Component props for the Movies page.
 */
export function generateMoviesPageProps(
    movies: Movie[],
    displayedMovies: Movie[],
    hasMore: boolean,
    loadMoreMovies: () => void
): MoviesPageProps {
    /**
     * Props for the Featured Movie Section.
     */
    const featuredSectionProps: LandingSectionProps = {
        className: "py-0",
        orientation: "left",
        contentBottom: true,
        landingTextProps: {
            classNames: {title: "lg:w-[30rem]", subtitle: "lg:w-[30rem] text-justify"},
            title: "Our featured movies",
            subtitle:
                "Choose one of the available movies, then press the 'Book' button to reserve your seat.",
        },
        content: (
            <FeaturedCarousel
                buttonProps={{children: "Book"}}
                link={{prefix: "/movie"}}
                items={movies.slice(40, 60)}
            />
        ),
    };

    /**
     * Props for the Movies Grid.
     */
    const gridProps: Partial<ItemGridProps<Movie>> = {
        loadMoreItems: {hasMore, loadMore: loadMoreMovies},
        textProps: {
            classNames: {title: "lg:w-[30rem]", subtitle: "lg:w-[30rem] text-justify"},
            orientation: "left",
            title: "All Our Movies, So Far",
            subtitle: "When you scroll to the bottom, more movies will load automatically.",
        },
        items: displayedMovies,
    };

    return {
        featuredSectionProps,
        gridProps,
    };
}
