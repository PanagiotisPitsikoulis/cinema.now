import {PageProps} from "@/types";
import {DashboardApiData} from "@/types/dashboard-types";
import {SidebarComposed} from "@/Components/lib/composed/SidebarComposed";
import BackgroundContainer from "@/Components/lib/ui/BackgroundContainer";
import {LandingText} from "@/Components/lib/ui/landing/LandingText";
import React from "react";
import {generateDashboardApiPageProps} from "@/Components/lib/config/dashboard/DashboardApiPageProps";

/**
 * Dashboard API page. Displays the API token and allows for copying and toggling.
 * @param props - The props for the DashboardAPI component.
 */
export default function DashboardAPI(props: PageProps<DashboardApiData>) {
    // Generate props for each component
    const {
        sidebarProps,
        landingTextProps,
        backgroundContainerProps,
    } = generateDashboardApiPageProps(props);

    return (
        <SidebarComposed {...sidebarProps}>
            {/* Display the API token */}
            <BackgroundContainer {...backgroundContainerProps}>
                {/* Display the API token */}
                <LandingText {...landingTextProps} />
            </BackgroundContainer>
        </SidebarComposed>
    );
}
