import React from "react";
import { cn } from "@/Components/utils";

export type BackgroundContainerProps = {
    children: React.ReactNode;
    background?: string;
    className?: string;
    classNames?: {
        container?: string;
        background?: string;
        content?: string;
    };
};

/**
 * A container component that adds a background image to its children.
 * @param background - The background image URL.
 * @param className - Additional class for the container.
 * @param classNames - Classnames for specific parts of the container.
 * @returns JSX.Element
 */
function BackgroundContainer({
    children,
    background = "/gradients/looper-pattern.svg",
    className,
    classNames = {},
}: BackgroundContainerProps) {
    return (
        <div
            className={cn(
                "relative overflow-visible",
                className,
                classNames.container
            )}
        >
            {/* Dynamic Background */}
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none select-none bg-cover bg-center",
                    classNames.background
                )}
                style={
                    background
                        ? { backgroundImage: `url('${background}')` }
                        : undefined
                }
            ></div>

            {/* Children */}
            <div className={cn("relative z-10", classNames.content)}>
                {children}
            </div>
        </div>
    );
}

export default BackgroundContainer;
