import React from "react";
import {sectionWrapper} from "@/Components/lib/ui/primitives";
import Text, {TextProps} from "@/Components/lib/ui/Text";
import {cn} from "@/Components/utils";


export type ItemGridProps<T> = {
    textProps: TextProps;
    items: T[];
    children: (item: T, index: number) => React.ReactNode;
    className?: string;
    classNames?: {
        container?: string;
        grid?: string;
    };
};

/**
 * Renders a horizontal grid of items with a title and subtitle section.
 * @param props - Props for the Grid component.
 */
export const Grid = <T, >({
                              items,
                              textProps,
                              children,
                              className,
                              classNames,
                          }: ItemGridProps<T>) => {
    return (
        <section
            className={cn(
                sectionWrapper({
                    class: "flex flex-col items-start justify-center",
                }),
                className,
                classNames?.container
            )}
        >
            {/* Text Section */}
            <Text {...textProps} />

            {/* Grid of Items */}
            <div
                className={cn(
                    "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full",
                    classNames?.grid
                )}
            >
                {items.map((item, index) => (
                    <React.Fragment key={index}>{children(item, index)}</React.Fragment>
                ))}
            </div>
        </section>
    );
};
