import React, {useEffect, useState} from "react";
import {PageProps} from "@/types";
import {DashboardApiData} from "@/types/dashboard-types";
import {Input} from "@nextui-org/react";
import {Copy, EyeIcon, EyeOffIcon} from "lucide-react";
import {DashboardSidebarConfig, generateSidebarConfig} from "@/Components/lib/config/dashboard/DashboardSidebarConfig";
import {LandingTextProps} from "@/Components/lib/ui/landing/LandingText";
import {BackgroundContainerProps} from "@/Components/lib/ui/BackgroundContainer";
import {toast} from "sonner";

/**
 * Extract and assemble the user API token from cookies.
 * Removes specific substrings and reassembles the token.
 * @param cookies - The list of cookies from the API headers.
 * @returns The full user API token, or null if not found.
 */
export function extractUserToken(cookies: string[]): string | null {
    const tokenParts: { [key: string]: string } = {};

    // Iterate through each cookie string
    for (const cookie of cookies) {
        // Remove the word "base64-" from the cookie string
        const cleanedCookie = cookie.replace(/base64-/g, "");

        const segments = cleanedCookie.split(";").map((item) => item.trim());

        // Look for parts of 'sb-*auth-token' and collect them
        for (const segment of segments) {
            const matched = segment.match(/sb-\w+-auth-token\.(\d)=(.+)/);
            if (matched) {
                tokenParts[matched[1]] = matched[2];
            }
        }
    }

    // Combine token parts in the correct order to form the full token
    const orderedParts = Object.keys(tokenParts)
        .sort() // Sort keys numerically
        .map((key) => tokenParts[key])
        .join("");

    return orderedParts || null;
}

export type DashboardApiProps = {
    sidebarProps: DashboardSidebarConfig;
    landingTextProps: LandingTextProps;
    backgroundContainerProps: Partial<BackgroundContainerProps>;
};

/**
 * Generate props for the DashboardAPI component.
 * Separates logic for better organization and testability.
 * @param auth - The authenticated user object.
 * @param api_headers - The API headers containing cookies.
 * @returns The props for the DashboardAPI component.
 */
export function generateDashboardApiPageProps({
                                                  auth,
                                                  api_headers,
                                              }: PageProps<DashboardApiData>): DashboardApiProps {
    // Generate the sidebar configuration
    const sidebarProps = generateSidebarConfig(auth.user, "API");

    // State hooks for token and visibility
    const [userToken, setUserToken] = useState<string | null>(null);
    const [isTokenVisible, setIsTokenVisible] = useState(false);

    // Effect to extract and set the user token
    useEffect(() => {
        if (!api_headers?.cookie) return;

        const token = extractUserToken(api_headers.cookie);
        setUserToken(token);
    }, [api_headers?.cookie]);

    /**
     * Copy the token to the clipboard and show a toast notification.
     */
    const handleCopyToClipboard = async () => {
        if (userToken) {
            try {
                await navigator.clipboard.writeText(userToken);
                toast.success("Token copied to clipboard!");
            } catch {
                toast.error("Failed to copy token.");
            }
        }
    };

    /**
     * Toggle the visibility of the API token.
     */
    const toggleTokenVisibility = () => {
        setIsTokenVisible((prev) => !prev);
    };

    const landingTextProps: LandingTextProps = {
        orientation: "left",
        size: "sm",
        title: "Your API Token",
        subtitle: "Use this token to authenticate with the API.",
        bottomContent: (
            <Input
                type={isTokenVisible ? "text" : "password"}
                placeholder="API Token"
                value={userToken ?? "Could not find token"}
                disabled
                endContent={
                    <div className="flex items-center gap-2">
                        {isTokenVisible ? (
                            <EyeOffIcon
                                className="size-4 cursor-pointer"
                                onClick={toggleTokenVisibility}
                            />
                        ) : (
                            <EyeIcon
                                className="size-4 cursor-pointer"
                                onClick={toggleTokenVisibility}
                            />
                        )}
                        <Copy
                            className="size-4 cursor-pointer"
                            onClick={handleCopyToClipboard}
                        />
                    </div>
                }
            />
        ),
    };

    const backgroundContainerProps = {
        className: "p-4 lg:px-8 pb-10 min-h-[80svh]",
    };

    return {
        sidebarProps,
        landingTextProps,
        backgroundContainerProps,
    };
}
