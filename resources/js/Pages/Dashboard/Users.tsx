import { PageProps, User } from "@/types";
import { DashboardUsersData } from "@/types/dashboard-types";
import { DashboardPage } from "@/Components/lib/composed/DashboardPageComposed";
import { generateDashboardUsersPageProps } from "@/Components/lib/config/dashboard/DashboardUsersPageProps";

/**
 * Dashboard Users page. Displays a list of users.
 * @param props - The props for the DashboardUsersPage component.
 */
export default function DashboardUsersPage(
    props: PageProps<DashboardUsersData>
) {
    // Generate dashboard props
    const dashboardProps = generateDashboardUsersPageProps(props);
    return <DashboardPage<User> {...dashboardProps} />;
}
