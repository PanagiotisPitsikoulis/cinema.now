"use client";
import {useCallback, useState} from "react";

// Helper to get a cookie value by name
function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
}

// Helper to set a cookie
export function setCookie(
    name: string,
    value: string,
    maxAge: number = 31536000, // Default to 1 year
    path: string = "/"
) {
    document.cookie = `${name}=${encodeURIComponent(
        value
    )}; path=${path}; max-age=${maxAge}`;
}

/**
 * A hook to manage persistent state across page reloads.
 * @param key - The key to use for the cookie.
 * @param initialValue - The initial value to set.
 * @param cookieMaxAge - The maximum age of the cookie in seconds.
 * @returns The current state and a function to update the state.
 */
function usePersistentState<T>(
    key: string,
    initialValue: T extends Function ? never : T, // Exclude callable types
    cookieMaxAge: number = 31536000 // Default to 1 year
) {
    const [state, setState] = useState<T>(() => {
        // Initialize state from cookie or fallback to initialValue
        if (typeof window !== "undefined") {
            try {
                const storedValue = getCookie(key);
                return storedValue ? JSON.parse(storedValue) : initialValue;
            } catch (error) {
                console.warn(`Error reading cookie "${key}":`, error);
                return initialValue;
            }
        }
        return initialValue;
    });

    const updateState = useCallback(
        (value: T | ((prevState: T) => T)) => {
            const newValue =
                typeof value === "function" ? (value as Function)(state) : value;
            setState(newValue);
            try {
                setCookie(key, JSON.stringify(newValue), cookieMaxAge);
            } catch (error) {
                console.warn(`Error setting cookie "${key}":`, error);
            }
        },
        [key, cookieMaxAge, state]
    );

    return [state, updateState] as const;
}

export default usePersistentState;
