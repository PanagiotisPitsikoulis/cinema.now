import React from "react";
import {cn} from "@/Components/utils";
import {Spinner} from "@nextui-org/react";
import {useOnScreen} from "@/Components/hooks/use-on-screen";
import {LandingText, LandingTextProps} from "@/Components/lib/ui/landing/LandingText";

export type ItemGridProps<T> = {
    loadMoreItems?: {
        hasMore: boolean;
        loadMore: () => void;
    };
    textProps: LandingTextProps;
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
                              loadMoreItems,
                          }: ItemGridProps<T>) => {
    // On Screen State to trigger load more
    const [ref, shouldLoadMore] = useOnScreen<HTMLDivElement>({
        rootMargin: "0px 0px -40% 0px",
        threshold: 0.5,
    });

    React.useEffect(() => {
        if (shouldLoadMore && loadMoreItems?.hasMore) {
            loadMoreItems.loadMore();
        }
    }, [shouldLoadMore]);

    return (
        <section
            className={cn(
                "flex flex-col items-start justify-center",
                className,
                classNames?.container
            )}
        >
            {/* Text Section */}
            <LandingText {...textProps} />

            {/* Grid of Items */}
            <div
                className={cn(
                    "grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 w-full mt-12",
                    classNames?.grid
                )}
            >
                {items.map((item, index) => (
                    <React.Fragment key={index}>{children(item, index)}</React.Fragment>
                ))}
            </div>

            {/* Infinite Scroll Spinner */}
            {loadMoreItems && loadMoreItems.hasMore && (
                <div ref={ref} className="flex justify-center w-full items-center mt-10">
                    <Spinner/>
                </div>
            )}
        </section>
    );
};
