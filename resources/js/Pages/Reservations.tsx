import React from "react";
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import Layout from "@/Layouts/Layout";
import {ExtendedReservation} from "@/types/types";
import {Spacer} from "@nextui-org/react";
import {LandingText} from "@/Components/lib/ui/landing/LandingText";
import {generateReservationsPageProps} from "@/Components/lib/config/ReservationsPageProps";
import {Table} from "@/Components/lib/ui/data-table";
import {handleDeleteReservation} from "@/Components/lib/api/reservation";

/**
 * Displays the Reservations page, allowing users to view and manage their reservations.
 * @returns JSX.Element
 */
function Reservations() {
    const props = usePage<PageProps & { reservations?: ExtendedReservation[] }>().props;
    const {reservations = []} = props;

    /**
     * Handles the deletion of a reservation.
     * @param id - The ID of the reservation to delete.
     */
    const deleteItem = async (id: number) => {
        await handleDeleteReservation(id);
        window.location.reload();
    };

    /**
     * Generate props for the Reservations page components.
     */
    const {tableProps, landingTextProps} = generateReservationsPageProps(reservations, deleteItem);

    return (
        // Reusable layout component with Navbar and footer.
        <Layout>
            <section>
                {/* Section Title */}
                <LandingText
                    {...landingTextProps}
                />
                {/*Spacer is used to add some spacing between sections*/}
                <Spacer y={12}/>
                {/* Reservations Table */}
                {reservations.length > 0 ? (
                    <Table {...tableProps} />
                ) : (
                    <p className="text-foreground-500">No reservations found.</p>
                )}
            </section>
        </Layout>
    );
}

export default Reservations;
