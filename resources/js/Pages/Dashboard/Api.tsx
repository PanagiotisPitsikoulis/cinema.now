import { PageProps } from "@/types";
import { DashboardApiData } from "@/types/dashboard-types";
import { SidebarComposed } from "@/Components/lib/composed/SidebarComposed";
import BackgroundContainer from "@/Components/lib/ui/BackgroundContainer";
import { LandingText } from "@/Components/lib/ui/landing/LandingText";
import { generateDashboardApiPageProps } from "@/Components/lib/config/dashboard/DashboardApiPageProps";
import ReactMarkdown from "react-markdown";
import apiDocs from "../../../../routes/API.md?raw";
import dashboardApiDocs from "../../../../routes/DASHBOARD-API.md?raw";
import { Spacer, Tab, Tabs } from "@nextui-org/react";
import { Head } from "@inertiajs/react";

/**
 * Dashboard API page. Displays the API token and allows for copying and toggling.
 * @param props - The props for the DashboardAPI component.
 */
export default function DashboardAPI(props: PageProps<DashboardApiData>) {
    // Generate props for each component
    const { sidebarProps, landingTextProps } =
        generateDashboardApiPageProps(props);

    return (
        <SidebarComposed {...sidebarProps}>
            <div className="px-4 lg:px-8 max-lg:w-[90vw]">
                {/* Page Title */}
                <Head title="Dashboard API" />
                {/* Display the API token */}
                <LandingText {...landingTextProps} />
                <Spacer y={10} />
                {/* Markdown Viewer Docs */}
                <Tabs aria-label="admin-api-docs" className="">
                    <Tab key="api-docs" title="Api Docs">
                        {/* API */}
                        <ReactMarkdown className={"prose dark:prose-invert"}>
                            {apiDocs}
                        </ReactMarkdown>
                    </Tab>
                    <Tab key="admin-api-docs" title="Admin Api Docs">
                        {/* DashboardAPI */}
                        <ReactMarkdown className={"prose dark:prose-invert"}>
                            {dashboardApiDocs}
                        </ReactMarkdown>
                    </Tab>
                </Tabs>
            </div>
        </SidebarComposed>
    );
}
