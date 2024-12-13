import { DisplayTime } from "@/types/types";
import { PageProps } from "@/types";
import { DashboardDisplayTimesData } from "@/types/dashboard-types";
import { DashboardPage } from "@/Components/lib/composed/DashboardPageComposed";
import { generateDashboardDisplayTimesPageProps } from "@/Components/lib/config/dashboard/DashboardDisplayTimesPageProps";

/**
 * DashboardMoviesPage Component
 */
export default function DashboardDisplayTimesPage(
    props: PageProps<DashboardDisplayTimesData>
) {
    // Generate dashboard props
    const dashboardProps = generateDashboardDisplayTimesPageProps(props);
    // Render dashboard display times page
    return <DashboardPage<DisplayTime> {...dashboardProps} />;
}
