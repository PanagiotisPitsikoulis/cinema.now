import { PageProps } from "@/types";
import Layout from "@/Layouts/Layout";
import { Movie } from "@/types/types";
import {
    SectionLeftComposed,
    SectionRightComposed,
} from "@/Components/lib/composed/SectionComposed";
import { LandingSection } from "@/Components/lib/ui/landing/LandingSection";
import { HeroComposed } from "@/Components/lib/composed/HeroComposed";
import { CTAComposed } from "@/Components/lib/composed/CTAComposed";
import { generateWelcomePageComponentProps } from "@/Components/lib/config/WelcomePageProps";
import { Head } from "@inertiajs/react";

/**
 * Welcome page for the application. This page is the first page that users see when they visit the website.
 * @param auth - The authenticated user.
 * @param movies - The list of movies for the featured carousel.
 * @returns JSX.Element
 */
export default function Welcome({
    auth,
    movies,
}: PageProps<{ movies: Movie[] }>) {
    /**
     * Generate component props for the Welcome page.
     * By defining the props outside the markup that renders them,
     * separation of concerns is maintained, meaning that the props can be easily changed without affecting the markup.
     */
    const {
        heroComposedProps,
        featuredSectionProps,
        section2Props,
        section3Props,
        section4Props,
        ctaComposedProps,
    } = generateWelcomePageComponentProps(movies);

    return (
        // Reusable layout component with Navbar and footer.
        <Layout classNames={{ main: "mt-0" }}>
            {/* Page Title */}
            <Head title="The Best Cinema in Town" />
            {/* Hero Section */}
            {/*Hero Component, it is meant to convert new visitors of the page to potential users */}
            <HeroComposed {...heroComposedProps} />

            {/* Featured Section */}
            {/*This component is meant to showcase the main features of the page */}
            <LandingSection {...featuredSectionProps} />

            {/* Section 2 */}
            {/*This component is meant to detail a specific feature of the page */}
            <SectionRightComposed {...section2Props} />

            {/* Section 3 */}
            {/*This component is meant to detail a specific feature of the page */}
            <SectionLeftComposed {...section3Props} />

            {/* Section 4 */}
            {/*This component is meant to detail a specific feature of the page */}
            <SectionRightComposed {...section4Props} />

            {/* Call to Action */}
            {/*This component is meant to encourage users to take action */}
            <CTAComposed {...ctaComposedProps} />
        </Layout>
    );
}
