import React from "react";
import {motion} from "framer-motion";

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
    className?: string;
};

/**
 * A wrapper component to apply Framer Motion animations to its children.
 * @param left - Distance to animate from the left.
 * @param right - Distance to animate from the right.
 * @param top - Distance to animate from the top.
 * @param bottom - Distance to animate from the bottom.
 * @param opacity - Target opacity. Default is 1.
 * @param duration - Duration of the animation in seconds. Default is 0.4.
 * @param delay - Delay before the animation starts in seconds.
 * @param ease - Easing function for the animation. Default is "easeOut".
 * @param initialOpacity - Initial opacity of the element. Default is 0.
 * @param className - Additional class name for the wrapper.
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
                                }: AnimatedWrapperProps) {
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
            initial={initialPosition}
            animate={animatePosition}
            transition={{
                duration,
                delay,
                ease,
            }}
        >
            {children}
        </motion.div>
    );
}
