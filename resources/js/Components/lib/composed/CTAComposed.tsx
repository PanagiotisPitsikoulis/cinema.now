import React from "react";
import { LandingSection } from "@/Components/lib/ui/landing/LandingSection";
import { Button } from "@nextui-org/react";
import { ArrowRightIcon } from "@nextui-org/shared-icons";
import { Link } from "@inertiajs/react";
import BackgroundContainer from "@/Components/lib/ui/BackgroundContainer";

export type CTAComposedProps = {
    title: string;
    subtitle: string;
    ctaLink: string;
    ctaText: string;
};

/**
 * Composed CTA component that combines a LandingText, a Safari component, and optional features.
 * @param title - The title of the hero section.
 * @param subtitle - The subtitle of the hero section.
 * @param ctaLink - The link for the call-to-action button.
 * @param ctaText - The text for the call-to-action button.
 * @returns JSX.Element
 */
export const CTAComposed: React.FC<CTAComposedProps> = ({
    title,
    subtitle,
    ctaLink,
    ctaText,
}) => {
    return (
        <BackgroundContainer className="-mx-10 px-10 lg:-mx-20 lg:px-20 h-[100vh]">
            <LandingSection
                orientation="center"
                landingTextProps={{
                    title,
                    subtitle,
                    size: "md",
                    bottomContent: (
                        <Button
                            as={Link}
                            href={ctaLink}
                            endContent={<ArrowRightIcon />}
                            size="lg"
                            color="primary"
                        >
                            {ctaText}
                        </Button>
                    ),
                }}
            />
        </BackgroundContainer>
    );
};
