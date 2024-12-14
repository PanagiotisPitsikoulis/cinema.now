import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Avatar, Card, CardBody, Chip } from "@nextui-org/react";
import { Table } from "@/Components/lib/ui/data-table";
import { SeatGroup } from "@/Components/app/SeatGroup";
import { getAvatarUrl } from "@/Components/utils";
import { Reservation } from "@/types/types";
import { getStatusColor } from "@/Components/lib/config/config";

/**
 * SeatSelector component for the SeatSelector page.
 * @param selectedSeat
 * @param setSelectedSeat
 * @param seatData
 * @constructor
 */
export const SeatSelector = ({
    selectedSeat,
    setSelectedSeat,
    seatData,
}: {
    selectedSeat: string | null;
    setSelectedSeat: Dispatch<SetStateAction<string | null>>;
    seatData: Reservation[];
}) => {
    // Use seatData directly to split into groups
    const generateSeatGroupData = useCallback((seats: Reservation[]) => {
        return {
            seatGroup1Data: seats.slice(0, 36),
            seatGroup2Data: seats.slice(36, 72),
            seatGroup3Data: seats.slice(72, 135),
            seatGroup4Data: seats.slice(135, 198),
        };
    }, []);

    const { seatGroup1Data, seatGroup2Data, seatGroup3Data, seatGroup4Data } =
        useMemo(
            () => generateSeatGroupData(seatData),
            [seatData, generateSeatGroupData]
        );

    const seatColumns = useMemo(
        () => [
            { key: "id", label: "Seat ID" },
            { key: "status", label: "Status" },
            { key: "user", label: "User" },
        ],
        []
    );

    const handleSelectionChange = useCallback(
        (data: any) => {
            const selectedKey = data.currentKey;
            const relevantData = seatData.find(
                (seat) => seat.id?.toString() === selectedKey
            );
            console.log("relevantData:", relevantData);

            if (relevantData?.status === "empty") {
                setSelectedSeat(selectedKey);
            }
        },
        [seatData, setSelectedSeat]
    );

    const renderCell = useCallback(
        (seat: Reservation, columnKey: React.Key) => {
            switch (columnKey) {
                case "id":
                    return seat.id;
                case "status":
                    return (
                        <Chip
                            size={"sm"}
                            variant={"flat"}
                            className={`capitalize`}
                            color={getStatusColor(seat.status)}
                        >
                            {seat.status}
                        </Chip>
                    );
                case "user":
                    return seat.user_id ? (
                        <Avatar
                            size="sm"
                            src={getAvatarUrl(seat.user_id.toString())}
                            alt={`User ${seat.user_id}`}
                        />
                    ) : (
                        "N/A"
                    );
                default:
                    return null;
            }
        },
        []
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card shadow={"sm"} className="lg:col-span-3">
                <CardBody className="pl-8 pb-8 flex">
                    <div className="grid gap-20 min-w-[1165px]">
                        <div className="grid grid-cols-2 gap-20">
                            <SeatGroup
                                selectedSeat={selectedSeat}
                                setSelectedSeat={setSelectedSeat}
                                columns={9}
                                rows={4}
                                showColumnNumbers
                                data={seatGroup1Data}
                            />
                            <SeatGroup
                                selectedSeat={selectedSeat}
                                setSelectedSeat={setSelectedSeat}
                                columns={9}
                                rows={4}
                                showColumnNumbers
                                columnNumbersOffset={9}
                                showRowNumbers
                                data={seatGroup2Data}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-20">
                            <SeatGroup
                                selectedSeat={selectedSeat}
                                setSelectedSeat={setSelectedSeat}
                                columns={9}
                                rows={7}
                                data={seatGroup3Data}
                            />
                            <SeatGroup
                                selectedSeat={selectedSeat}
                                setSelectedSeat={setSelectedSeat}
                                columns={9}
                                rows={7}
                                showRowNumbers
                                rowNumbersOffset={4}
                                data={seatGroup4Data}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Table
                key={selectedSeat}
                itemsPerPage={200}
                tableProps={{
                    className: "h-[765px] text-foreground-500",
                    selectionMode: "single",
                    color: "primary",
                    selectedKeys: [selectedSeat?.toString() ?? ""],
                    onSelectionChange: handleSelectionChange,
                }}
                columns={seatColumns}
                tableTopContentProps={{ text: { search: "Search seats..." } }}
                data={seatData}
                renderCell={renderCell}
            />
        </div>
    );
};

export default SeatSelector;
