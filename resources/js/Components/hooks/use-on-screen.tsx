import React, {useEffect, useRef, useState} from "react";

/**
 * A custom React hook to check if an element is visible on the screen.
 * @param options IntersectionObserver options (e.g., root, rootMargin, threshold).
 * @returns A ref to attach to the element and a boolean indicating visibility.
 */
export function useOnScreen<T extends HTMLElement>(
    options?: IntersectionObserverInit
): [React.RefObject<T | null>, boolean] {
    const ref = useRef<T | null>(null); // Allow null since it may not be set initially
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            options
        );

        const currentElement = ref.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options]);

    return [ref, isVisible];
}
