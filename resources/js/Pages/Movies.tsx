import PageContainer from "@/Components/PageContainer";
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import type {Movie} from "@/types/types";

export default function Movies() {
    const {movies, auth} = usePage<PageProps & { movies: Movie[] }>().props;

    // Select the first movie as the featured movie
    const featuredMovie = movies[0];

    return (
        <PageContainer>
            {/* Featured Movie Section */}
            {featuredMovie && (
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                            className="bg-blue-600 rounded-md p-8 flex items-center justify-center md:p-12 lg:px-16 lg:py-24">
                            <div className="mx-auto max-w-xl text-center">
                                <h2 className="text-2xl font-bold text-white md:text-3xl">
                                    {featuredMovie.name}
                                </h2>

                                <p className="hidden text-white/90 sm:mt-4 sm:block">
                                    {featuredMovie.description}
                                </p>

                                <div className="mt-4 md:mt-8">
                                    <a
                                        href={`/movie/${featuredMovie.id}`}
                                        className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                                    >
                                        View Details!
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <img
                                alt={featuredMovie.name}
                                src={featuredMovie.image_link}
                                className="max-h-[30rem] w-full object-cover rounded-md"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Movies List Section */}
            <section className="space-y-6 mt-10">
                {/* Introduction or Section Header */}
                <article className="max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl font-semibold">Explore Our Collection</h3>
                    <p className="text-gray-600">
                        Discover a wide variety of movies to suit all tastes and moods.
                    </p>
                </article>

                {/* Movies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <article key={movie.id} className="border rounded-md overflow-hidden shadow-sm">
                            <a href={`/movie/${movie.id}`} className="block">
                                <img
                                    alt={movie.name}
                                    src={movie.image_link}
                                    className="w-full object-cover"
                                />
                            </a>
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-gray-800">
                                    <a href={`/movie/${movie.id}`} className="hover:underline">
                                        {movie.name}
                                    </a>
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                    {movie.description}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xs text-gray-500">{movie.category}</span>
                                    <a
                                        href={`/movie/${movie.id}`}
                                        className="text-sm text-blue-500 hover:underline"
                                    >
                                        View More
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </PageContainer>
    );
}
