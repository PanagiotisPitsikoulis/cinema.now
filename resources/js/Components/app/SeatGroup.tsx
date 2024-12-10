import {Avatar, Card, CardBody} from "@nextui-org/react";
import {cn, getAvatarUrl} from "@/Components/utils";
import {Dispatch, SetStateAction} from "react";
import {Reservation} from "@/types/types";
import {getStatusColor} from "@/Components/lib/config/config";

export type Status = "empty" | "pending" | "booked";

const ALPHABET_ARRAY = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function SeatGroup({
                              rows,
                              columns,
                              showRowNumbers,
                              showColumnNumbers,
                              rowNumbersOffset,
                              columnNumbersOffset,
                              data,
                              selectedSeat,
                              setSelectedSeat,
                          }: {
    rows: number;
    columns: number;
    showRowNumbers?: boolean;
    showColumnNumbers?: boolean;
    rowNumbersOffset?: number;
    columnNumbersOffset?: number;
    data: Reservation[];
    selectedSeat: string | null;
    setSelectedSeat: Dispatch<SetStateAction<string | null>>;
}) {
    return (
        <div className="w-[550px]">
            <section className="flex flex-col gap-4">
                {/* Column Numbers */}
                {showColumnNumbers && (
                    <div
                        className="grid gap-4"
                        style={{gridTemplateColumns: `repeat(${columns + 1}, 1fr)`}}
                    >
                        {Array.from({length: columns}).map((_, i) => (
                            <div
                                className="flex items-center justify-center text-center h-10 w-10 text-foreground-500"
                                key={i}
                            >
                                {columnNumbersOffset ? columnNumbersOffset + i + 1 : i + 1}
                            </div>
                        ))}
                        <div></div>
                    </div>
                )}

                {/* Rows and Seats */}
                <div className="flex flex-row-reverse gap-4">
                    {/* Row Numbers */}
                    <div className="grid gap-4">
                        {Array.from({length: rows}).map((_, i) => (
                            <div
                                className="flex items-center justify-center h-10 w-10 text-foreground-500"
                                key={i}
                            >
                                {showRowNumbers && (
                                    <>
                                        {ALPHABET_ARRAY[
                                            rowNumbersOffset ? rowNumbersOffset + i : i
                                            ]}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Render Seats */}
                    <div
                        className="grid gap-4"
                        style={{gridTemplateColumns: `repeat(${columns}, 1fr)`}}
                    >
                        {data.map((seat) => (
                            <div
                                key={seat.id}
                                className={`col-span-1`}
                                onClick={() => {
                                    if (seat.status === "empty") {
                                        setSelectedSeat(seat.id.toString());
                                    }
                                }}
                            >
                                {seat.user_id ? (
                                    <Avatar
                                        isBordered
                                        size="sm"
                                        color={getStatusColor(seat.status)}
                                        src={getAvatarUrl(seat?.user_id.toString())}
                                    />
                                ) : (
                                    <Card
                                        className={cn("h-10 w-10 rounded-md bg-content2",
                                            selectedSeat?.toString() === seat.id.toString() && "border-primary border-2"
                                        )}
                                        shadow="none"
                                    >
                                        <CardBody></CardBody>
                                    </Card>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
