import { Reservation } from "@/types/types";
import { PageProps } from "@/types";
import { DashboardReservationsData } from "@/types/dashboard-types";
import { DashboardPage } from "@/Components/lib/composed/DashboardPageComposed";
import { generateDashboardReservationsPageProps } from "@/Components/lib/config/dashboard/DashboardReservationsPageProps";

/**
 * DashboardReservationsPage Component
 * @param props - The props for the DashboardReservationsPage component.
 */
export default function DashboardReservationsPage(
    props: PageProps<DashboardReservationsData>
) {
    // Generate dashboard props
    const dashboardProps = generateDashboardReservationsPageProps(props);
    return <DashboardPage<Reservation> {...dashboardProps} />;
}
