import React from "react";
import { motion } from "framer-motion";
import { useOnScreen } from "@/Components/hooks/use-on-screen";

export type AnimatedWrapperProps = {
    children: React.ReactNode;
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string | number[];
    initialOpacity?: number;
    triggerOnView?: boolean;
    rootMargin?: string;
    threshold?: number | number[];
    className?: string;
};

/**
 * A wrapper component to apply Framer Motion animations to its children.
 * Optionally triggers the animation only when the component comes into view.
 * @param triggerOnView - If true, animations are triggered when the component comes into view.
 * @param rootMargin - Margin around the root for intersection detection. (Used with triggerOnView)
 * @param threshold - Threshold for intersection detection. (Used with triggerOnView)
 * @param left - Distance to animate from the left. Deprecated, use rootMargin and threshold instead.
 * @param right - Distance to animate from the right. Deprecated, use rootMargin and threshold instead.
 * @param top - Distance to animate from the top. Deprecated, use rootMargin and threshold instead.
 * @param bottom - Distance to animate from the bottom. Deprecated, use rootMargin and threshold instead.
 * @param opacity - Target opacity. Default is 1. Deprecated, use rootMargin and threshold instead.
 * @param duration - Duration of the animation in seconds. Default is 0.4. Deprecated, use rootMargin and threshold instead.
 * @param delay - Delay before the animation starts in seconds. Deprecated, use rootMargin and threshold instead.
 * @param ease - Easing function for the animation. Default is "easeOut". Deprecated, use rootMargin and threshold instead.
 * @param initialOpacity - Initial opacity of the element. Default is 0. Deprecated, use rootMargin and threshold instead.
 * @param className - Additional class name for the wrapper. Deprecated, use rootMargin and threshold instead.
 */
export function AnimatedWrapper({
    children,
    left,
    right,
    top,
    bottom,
    opacity = 1,
    duration = 0.4,
    delay = 0,
    ease = "easeOut",
    initialOpacity = 0,
    className,
    triggerOnView = false,
    rootMargin = "0px",
    threshold = 0.5,
}: AnimatedWrapperProps) {
    const [ref, isVisible] = useOnScreen<HTMLDivElement>({
        rootMargin,
        threshold,
    });

    const initialPosition = {
        x: left ? -left : right ? right : 0,
        y: top ? -top : bottom ? bottom : 0,
        opacity: initialOpacity,
    };

    const animatePosition = {
        x: 0,
        y: 0,
        opacity,
    };

    return (
        <motion.div
            ref={triggerOnView ? ref : null}
            initial={initialPosition}
            animate={
                triggerOnView && !isVisible ? initialPosition : animatePosition
            }
            transition={{
                duration,
                delay,
                ease,
            }}
            //@ts-ignore
            className={className}
        >
            {children}
        </motion.div>
    );
}
