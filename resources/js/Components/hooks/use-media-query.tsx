import {useCallback, useEffect, useState} from "react";

/**
 * A hook to check if the window width matches a given width.
 * @param width - The width to check.
 * @returns A boolean indicating whether the window width matches the given width.
 */
export const useMediaQuery = (width: number): boolean => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e: MediaQueryListEvent) => {
        if (e.matches) {
            setTargetReached(true);
        } else {
            setTargetReached(false);
        }
    }, []);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`);

        media.addListener(updateTarget);

        // Check on mount (callback is not called until a change occurs)
        if (media.matches) {
            setTargetReached(true);
        }

        return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
};

export const useIsMobile = () => {
    return useMediaQuery(650);
};
