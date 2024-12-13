import React, { useEffect, useState } from "react";
import { PageProps } from "@/types";
import { DashboardApiData } from "@/types/dashboard-types";
import { Input } from "@nextui-org/react";
import { Copy, EyeIcon, EyeOffIcon } from "lucide-react";
import {
    DashboardSidebarConfig,
    generateSidebarConfig,
} from "@/Components/lib/config/dashboard/DashboardSidebarConfig";
import { LandingTextProps } from "@/Components/lib/ui/landing/LandingText";
import { BackgroundContainerProps } from "@/Components/lib/ui/BackgroundContainer";
import { toast } from "sonner";

export type DashboardApiProps = {
    sidebarProps: DashboardSidebarConfig;
    landingTextProps: LandingTextProps;
    backgroundContainerProps: Partial<BackgroundContainerProps>;
};

/**
 * Generate props for the DashboardAPI component.
 * Separates logic for better organization and testability.
 * @param auth - The authenticated user object.
 * @param api_token - The API token, potentially null or undefined.
 * @returns The props for the DashboardAPI component.
 */
export function generateDashboardApiPageProps({
    auth,
    api_token,
}: PageProps<DashboardApiData>): DashboardApiProps {
    console.log(api_token);

    // Generate the sidebar configuration
    const sidebarProps = generateSidebarConfig(auth.user, "API");

    // State to handle token visibility
    const [isTokenVisible, setIsTokenVisible] = useState(false);

    // Ensure a valid token or fallback message
    const userToken = api_token || "Token not available";

    /**
     * Copy the token to the clipboard and show a toast notification.
     */
    const handleCopyToClipboard = async () => {
        if (api_token) {
            try {
                await navigator.clipboard.writeText(api_token);
                toast.success("Token copied to clipboard!");
            } catch {
                toast.error("Failed to copy token.");
            }
        } else {
            toast.error("No token available to copy.");
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
                value={userToken}
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
