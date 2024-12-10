import React from "react";
import {LandingSection} from "@/Components/lib/ui/landing/LandingSection";
import {Safari} from "@/Components/lib/ui/safari";
import {FeaturesGrid} from "@/Components/lib/ui/features-grid";
import {LandingTextProps} from "@/Components/lib/ui/landing/LandingText";

export type SectionComposedProps = {
    text: LandingTextProps;
    image: {
        src: string;
        width?: number;
        height?: number;
    };
    features?: {
        title: string;
        icon: React.ReactNode;
    }[];
};

/**
 * Composed Landing Section component that combines a LandingText, a Safari component, and optional features.
 * @param text - The text props for the LandingText component.
 * @param image - The image props for the Safari component.
 * @param features - Optional features to display below the text.
 * @returns JSX.Element
 */
export const SectionLeftComposed: React.FC<SectionComposedProps> = ({text, image, features}) => {
    return (
        <LandingSection
            animatedWrapperProps={{
                animatedWrapperPropsText: {
                    triggerOnView: true,
                    right: 40,
                    duration: 0.5,
                },
                animatedWrapperPropsContent: {
                    triggerOnView: true,
                    left: 40,
                    duration: 0.5,
                },
            }}
            orientation="left"
            landingTextProps={{
                ...text,
                bottomContent: features ? (
                    <FeaturesGrid
                        classNames={{
                            base: "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full",
                            header: "pb-3",
                            card: "bg-primary-50/40 dark:bg-default-400/10 shadow-none w-full",
                            iconWrapper:
                                "bg-primary-100 text-primary dark:bg-transparent text-default-500/50",
                        }}
                        features={features}
                    />
                ) : undefined,
            }}
            content={
                <div className={"flex justify-start items-start"}>
                    <Safari
                        width={image.width || 650}
                        height={image.height || 550}
                        src={image.src}
                    />
                </div>
            }
        />
    );
};

/**
 * Composed Landing Section component that combines a LandingText, a Safari component, and optional features.
 * @param text - The text props for the LandingText component.
 * @param image - The image props for the Safari component.
 * @param features - Optional features to display below the text.
 * @returns JSX.Element
 */
export const SectionRightComposed: React.FC<SectionComposedProps> = ({text, image, features}) => {
    return (
        <LandingSection
            animatedWrapperProps={{
                animatedWrapperPropsText: {
                    triggerOnView: true,
                    left: 40,
                    duration: 0.5,
                },
                animatedWrapperPropsContent: {
                    triggerOnView: true,
                    right: 40,
                    duration: 0.5,
                },
            }}
            orientation="right"
            landingTextProps={{
                ...text,
                bottomContent: features ? (
                    <FeaturesGrid
                        classNames={{
                            base: "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 w-full",
                            header: "pb-3",
                            card: "bg-primary-50/40 dark:bg-default-400/10 shadow-none w-full",
                            iconWrapper:
                                "bg-primary-100 text-primary dark:bg-transparent text-default-500/50",
                        }}
                        features={features}
                    />
                ) : undefined,
            }}
            content={
                <div className={"flex justify-end items-start"}>
                    <Safari
                        width={image.width || 650}
                        height={image.height || 550}
                        src={image.src}
                    />
                </div>
            }
        />
    );
};
