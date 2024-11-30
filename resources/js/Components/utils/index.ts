import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

// Simple hash function (FNV-1a Hash)
function hashString(input: string) {
    let hash = 2166136261; // FNV offset basis
    for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i); // XOR with the character code
        hash *= 16777619; // FNV prime
    }
    return (hash >>> 0).toString(16); // Ensure unsigned integer and convert to hex
}

export function getAvatarUrl(id: string) {
    if (!id) {
        return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon";
    }
    const hash = hashString(id.trim().toLowerCase()); // Generate hash
    return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
