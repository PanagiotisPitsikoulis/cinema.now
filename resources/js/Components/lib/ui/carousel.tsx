import * as React from "react";
import useEmblaCarousel, {type UseEmblaCarouselType} from "embla-carousel-react";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {Button} from "@nextui-org/react";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
    const context = React.useContext(CarouselContext);

    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }

    return context;
}

/**
 * Carousel component for the carousel.
 * @param orientation - The orientation of the carousel.
 * @param opts - The options for the carousel.
 * @param setApi - The setApi function for the carousel.
 * @param plugins - The plugins for the carousel.
 * @param children - The children for the carousel.
 * @returns JSX.Element
 */
const Carousel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
    (
        {
            orientation = "horizontal",
            opts,
            setApi,
            plugins,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const [carouselRef, api] = useEmblaCarousel(
            {
                ...opts,
                axis: orientation === "horizontal" ? "x" : "y",
            },
            plugins
        );
        const [canScrollPrev, setCanScrollPrev] = React.useState(false);
        const [canScrollNext, setCanScrollNext] = React.useState(false);

        const onSelect = React.useCallback((api: CarouselApi) => {
            if (!api) return;
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        }, []);

        const scrollPrev = React.useCallback(() => {
            api?.scrollPrev();
        }, [api]);

        const scrollNext = React.useCallback(() => {
            api?.scrollNext();
        }, [api]);

        React.useEffect(() => {
            if (!api || !setApi) return;
            setApi(api);
        }, [api, setApi]);

        React.useEffect(() => {
            if (!api) return;
            onSelect(api);
            api.on("reInit", onSelect);
            api.on("select", onSelect);

            return () => {
                api?.off("select", onSelect);
            };
        }, [api, onSelect]);

        return (
            <CarouselContext.Provider
                value={{
                    carouselRef,
                    api,
                    opts,
                    orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
                    scrollPrev,
                    scrollNext,
                    canScrollPrev,
                    canScrollNext,
                }}
            >
                <div
                    ref={ref}
                    className={`relative ${className}`}
                    role="region"
                    aria-roledescription="carousel"
                    {...props}
                >
                    {children}
                </div>
            </CarouselContext.Provider>
        );
    }
);
Carousel.displayName = "Carousel";

/**
 * CarouselContent component for the carousel content.
 * @param className - Additional class for the content.
 * @returns JSX.Element
 */
const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({className, ...props}, ref) => {
        const {carouselRef} = useCarousel();
        return (
            <div ref={carouselRef} className="overflow-hidden">
                <div ref={ref} className={`flex gap-4 ${className}`} {...props} />
            </div>
        );
    }
);
CarouselContent.displayName = "CarouselContent";

/**
 * CarouselItem component for the carousel item.
 * @param className - Additional class for the item.
 * @returns JSX.Element
 */
const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({className, ...props}, ref) => {
        const {orientation} = useCarousel();
        return (
            <div
                ref={ref}
                role="group"
                aria-roledescription="slide"
                className={`shrink-0 grow-0 ${orientation === "horizontal" ? "w-full" : "h-full"} ${
                    className || ""
                }`}
                {...props}
            />
        );
    }
);
CarouselItem.displayName = "CarouselItem";

/**
 * CarouselPrevious component for the carousel previous button.
 * @param className - Additional class for the previous button.
 * @returns JSX.Element
 */
const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
    ({className, ...props}, ref) => {
        const {scrollPrev, canScrollPrev} = useCarousel();
        return (
            //@ts-ignore
            <Button
                ref={ref}
                isIconOnly={true}
                size={"sm"}
                className={`absolute rounded-full left-2 top-1/2 -translate-y-1/2 z-10 ${className || ""}`}
                isDisabled={!canScrollPrev}
                onClick={scrollPrev}
                {...props}
            >
                <ArrowLeft className={"size-4"}/>
            </Button>
        );
    }
);
CarouselPrevious.displayName = "CarouselPrevious";

/**
 * CarouselNext component for the carousel next button.
 * @param className - Additional class for the next button.
 * @returns JSX.Element
 */
const CarouselNext = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
    ({className, ...props}, ref) => {
        const {scrollNext, canScrollNext} = useCarousel();
        return (
            //@ts-ignore
            <Button
                ref={ref}
                isIconOnly={true}
                size={"sm"}
                className={`absolute rounded-full right-2 top-1/2 -translate-y-1/2 z-10 ${className || ""}`}
                isDisabled={!canScrollNext}
                onClick={scrollNext}
                {...props}
            >
                <ArrowRight className={"size-4"}/>
            </Button>
        );
    }
);
CarouselNext.displayName = "CarouselNext";

export {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
};
