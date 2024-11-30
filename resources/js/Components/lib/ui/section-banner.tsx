import {ArrowRightIcon} from "@nextui-org/shared-icons";
import {clsx} from "@nextui-org/shared-utils";


import PolymorphicButton from "./polymorphic-button";
import {useIsMounted} from "@/Components/hooks/use-is-mounted";
import {useMediaQuery} from "@/Components/hooks/use-media-query";
import {breakOutOfPageBounds, pageBounds, sectionWrapper, subtitle, title} from "@/Components/lib/ui/primitives";
import {cn} from "@/Components/utils";
import {FeaturesGrid} from "@/Components/lib/ui/features-grid";
import React from "react";


export type SectionBannerSuggestion = {
    title: string;
    description: React.ReactNode;
    icon: React.ReactNode;
    href?: string;
};

export type SectionBannerProps = {
    suggestions: SectionBannerSuggestion[];
    mainHeading: {
        line1: string;
        line2: string;
        highlightedText: string;
    };
    subtitleText: string;
    primaryButton?: {
        text: string;
        link?: string;
        func?: () => Promise<void>;
    };
    secondaryButton?: {
        text: string;
        link?: string;
        icon: React.ReactNode;
        func?: () => Promise<void>;
    };
    className?: string;
    classNames?: {
        base?: string;
        leftSection?: string;
        rightSection?: string;
        heading?: string;
        highlightedText?: string;
        subtitle?: string;
        buttonsContainer?: string;
        primaryButton?: string;
        secondaryButton?: string;
        featuresGrid?: string;
        background?: string;
    };
    sectionWrapperProps?: { isBlurred?: boolean; class?: string };
};

/**
 * InstallBanner component displays a banner with customizable suggestions,
 * headings, buttons, and an optional blurred background.
 */
export const SectionBanner = ({
                                  suggestions,
                                  mainHeading,
                                  subtitleText,
                                  primaryButton,
                                  secondaryButton,
                                  className,
                                  classNames,
                                  sectionWrapperProps,
                              }: SectionBannerProps) => {

    const isMounted = useIsMounted();
    const isMobile = useMediaQuery(768);

    return (
        <section
            className={sectionWrapper({
                className: cn(
                    "border-y border-divider flex justify-center items-center",
                    breakOutOfPageBounds,
                    sectionWrapperProps?.class,
                    className,
                    classNames?.base
                ),
                isBlurred: sectionWrapperProps?.isBlurred,
            })}
        >
            <div
                className={cn(
                    "w-full grid grid-cols-12 gap-6 lg:gap-0 z-20",
                    pageBounds,
                    classNames?.base
                )}
            >
                {/* Left Section */}
                <div
                    className={cn(
                        "flex flex-col gap-2 col-span-12 lg:col-span-6 xl:mr-20",
                        classNames?.leftSection
                    )}
                >
                    <div className={cn("leading-6 text-left", classNames?.heading)}>
                        <div className='inline-block'>
                            {mainHeading.line1 && (
                                <h1 className={title({size: "sm", class: "inline"})}>
                                    {mainHeading.line1}
                                </h1>
                            )}
                            <div>
                                {mainHeading.line2 && (
                                    <h1 className={title({size: "sm"})}>
                                        {mainHeading.line2}&nbsp;
                                    </h1>
                                )}
                                {mainHeading.highlightedText && (
                                    <h1
                                        className={title({
                                            size: "sm",
                                            color: "violet",
                                            class: cn("inline", classNames?.highlightedText),
                                        })}
                                    >
                                        {mainHeading.highlightedText}
                                    </h1>
                                )}
                            </div>
                        </div>
                    </div>
                    {subtitleText && (
                        <p
                            className={cn(
                                subtitle({class: "text-base lg:text-lg", fullWidth: true}),
                                classNames?.subtitle
                            )}
                        >
                            {subtitleText}
                        </p>
                    )}
                    <div
                        className={cn(
                            "flex flex-row gap-3 justify-start mt-2.5",
                            classNames?.buttonsContainer
                        )}
                    >
                        {/* Primary Button */}
                        {primaryButton && (
                            <PolymorphicButton
                                func={primaryButton.func}
                                href={primaryButton.link}
                                className={cn("text-sm", classNames?.primaryButton)}
                                color='secondary'
                                endContent={
                                    <ArrowRightIcon
                                        className='group-data-[hover=true]:translate-x-0.5 outline-none transition-transform'
                                        strokeWidth={2}
                                    />
                                }
                                radius='full'
                                size='md'
                            >
                                {primaryButton.text}
                            </PolymorphicButton>
                        )}
                        {/* Secondary Button */}
                        {secondaryButton && (
                            <PolymorphicButton
                                className={cn("text-sm", classNames?.secondaryButton)}
                                href={secondaryButton.link}
                                func={secondaryButton.func}
                                radius='full'
                                size='md'
                                startContent={secondaryButton.icon}
                                variant='bordered'
                            >
                                {secondaryButton.text}
                            </PolymorphicButton>
                        )}
                    </div>
                </div>
                {/* Right Section */}
                <div
                    className={cn("col-span-12 lg:col-span-6", classNames?.rightSection)}
                >
                    <FeaturesGrid
                        classNames={{
                            base: cn("lg:grid-cols-2", classNames?.featuresGrid),
                        }}
                        features={suggestions}
                    />
                </div>
            </div>
            {/* Background */}
            {!isMobile && (
                <div
                    className={clsx(
                        "absolute -top-20 lg:top-10 -translate-y-1/2 w-screen h-screen -z-50 opacity-0",
                        "data-[mounted=true]:opacity-100 transition-opacity",
                        "bg-left bg-no-repeat bg-[url('/gradients/looper-pattern.svg')]",
                        "after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-[-1]",
                        "after:bg-gradient-to-b after:from-transparent after:to-white/80 dark:after:to-black/20 after:z-[-1]",
                        classNames?.background
                    )}
                    data-mounted={isMounted}
                />
            )}
        </section>
    );
};
