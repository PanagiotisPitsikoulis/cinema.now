import {HeartIcon, PaintbrushIcon, RocketIcon, SmartphoneIcon} from "lucide-react";
import {SectionComposedProps} from "@/Components/lib/composed/SectionComposed";
import {LandingSectionProps} from "@/Components/lib/ui/landing/LandingSection";
import {FeaturedCarousel} from "@/Components/lib/ui/FeaturedCarousel";
import {HeroComposedProps} from "@/Components/lib/composed/HeroComposed";
import {CTAComposedProps} from "@/Components/lib/composed/CTAComposed";
import {Movie} from "@/types/types";

export type WelcomePageProps = {
    heroComposedProps: HeroComposedProps;
    featuredSectionProps: LandingSectionProps;
    section2Props: SectionComposedProps;
    section3Props: SectionComposedProps;
    section4Props: SectionComposedProps;
    ctaComposedProps: CTAComposedProps;
}

/**
 * Generates component props for the Welcome page.
 * @param movies - The list of movies for the featured carousel.
 * @returns Component props for the Welcome page.
 */
export function generateWelcomePageComponentProps(movies: Movie[]): WelcomePageProps {
    /**
     * Pass in text, images, and CTA link/text to the Hero component.
     */
    const heroComposedProps: HeroComposedProps = {
        title: "Discover the best movies",
        subtitle:
            "CinemaNow is your one-stop platform to explore, book, and enjoy the finest movies with ease.",
        images: [
            "https://images.pexels.com/photos/29672671/pexels-photo-29672671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1871783/pexels-photo-1871783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/28738174/pexels-photo-28738174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/4700102/pexels-photo-4700102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        ],
        ctaLink: "/movies",
        ctaText: "Get Started",
    };

    /**
     * Pass in text, images, and CTA link/text to the Featured Carousel component.
     */
    const featuredSectionProps: LandingSectionProps = {
        animatedWrapperProps: {
            animatedWrapperPropsText: {
                triggerOnView: true, right: 40, duration: 0.5
            },
        },
        orientation: "left",
        contentBottom: true,
        landingTextProps: {
            title: "A World of Movies Awaits",
            subtitle:
                "From blockbuster hits to indie gems, CinemaNow offers a wide selection to cater to every taste and mood.",
            size: "md",
        },
        content: <FeaturedCarousel buttonProps={{children: "Book"}} link={{prefix: "/movie"}}
                                   items={movies.slice(0, 20)}/>,
    };

    /**
     * Pass in text, image, and features to the SectionLeft component.
     */
    const section2Props: SectionComposedProps = {
        text: {
            classNames: {
                title: "lg:w-full",
                subtitle: "lg:w-full",
                container: "lg:pl-20",
            },
            title: "Hassle-Free Booking",
            subtitle:
                "Booking your favorite movies has never been easier. With just a few clicks, reserve your seats in seconds.",
            size: "md",
        },
        image: {
            src: "/screenshots/book.png",
        },
        features: [
            {
                title: "Intuitive Interface",
                icon: <SmartphoneIcon className="text-primary"/>,
            },
            {
                title: "Seamless Integration",
                icon: <HeartIcon className="text-primary"/>,
            },
            {
                title: "Easy Navigation",
                icon: <RocketIcon className="text-primary"/>,
            },
            {
                title: "Personalized Recommendations",
                icon: <PaintbrushIcon className="text-primary"/>,
            }
        ],
    };

    /**
     * Pass in text, image, and features to the SectionRight component.
     */
    const section3Props: SectionComposedProps = {
        text: {
            classNames: {
                title: "lg:w-full",
                subtitle: "lg:w-full",
                container: "lg:pr-20",
            },
            title: "Tailored Just For You",
            subtitle:
                "Discover personalized recommendations based on your preferences and past bookings.",
            size: "md",
        },
        image: {
            src: "/screenshots/movies.png",
        },
        features: [
            {
                title: "Includes thousands of movies",
                icon: <PaintbrushIcon className="text-primary"/>,
            },
            {
                title: "AI-powered recommendations",
                icon: <RocketIcon className="text-primary"/>,
            },
            {
                title: "Mobile-friendly interface",
                icon: <SmartphoneIcon className="text-primary"/>,
            },
            {
                title: "Dark Mode Support",
                icon: <HeartIcon className="text-primary"/>,
            },
        ],
    };

    /**
     * Pass in text, image, and features to the SectionRight component.
     */
    const section4Props: SectionComposedProps = {
        text: {
            classNames: {
                title: "lg:w-full",
                subtitle: "lg:w-full",
                container: "lg:pl-20",
            },
            title: "Manage Your Reservations",
            subtitle:
                "Manage your reservations and stay organized with a simple and intuitive interface. Say goodbye to manual booking and hello to a hassle-free experience.",
            size: "md",
        },
        image: {
            src: "/screenshots/reservations.png",
        },
        features: [
            {
                title: "Easy Reservation Management",
                icon: <PaintbrushIcon className="text-primary"/>,
            },
            {
                title: "Search your reservations",
                icon: <RocketIcon className="text-primary"/>,
            },
            {
                title: "Mobile reservation management",
                icon: <SmartphoneIcon className="text-primary"/>,
            },
            {
                title: "Reservation reminders",
                icon: <HeartIcon className="text-primary"/>,
            },
        ],
    };

    /**
     * Pass in text, image, and features to the CTA component.
     */
    const ctaComposedProps: CTAComposedProps = {
        title: "Experience Cinema Like Never Before",
        subtitle:
            "Join CinemaNow today and step into a world of cinematic wonder.",
        ctaLink: "/movies",
        ctaText: "Get Started",
    };

    return {
        heroComposedProps,
        featuredSectionProps,
        section2Props,
        section3Props,
        section4Props,
        ctaComposedProps,
    };
}
