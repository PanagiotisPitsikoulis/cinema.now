import {Avatar, Card, CardBody, Spacer} from "@nextui-org/react";
import React, {Dispatch, SetStateAction} from "react";
import {getAvatarUrl} from "@/Components/utils";
import Text from "@/Components/lib/ui/Text";

export type Status = "empty" | "pending" | "booked";

// Seat status colors
const STATUS_COLORS = {
    empty: "", // Empty seats
    pending: "warning", // Reserved but not finalized
    booked: "danger", // Reserved and finalized
};

// Map number to letter
const ALPHABET_ARRAY = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
];

export function SeatGroup({
                              rows,
                              columns,
                              showRowNumbers,
                              showColumnNumbers,
                              rowNumbersOffset,
                              columnNumbersOffset,
                              data,
                          }: {
    rows: number;
    columns: number;
    showRowNumbers?: boolean;
    showColumnNumbers?: boolean;
    rowNumbersOffset?: number;
    columnNumbersOffset?: number;
    data: SeatData[];
}) {
    return (
        <>
            <section className='flex flex-col gap-4'>
                {/* Column Numbers */}
                {showColumnNumbers && (
                    <div
                        className='grid gap-4'
                        style={{gridTemplateColumns: `repeat(${columns + 1}, 1fr)`}}
                    >
                        {Array.from({length: columns}).map((_, i) => (
                            <div
                                className='flex items-center justify-center text-center h-10 w-10 text-foreground-500'
                                key={i}
                            >
                                {columnNumbersOffset ? columnNumbersOffset + i + 1 : i + 1}
                            </div>
                        ))}
                        {/* Offset */}
                        <div></div>
                    </div>
                )}

                {/* Rows and Seats */}
                <div className='flex flex-row-reverse gap-4'>
                    {/* Row Numbers */}
                    <div className='grid gap-4'>
                        {Array.from({length: rows}).map((_, i) => (
                            <div
                                className='flex items-center justify-center h-10 w-10 text-foreground-500'
                                key={i}
                            >
                                {showRowNumbers && (
                                    <>
                                        {
                                            ALPHABET_ARRAY[
                                                rowNumbersOffset ? rowNumbersOffset + i : i
                                                ]
                                        }
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Render Seats */}
                    <div
                        className='grid gap-4'
                        style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}
                    >
                        {data.map((seat, i) => (
                            <div key={seat.id} className='col-span-1'>
                                {seat.userId ? (
                                    <Avatar
                                        isBordered
                                        size='sm'
                                        color={STATUS_COLORS[seat?.status] as any}
                                        src={getAvatarUrl(seat?.userId)}
                                    />
                                ) : (
                                    <>
                                        <Card
                                            className='h-10 w-10 bg-background dark:bg-content2'
                                            shadow='sm'
                                        >
                                            <CardBody></CardBody>
                                        </Card>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

type SeatData = {
    id: number;
    status: Status;
    userId?: string;
};

function SeatSelector({selectedSeat, setSelectedSeat}: {
    selectedSeat: number | null,
    setSelectedSeat: Dispatch<SetStateAction<number | null>>
}) {
    const seatsPlaceholderData: SeatData[] = Array.from(
        {length: 9 * 4 * 2 + 9 * 7 * 2},
        (_, i) => ({
            id: i + 1,
            status: "empty" as Status,
        })
    );

    const reservations: SeatData[] = [
        {
            id: 1,
            status: "booked",
            userId: "1",
        },
        {
            id: 20,
            status: "booked",
            userId: "2",
        },
        {
            id: 36,
            status: "booked",
            userId: "3",
        },
        {
            id: 49,
            status: "booked",
            userId: "4",
        },
    ];

    const reservationsNotFinalized: SeatData[] = [
        {
            id: 69,
            status: "pending",
            userId: "1",
        },
        {
            id: 23,
            status: "pending",
            userId: "2",
        },
        {
            id: 14,
            status: "pending",
            userId: "3",
        },
        {
            id: 55,
            status: "pending",
            userId: "4",
        },
    ];

    const extendedData = seatsPlaceholderData.map((seat) => {
        // Check if the current seat ID matches any finalized reservation
        const finalizedReservation = reservations.find((res) => res.id === seat.id);

        // Check if the current seat ID matches any not-finalized reservation
        const notFinalizedReservation = reservationsNotFinalized.find(
            (res) => res.id === seat.id
        );

        // Return the updated seat data with finalized or not-finalized reservation details
        return (
            finalizedReservation || notFinalizedReservation || seat // Prioritize finalized, then not-finalized, else default seat
        );
    });

    console.log(extendedData);

    function generateSeatGroupData(seats: SeatData[]) {
        const seatGroup1Data = seats.slice(0, 36);
        const seatGroup2Data = seats.slice(36, 72);
        const seatGroup3Data = seats.slice(72, 135);
        const seatGroup4Data = seats.slice(135, 198);
        return {seatGroup1Data, seatGroup2Data, seatGroup3Data, seatGroup4Data};
    }

    const {seatGroup1Data, seatGroup2Data, seatGroup3Data, seatGroup4Data} =
        generateSeatGroupData(extendedData);

    return (
        <div>
            <Text text={{
                title: "Reserve a Seat",
                subtitle: "Choose your preferred seat either by clicking on it in the cinema viewer or by selecting it from the list below."
            }}/>
            <section>
                <Card>
                    <CardBody className='pl-8 pb-8 flex'>
                        <div className='grid gap-20 w-[1165px]'>
                            <div className='grid grid-cols-2 gap-20'>
                                <SeatGroup
                                    columns={9}
                                    rows={4}
                                    showColumnNumbers
                                    data={seatGroup1Data}
                                />
                                <SeatGroup
                                    columns={9}
                                    rows={4}
                                    showColumnNumbers
                                    columnNumbersOffset={9}
                                    showRowNumbers
                                    data={seatGroup2Data}
                                />
                            </div>
                            <div className='grid grid-cols-2 gap-20'>
                                <SeatGroup columns={9} rows={7} data={seatGroup3Data}/>
                                <SeatGroup
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
            </section>
            <Spacer y={8}/>
            <div className='grid lg:grid-cols-2 gap-8 min-h-[400px]'>
                <Card>
                    <CardBody></CardBody>
                </Card>
                <Card>
                    <CardBody></CardBody>
                </Card>
            </div>
        </div>
    );
}

export default SeatSelector;
