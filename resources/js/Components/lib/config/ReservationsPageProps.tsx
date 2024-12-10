import {ExtendedReservation} from "@/types/types";
import {getStatusColor} from "@/Components/lib/config/config";
import {Button, ButtonGroup, Chip} from "@nextui-org/react";
import {Trash} from "lucide-react";
import {LinkIcon} from "@nextui-org/shared-icons";
//@ts-ignore
import {TableProps} from "@/Components/lib/ui/table";
import {LandingTextProps} from "@/Components/lib/ui/landing/LandingText";
import {Key} from "react";

export type ReservationsPageProps = {
    landingTextProps: LandingTextProps;
    tableProps: TableProps<ExtendedReservation>;
}

/**
 * Generates props for the Reservations page components.
 * @param reservations - The list of reservations to display.
 * @param handleDelete - The function to handle reservation deletion.
 * @returns Props for the Reservations page components, including the LandingText props.
 */
export function generateReservationsPageProps(
    reservations: ExtendedReservation[],
    handleDelete: (id: number) => void
): ReservationsPageProps {
    /**
     * Generate props for the LandingText component.
     * The landingTextProps object contains the props for the LandingText component, including size, classNames, orientation, title, and subtitle.
     */
    const landingTextProps: LandingTextProps = {
        size: "sm",
        classNames: {title: "lg:w-[30rem]", subtitle: "lg:w-[30rem] text-justify"},
        orientation: "left",
        title: "Your Active Movie Reservations",
        subtitle:
            "View your reservations and manage your bookings. Your reservations pending approval will be listed here, and your confirmed reservations will be listed below.",
    }

    /**
     * Generate props for the Table component.
     * The tableProps object contains the props for the Table component, including the tableTopContentProps, columns, data, renderCell, and itemsPerPage.
     * The tableTopContentProps object contains the props for the TableTopContent component, including text and filterValue.
     * The columns array contains the column definitions for the table, including key and label.
     * The data array contains the data to be displayed in the table.
     * The renderCell function is used to render the content of each cell in the table.
     * The itemsPerPage property specifies the number of items to display per page.
     */
    const tableProps: TableProps<ExtendedReservation> = {
        tableTopContentProps: {
            text: {
                search: "Search Reservations"
            }
            ,
        }
        ,
        columns: [
            {key: "movie", label: "Movie"},
            {key: "showtime", label: "Showtime"},
            {key: "seat", label: "Seat"},
            {key: "status", label: "Status"},
            {key: "actions", label: "Actions"},
        ],
        data:
            reservations.map((item) => ({
                ...item,
                name: item.display_time.movie.name,
                description: item.display_time.movie.description,
            })),
        renderCell:
            (item: ExtendedReservation, columnKey: Key) => {
                switch (columnKey) {
                    case "movie":
                        return (
                            <div className="flex items-center gap-3">
                                <img
                                    src={item.display_time.movie.image_link}
                                    alt={item.display_time.movie.name}
                                    className="w-10 h-10 object-cover rounded"
                                />
                                <div className="flex flex-col">
                                    <h3>{item.display_time.movie.name}</h3>
                                    <p className="text-foreground-400 text-xs line-clamp-1 max-w-[500px]">
                                        {item.display_time.movie.description}
                                    </p>
                                </div>
                            </div>
                        );
                    case "showtime":
                        return (
                            <span className="text-xs">
                                {item.display_time.time_start} - {item.display_time.time_end}
                            </span>
                        );
                    case "seat":
                        return (
                            <Chip size="sm" variant="flat" className="capitalize">
                                {item.room_order}
                            </Chip>
                        );
                    case "status":
                        return (
                            <Chip
                                size="sm"
                                variant="flat"
                                className="capitalize"
                                color={getStatusColor(item.status)}
                            >
                                {item.status}
                            </Chip>
                        );
                    case "actions":
                        return (
                            <ButtonGroup>
                                <Button
                                    as="a"
                                    href={`/movie/${item.display_time.movie.id}`}
                                    size="sm"
                                    variant="flat"
                                    startContent={<LinkIcon className="text-foreground-500 size-4"/>}
                                >
                                    View
                                </Button>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    startContent={<Trash className="text-foreground-500 size-4"/>}
                                    variant="flat"
                                    onPress={() => handleDelete(item.id)}
                                />
                            </ButtonGroup>
                        );
                    default:
                        return null;
                }
            },
        itemsPerPage:
            10,
        ariaLabel:
            "Reservations Table",
    }

    return {
        landingTextProps,
        tableProps,
    }
}
