import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Hashes a string using the FNV-1a algorithm.
 * @param input - The input string to hash.
 * @returns The hashed string.
 */
function hashString(input: string) {
    let hash = 2166136261; // FNV offset basis
    for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i); // XOR with the character code
        hash *= 16777619; // FNV prime
    }
    return (hash >>> 0).toString(16); // Ensure unsigned integer and convert to hex
}

/**
 * Generates a Gravatar URL for the given ID.
 * @param id - The ID to generate the URL for.
 * @returns The Gravatar URL.
 */
export function getAvatarUrl(id: string) {
    if (!id) {
        return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon";
    }
    const hash = hashString(id.trim().toLowerCase()); // Generate hash
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}

/**
 * Combines Tailwind classes using clsx.
 * @param inputs - The Tailwind classes to combine.
 * @returns The combined Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
