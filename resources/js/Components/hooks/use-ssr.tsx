import {useEffect, useState} from "react";

/**
 * A hook to check if the application is running on the server side.
 * @returns A boolean indicating whether the application is running on the server side.
 */
const isBrowser = (): boolean => {
    return Boolean(
        typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
};

export type SSRState = {
    isBrowser: boolean;
    isServer: boolean;
};

/**
 * A hook to check if the application is running on the server side.
 * @returns An object containing the current state of the hook.
 */
export const useSSR = (): SSRState => {
    const [browser, setBrowser] = useState<boolean>(false);

    useEffect(() => {
        setBrowser(isBrowser());
    }, []);

    return {
        isBrowser: browser,
        isServer: !browser,
    };
};
