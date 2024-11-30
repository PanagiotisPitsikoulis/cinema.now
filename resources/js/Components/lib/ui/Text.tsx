import React from 'react';
import {cn} from "@/Components/utils";
import {subtitle, title} from "@/Components/lib/ui/primitives";

export type TextProps = {
    className?: string;
    classNames?: {
        container?: string;
        title?: string;
        subtitle?: string;
    };
    text: {
        title: string;
        subtitle?: string;
    };
};

function Text({text, className, classNames}: TextProps) {
    return (
        <article className={cn("text-component-container", className, classNames?.container)}>
            {/* Section Title */}
            <h2
                className={cn(
                    title({size: "lg"}),
                    "text-3xl lg:text-4xl text-left text-foreground",
                    classNames?.title
                )}
            >
                {text.title}
            </h2>

            {/* Section Subtitle */}
            {text.subtitle && (
                <h3
                    className={cn(
                        subtitle({class: "text-start md:text-left pb-6"}),
                        classNames?.subtitle
                    )}
                >
                    {text.subtitle}
                </h3>
            )}
        </article>
    );
}

export default Text;
