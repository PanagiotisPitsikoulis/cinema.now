import {ArrowRightIcon} from "lucide-react";
import {useEffect} from "react";
import {cn} from "@/Components/utils";
import emitter from "@/Components/hooks/emitter";

export type TopBannerProps = {
    pathName: string;
    /** Current language for localized paths. */
    /** Array of path-based banner configurations. */
    pathsData: {
        path: string;
        gradientClassName?: string;
        emoji?: string;
        primaryText?: string;
        primaryLink?: {
            href: string;
            label: string;
        };
        secondaryLink?: {
            href: string;
        };
    }[];
    /** Object defining style slots for customization. */
    classNames?: {
        base?: string;
        gradientShapeLeft?: string;
        gradientShapeRight?: string;
        contentContainer?: string;
        secondaryLink?: string;
        primaryLinkContainer?: string;
        primaryLinkBackground?: string;
        primaryLinkText?: string;
        arrowIcon?: string;
    };
};

/**
 * Banner component displaying localized announcements or call-to-action links,
 * with dynamic gradient backgrounds and scroll-based visibility control.
 */
export const TopBanner = ({pathsData, pathName, classNames}: TopBannerProps) => {
    // Find the content data for the current path
    const currentPathData = pathsData?.find((item) =>
        pathName?.includes(item.path)
    );

    useEffect(() => {
        if (!currentPathData) return;

        const handleScroll = () => {
            if (window.scrollY < 48) {
                emitter.emit("proBannerVisibilityChange", "visible");
            } else {
                emitter.emit("proBannerVisibilityChange", "hidden");
            }
        };

        // Add scroll listener
        window.addEventListener("scroll", handleScroll, {passive: true});

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [currentPathData]);

    // If no content data is found for the current path, hide the banner
    if (!currentPathData) return null;

    const {
        emoji = "🚀",
        primaryText,
        primaryLink,
        secondaryLink,
        gradientClassName = "from-[#ff80b5] to-[#9089fc] dark:from-[#F54180] dark:to-[#338EF7]",
    } = currentPathData;

    return (
        <div
            className={cn(
                "relative z-50 isolate flex items-center gap-x-6 overflow-hidden bg-background border-b-1 border-divider px-6 py-2 sm:px-3.5 sm:before:flex-1",
                classNames?.base
            )}
        >
            {/* Background Shapes */}
            <div
                aria-hidden='true'
                className={cn(
                    "absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl",
                    classNames?.gradientShapeLeft
                )}
            >
                <div
                    className={cn(
                        "aspect-[577/310] w-[36.0625rem] bg-gradient-to-r opacity-20 dark:opacity-10",
                        gradientClassName
                    )}
                    style={{
                        clipPath:
                            "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
                    }}
                />
            </div>
            <div
                aria-hidden='true'
                className={cn(
                    "absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl",
                    classNames?.gradientShapeRight
                )}
            >
                <div
                    className={cn(
                        "aspect-[577/310] w-[36.0625rem] opacity-30 dark:opacity-20",
                        gradientClassName
                    )}
                    style={{
                        clipPath:
                            "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
                    }}
                />
            </div>

            {/* Content */}
            <div
                className={cn(
                    "flex w-full items-center justify-between md:justify-center gap-x-3",
                    classNames?.contentContainer
                )}
            >
                {secondaryLink && (
                    <a
                        className={cn(
                            "text-small flex items-end sm:text-[0.93rem] text-foreground hover:opacity-80 transition-opacity",
                            classNames?.secondaryLink
                        )}
                        href={secondaryLink.href}
                        rel='noopener noreferrer'
                    >
            <span aria-label='emoji' role='img'>
              {emoji}
            </span>
                        <span
                            className='inline-flex md:ml-1 animate-text-gradient font-medium bg-clip-text text-transparent bg-[linear-gradient(90deg,#D6009A_0%,#8a56cc_50%,#D6009A_100%)] dark:bg-[linear-gradient(90deg,#FFEBF9_0%,#8a56cc_50%,#FFEBF9_100%)]'
                            style={{
                                fontSize: "inherit",
                                backgroundSize: "200%",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                color: "transparent",
                            }}
                        >
              {primaryText}
            </span>
                    </a>
                )}
                {primaryLink && (
                    <a
                        className={cn(
                            "flex group min-w-[120px] items-center font-semibold text-foreground shadow-sm gap-1.5 relative overflow-hidden rounded-full p-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                            classNames?.primaryLinkContainer
                        )}
                        href={primaryLink.href}
                    >
            <span
                className={cn(
                    "absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F54180_0%,#338EF7_50%,#F54180_100%)]",
                    classNames?.primaryLinkBackground
                )}
            />
                        <div
                            className={cn(
                                "inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background group-hover:bg-background/70 transition-background px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl",
                                classNames?.primaryLinkText
                            )}
                        >
                            {primaryLink.label}
                            <ArrowRightIcon
                                aria-hidden='true'
                                className={cn(
                                    "outline-none transition-transform group-hover:translate-x-0.5 [&>path]:stroke-[2px]",
                                    classNames?.arrowIcon
                                )}
                                width={16}
                            />
                        </div>
                    </a>
                )}
            </div>
        </div>
    );
};
