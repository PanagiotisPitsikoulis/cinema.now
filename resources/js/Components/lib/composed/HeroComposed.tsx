import React from "react";
import { AnimatedWrapper } from "@/Components/lib/ui/AnimatedWrapper";
import { LandingText } from "@/Components/lib/ui/landing/LandingText";
import { AnimatedImageGrid } from "@/Components/lib/ui/landing/AnimatedImageGrid";
import { Button } from "@nextui-org/react";
import { ArrowRightIcon } from "@nextui-org/shared-icons";
import { Link } from "@inertiajs/react";

export type HeroComposedProps = {
    title: string;
    subtitle: string;
    images: string[];
    ctaLink: string;
    ctaText: string;
};

/**
 * Composed Hero component that combines a LandingText, a Safari component, and optional features.
 * @param title - The title of the hero section.
 * @param subtitle - The subtitle of the hero section.
 * @param images - An array of image URLs to display in the hero section.
 * @param ctaLink - The link for the call-to-action button.
 * @param ctaText - The text for the call-to-action button.
 * @returns JSX.Element
 */
export const HeroComposed: React.FC<HeroComposedProps> = ({
    title,
    subtitle,
    images,
    ctaLink,
    ctaText,
}) => {
    return (
        <section className="flex items-center justify-between h-[calc(100vh-150px)] max-lg:h-[50rem] flex-col gap-20 overflow-hidden">
            <AnimatedWrapper
                className="flex items-center justify-start"
                triggerOnView
                threshold={0.05}
                bottom={40}
                duration={0.5}
            >
                <LandingText
                    title={title}
                    subtitle={subtitle}
                    orientation="center"
                    size="md"
                    bottomContent={
                        <Button
                            as={Link}
                            href={ctaLink}
                            endContent={<ArrowRightIcon />}
                            size="lg"
                            color="primary"
                        >
                            {ctaText}
                        </Button>
                    }
                />
            </AnimatedWrapper>
            <AnimatedImageGrid images={images} />
        </section>
    );
};
