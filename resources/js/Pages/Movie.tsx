import React, { useState } from "react";
import Layout from "@/Layouts/Layout";
import { PageProps } from "@/types";
import { generateMoviePageProps } from "@/Components/lib/config/MoviePageProps";
import type { ExtendedDisplayTime, Movie } from "@/types/types";
import { LandingSection } from "@/Components/lib/ui/landing/LandingSection";
import { Spacer } from "@nextui-org/react";
import { LandingText } from "@/Components/lib/ui/landing/LandingText";
import BackgroundContainer from "@/Components/lib/ui/BackgroundContainer";

/**
 * Display a movie along with its display times and reservations.
 * @param auth - The authenticated user.
 * @param movie - The movie to display.
 * @param display_times - The display times for the movie.
 * @returns JSX.Element
 */
export default function Movie({
    auth,
    movie,
    display_times,
}: PageProps<{
    movie: Movie;
    display_times?: ExtendedDisplayTime[];
}>) {
    // State to track the currently selected seat
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
    // State to track the currently selected display time
    const [selectedDisplayTime, setSelectedDisplayTime] = useState<number>(
        display_times?.[0]?.id as number
    );

    /**
     * Generate component props for the Movie page.
     * By defining the props outside the markup that renders them,
     * separation of concerns is maintained, meaning that the props can be easily changed without affecting the markup.
     */
    const {
        heroSectionProps,
        seatSelectorProps,
        submitSectionProps,
        backgroundContainerProps,
    } = generateMoviePageProps(
        movie,
        display_times,
        selectedDisplayTime,
        selectedSeat,
        setSelectedDisplayTime,
        setSelectedSeat
    );

    return (
        // Reusable layout component with Navbar and footer.
        <Layout>
            {/* Main Section */}
            {/*Landing Section Component, it is meant to showcase the main feature of the page */}
            <LandingSection {...heroSectionProps} />
            {/*Spacer component, it is meant to add some spacing between sections */}
            <Spacer y={10} />
            {/*Seat Selector*/}
            {/*Allows the user to select a seat for the selected display time*/}
            <LandingSection {...seatSelectorProps} />
            {/*Spacer component, it is meant to add some spacing between sections */}
            <Spacer y={10} />
            {/*Submit Section*/}
            {/*Allows users to submit their form */}
            <BackgroundContainer {...backgroundContainerProps}>
                <LandingText {...submitSectionProps} />
            </BackgroundContainer>
        </Layout>
    );
}
