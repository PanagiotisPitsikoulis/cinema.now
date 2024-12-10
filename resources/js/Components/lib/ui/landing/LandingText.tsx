import React from "react";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "@/Components/utils";

const landingTextStyles = cva("flex flex-col gap-6", {
    variants: {
        orientation: {
            left: "items-start text-left",
            center: "items-center text-center",
            right: "items-end text-left",
        },
        size: {
            sm: "",
            md: "",
            lg: "",
        },
    },
    defaultVariants: {
        orientation: "center",
        size: "md",
    },
});

const titleStyles = cva("font-extrabold text-foreground capitalize", {
    variants: {
        size: {
            sm: "text-3xl sm:text-4xl md:text-5xl w-full sm:w-3/4 md:w-2/3",
            md: "text-5xl sm:text-6xl md:text-7xl w-full sm:w-2/3 md:w-1/2",
            lg: "text-7xl sm:text-8xl md:text-9xl w-full sm:w-1/2 md:w-1/3",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

const subtitleStyles = cva("font-normal text-foreground-700", {
    variants: {
        size: {
            sm: "text-base sm:text-lg md:text-xl w-full sm:w-3/4 md:w-2/3",
            md: "text-lg sm:text-xl md:text-2xl w-full sm:w-2/3 md:w-1/2",
            lg: "text-xl sm:text-2xl md:text-3xl w-full sm:w-1/2 md:w-1/3",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

export type LandingTextProps = {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    topContent?: React.ReactNode;
    bottomContent?: React.ReactNode;
    className?: string;
    classNames?: {
        container?: string;
        title?: string;
        subtitle?: string;
        topContent?: string;
        bottomContent?: string;
    };
} & VariantProps<typeof landingTextStyles>;

/**
 * LandingText component for the main section of a page with announcements,
 * headings, and call-to-action buttons.
 */
export const LandingText: React.FC<LandingTextProps> = ({
                                                            title,
                                                            subtitle,
                                                            topContent,
                                                            bottomContent,
                                                            orientation,
                                                            size,
                                                            className,
                                                            classNames = {},
                                                        }) => {
    return (
        <div
            className={cn(
                landingTextStyles({orientation, size}),
                className,
                classNames.container
            )}
        >
            {topContent && (
                <div className={cn("mb-4", classNames.topContent)}>{topContent}</div>
            )}
            {title && (
                <h1 className={cn(titleStyles({size}), classNames.title)}>{title}</h1>
            )}
            {subtitle && (
                <h3 className={cn(subtitleStyles({size}), classNames.subtitle)}>
                    {subtitle}
                </h3>
            )}
            {bottomContent && (
                <div className={cn("mt-4", classNames.bottomContent)}>
                    {bottomContent}
                </div>
            )}
        </div>
    );
};
