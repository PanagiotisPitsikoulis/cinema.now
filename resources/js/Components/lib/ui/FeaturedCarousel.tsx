import {Button} from "@nextui-org/react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/lib/ui/carousel";
import React from "react";
import {cn} from "@/Components/utils";
import {ButtonProps} from "@nextui-org/button";
import {Link} from "@inertiajs/react";
import {LandingText} from "@/Components/lib/ui/landing/LandingText";


export type Item = {
    id: number;
    name: string;
    description: string;
    image_link: string;
};

export type FeaturedCarouselProps = {
    items: Item[];
    buttonProps?: ButtonProps;
    link: {
        href?: string; // Custom href to override default
        prefix?: string; // Prefix for the default href
        suffix?: string; // Suffix for the default href
    };
};

/**
 * Renders the featured carousel section.
 * @param items - The items to display.
 * @param buttonProps - Props for the button.
 * @param link - Props for the link. Can be used to add a prefix or suffix to the item's id, or override it by passing a custom href. Don't add slashes to the prefix or suffix, they will be added automatically.
 */
export function FeaturedCarousel({items, buttonProps, link}: FeaturedCarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    // Update current and count when the carousel API changes
    React.useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    // Get the current item
    const currentItem = React.useMemo(() => items[current], [current, items]);

    // Generate the button link
    const buttonHref = React.useMemo(() => {
        if (link.href) return link.href;
        return `${link.prefix || ""}/${currentItem.id}/${link.suffix || ""}`;
    }, [link, currentItem]);

    return (
        <section>
            <div className="flex flex-col-reverse lg:flex-row gap-4">
                {/* Text Section */}
                <section
                    className="relative rounded-xl w-full p-8 flex items-center justify-center md:p-12 lg:px-16 lg:py-24"
                >
                    {/*Image background*/}
                    <img
                        alt={currentItem.name}
                        src={currentItem.image_link}
                        className="h-full w-full object-cover absolute top-0 left-0 right-0 bottom-0 inset-0 z-0 rounded-xl overflow-clip"
                    />
                    {/*Dark overlay*/}
                    <div
                        className="h-full w-full object-cover absolute top-0 left-0 right-0 bottom-0 inset-0 z-10 bg-black/40 backdrop-blur-3xl rounded-xl overflow-clip"
                    />
                    <div className="mx-auto max-w-xl z-20">
                        <LandingText
                            bottomContent={
                                <Button
                                    as={Link}
                                    href={buttonHref}
                                    className="rounded-full mt-8"
                                    {...buttonProps}
                                >
                                    {buttonProps?.children || "Book Now"}
                                </Button>
                            }
                            topContent={
                                <>
                                    {/* Dots only for multiple items */}
                                    {items.length > 1 && (
                                        <div className="flex flex-row gap-1 mb-4">
                                            {Array.from({length: count}).map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={cn(
                                                        "bg-white/50 size-2 rounded-full",
                                                        index === current && "bg-white"
                                                    )}
                                                ></span>
                                            ))}
                                        </div>
                                    )}</>
                            }
                            orientation={"left"}
                            size={"sm"}
                            classNames={{title: "text-white", subtitle: "text-white/80"}}
                            title={currentItem.name}
                            subtitle={currentItem.description.slice(0, 80) + "..."}
                        />
                    </div>
                </section>

                {/* Carousel or single image */}
                {items.length > 1 ? (
                    <Carousel className="w-full lg:max-w-sm" setApi={setApi}>
                        <CarouselContent>
                            {items.map((item, index) => (
                                <CarouselItem key={index}>
                                    <div>
                                        <img
                                            alt={item.name}
                                            src={item.image_link}
                                            className="h-full w-full object-cover rounded-xl"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                ) : (
                    <div className="w-full lg:max-w-sm">
                        <img
                            alt={items[0].name}
                            src={items[0].image_link}
                            className="h-full w-full object-cover rounded-xl"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
