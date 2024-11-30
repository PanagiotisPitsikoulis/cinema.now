import Layout from "@/Layouts/Layout";
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import type {Movie} from "@/types/types";
import {Grid} from "@/Components/lib/ui/Grid";
import {FeaturedCarousel} from "@/Components/lib/ui/FeaturedCarousel";
import {GridItem} from "@/Components/lib/ui/GridItem";
import Text from "@/Components/lib/ui/Text";
import {AnimatedWrapper} from "@/Components/lib/ui/AnimatedWrapper";

export default function Movies() {
    const {movies} = usePage<PageProps & { movies: Movie[] }>().props;

    // Select the first movie as the featured movie
    const featuredMovie = movies[2];

    return (
        <Layout>
            {/* Featured Movie Section */}
            <AnimatedWrapper bottom={40} duration={0.5}>
                <Text text={{title: "Featured Movies", subtitle: "Choose from the latest and most popular movies."}}/>
                {featuredMovie &&
                    <FeaturedCarousel buttonProps={{children: "Book"}} link={{prefix: "/movie"}} items={movies}/>}
            </AnimatedWrapper>
            {/* Movies List Section */}
            <section className="space-y-20 mt-10">
                <Grid
                    textProps={{
                        text: {
                            title: "Our Movies",
                            subtitle: "Choose from the latest and most popular movies.",
                        },
                    }}
                    items={movies}
                >
                    {(data) => (
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
            </section>
        </Layout>
    );
}
