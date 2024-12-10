import {useEffect, useState} from "react";

/**
 * A hook to check if the component is mounted.
 * @returns A boolean indicating whether the component is mounted.
 */
export function useIsMounted() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true);
        });
    }, []);

    return isMounted;
}
