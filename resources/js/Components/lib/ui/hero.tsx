import {Chip, Link} from "@nextui-org/react";
import {ArrowRightIcon} from "@nextui-org/shared-icons";

import PolymorphicButton from "./polymorphic-button";
import {cn} from "@/Components/utils";
import {subtitle, title} from "@/Components/lib/ui/primitives";
import React from "react";

export type HeroProps = {
    /** Announcement banner details. */
    announcement?: {
        text: string;
        link: string;
        emoji?: string;
    };
    /** Heading details for the hero section. */
    heading: {
        line1: string;
        line2: string;
        description: string;
    };
    /** Subheading displayed below the main heading. */
    subheading: string;
    /** Configuration for the primary button. */
    primaryButton?: {
        text: string;
        link?: string;
        func?: () => Promise<void>;
    };
    /** Configuration for the secondary button. */
    secondaryButton?: {
        text: string;
        link?: string;
        func?: () => Promise<void>;
        icon: React.ReactNode;
    };
    /** Object defining style slots for customization. */
    classNames?: {
        base?: string;
        announcement?: string;
        headingContainer?: string;
        headingLine1?: string;
        headingLine2?: string;
        headingDescription?: string;
        subheading?: string;
        buttonsContainer?: string;
        primaryButton?: string;
        secondaryButton?: string;
    };
};

/**
 * Hero component for the main section of a page with announcements,
 * headings, and call-to-action buttons.
 */
export const Hero = ({
                         announcement,
                         heading,
                         subheading,
                         primaryButton,
                         secondaryButton,
                         classNames,
                     }: HeroProps) => {
    return (
        <div
            className={cn(
                "relative z-20 flex flex-col w-full gap-6 lg:w-1/2",
                classNames?.base
            )}
        >
            {/* Announcement */}
            <div
                className={cn("flex justify-center w-full", classNames?.announcement)}
            >
                {announcement && (
                    <Chip
                        as={Link}
                        className={cn(
                            "transition-colors cursor-pointer bg-default-100/50 hover:bg-default-100 border-default-200/80 dark:border-default-100/80"
                        )}
                        color='default'
                        href={announcement.link}
                        variant='light'
                    >
                        {announcement.text}&nbsp;
                        <span aria-label='emoji' role='img'>
              {announcement.emoji}
            </span>
                    </Chip>
                )}
            </div>

            {/* Heading */}
            <div
                className={cn(
                    "leading-8 md:leading-10 text-left",
                    classNames?.headingContainer
                )}
            >
                <div className='inline-block'>
                    <h1
                        className={cn(
                            title({fullWidth: false}),
                            classNames?.headingLine1
                        )}
                    >
                        {heading.line1}&nbsp;
                    </h1>
                    <h1
                        className={cn(title({color: "blue"}), classNames?.headingLine2)}
                    >
                        {heading.line2}&nbsp;
                    </h1>
                </div>
                <h3 className={cn(title(), classNames?.headingDescription)}>
                    {heading.description}
                </h3>
            </div>

            {/* Subheading */}
            <h2
                className={cn(
                    subtitle({
                        fullWidth: true,
                        class: "text-left",
                    }),
                    classNames?.subheading
                )}
            >
                {subheading}
            </h2>

            {/* Buttons */}
            <div
                className={cn(
                    "flex flex-col items-center gap-4 md:flex-row relative z-50",
                    classNames?.buttonsContainer
                )}
            >
                {/* Primary Button */}
                {primaryButton && (
                    <PolymorphicButton
                        func={primaryButton.func}
                        href={primaryButton.link}
                        className={cn(
                            "w-full md:h-11 md:w-auto",
                            classNames?.primaryButton
                        )}
                        color='primary'
                        endContent={
                            <ArrowRightIcon
                                className='group-data-[hover=true]:translate-x-0.5 outline-none transition-transform'
                                strokeWidth={2}
                            />
                        }
                        radius='full'
                        size='lg'
                    >
                        {primaryButton.text}
                    </PolymorphicButton>
                )}
                {/* Secondary Button */}
                {secondaryButton && (
                    <PolymorphicButton
                        func={secondaryButton.func}
                        href={secondaryButton.link}
                        className={cn("w-full lg:w-fit", classNames?.secondaryButton)}
                        radius='full'
                        size='lg'
                        startContent={secondaryButton.icon}
                        variant='bordered'
                    >
                        {secondaryButton.text}
                    </PolymorphicButton>
                )}
            </div>
        </div>
    );
};
