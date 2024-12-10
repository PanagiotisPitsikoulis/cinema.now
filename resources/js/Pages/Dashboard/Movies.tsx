import {Movie} from "@/types/types";
import {PageProps} from "@/types";
import {DashboardMoviesData} from "@/types/dashboard-types";
import {DashboardPage} from "@/Components/lib/composed/DashboardPageComposed";
import {generateDashboardMoviesPageProps} from "@/Components/lib/config/dashboard/DashboardMoviesPageProps";

/**
 * DashboardMoviesPage Component
 * @param props - The props for the DashboardMoviesPage component.
 */
export default function DashboardMoviesPage(props: PageProps<DashboardMoviesData>) {
    // Generate dashboard props
    const dashboardProps = generateDashboardMoviesPageProps(props);
    return <DashboardPage<Movie> {...dashboardProps} />;
}
