import {LandingSectionProps} from "@/Components/lib/ui/landing/LandingSection";
import {LandingTextProps} from "@/Components/lib/ui/landing/LandingText";
import type {ExtendedDisplayTime, Movie} from "@/types/types";
import React, {Dispatch, SetStateAction} from "react";
import SeatSelector from "@/Components/app/SeatSelector";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Spacer,} from "@nextui-org/react";
import useSeatData from "@/Components/app/useSeatData";
import {FeaturedCarousel} from "@/Components/lib/ui/FeaturedCarousel";
import {handlePostReservation} from "@/Components/lib/api/reservation";
import {BackgroundContainerProps} from "@/Components/lib/ui/BackgroundContainer";

export type MoviePageProps = {
    heroSectionProps: LandingSectionProps;
    seatSelectorProps: LandingSectionProps;
    submitSectionProps: LandingTextProps;
    backgroundContainerProps: Partial<BackgroundContainerProps>;
}

/**
 * Generates component props for the Movie page.
 * @param movie - The movie to display.
 * @param displayTimes - The display times for the movie.
 * @param selectedDisplayTime - The currently selected display time.
 * @param selectedSeat - The currently selected seat.
 * @param setSelectedDisplayTime - A function to set the selected display time.
 * @param setSelectedSeat - A function to set the selected seat.
 * @returns Component props for the Movie page.
 */
export function generateMoviePageProps(
    movie: Movie,
    displayTimes: ExtendedDisplayTime[] | undefined,
    selectedDisplayTime: number,
    selectedSeat: string | null,
    setSelectedDisplayTime: (time: number) => void,
    setSelectedSeat: Dispatch<SetStateAction<string | null>>
): MoviePageProps {
    // Generate seat data for the SeatSelector component
    const heroSectionProps: LandingSectionProps = {
        className: "py-0",
        orientation: "left",
        contentBottom: true,
        landingTextProps: {
            classNames: {title: "lg:w-2/4", subtitle: "lg:w-[30rem] text-justify"},
            title: `Book a Seat for the Movie: ${movie.name}`,
            subtitle:
                "Choose one of the available display times and pick your desired seat, then press Book Now to reserve your seat.",
            size: "sm",
        },
        content: (
            <FeaturedCarousel
                buttonProps={{children: "All Movies"}}
                link={{href: "/movies"}}
                items={[movie]}
            />
        ),
    };

    // Generate component props for the SeatSelector component
    const seatSelectorProps: LandingSectionProps = {
        className: "py-0 overflow-visible",
        orientation: "left",
        contentBottom: true,
        landingTextProps: {
            classNames: {title: "lg:w-[30rem]", subtitle: "lg:w-[30rem] text-justify"},
            title: "Choose one of the available display times",
            subtitle:
                "Select the time that suits you best in the dropdown menu. Then, select the seat you wish to reserve, either on the interactive seat selector, or on the list.",
            size: "sm",
        },
        content: (
            <div>
                {displayTimes && (
                    <Dropdown>
                        <DropdownTrigger>
                            <Button color={"primary"} size={"lg"} variant={"flat"}>
                                {displayTimes.find((dt) => dt.id === selectedDisplayTime)?.time_start || "Select Time"}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            color={"primary"}
                            onAction={(key) => setSelectedDisplayTime(Number(key))}
                            selectedKeys={[selectedDisplayTime?.toString() || ""]}
                            selectionMode="single"
                        >
                            {displayTimes.map((time) => (
                                <DropdownItem key={time.id.toString()}>
                                    {time.time_start} - {time.time_end}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                )}
                <Spacer y={4}/>
                <SeatSelector
                    key={selectedDisplayTime}
                    selectedSeat={selectedSeat}
                    setSelectedSeat={setSelectedSeat}
                    seatData={useSeatData(displayTimes, selectedDisplayTime, movie.id)}
                />
            </div>
        ),
    };

    // Generate component props for the Submit section
    const submitSectionProps: LandingTextProps = {
        classNames: {title: "lg:w-[30rem]", subtitle: "lg:w-[30rem] text-justify"},
        size: "sm",
        orientation: "left",
        bottomContent: (
            <section className="flex flex-col items-start mt-6">
                <div className={"flex flex-row gap-2"}>
                    <Button
                        color="primary"
                        size="lg"
                        className="w-fit"
                        isDisabled={!selectedSeat}
                        onPress={() => handlePostReservation(movie, selectedDisplayTime, selectedSeat)}
                    >
                        Reserve your Seat
                    </Button>
                    <Button
                        size="lg"
                        variant="bordered"
                        isDisabled={!selectedSeat}
                        onPress={() => setSelectedSeat(null)}
                    >
                        Cancel Selection
                    </Button>
                </div>
                <small className="mt-3 text-foreground-500">
                    Note: You can only reserve one seat at a time.
                </small>
            </section>
        ),
        title: selectedSeat ? `Press here to reserve seat: ${selectedSeat}` : "Select a seat to reserve",
        subtitle: `The display time you have selected is: ${
            displayTimes?.find((dt) => dt.id === selectedDisplayTime)?.time_start
        }. Your reservation will appear in your reservations list in your profile, and you will be redirected there.`,
    };

    // Generate props for the BackgroundContainer component
    const backgroundContainerProps: Partial<BackgroundContainerProps> = {
        background: "/svgs/bg-svg.svg",
        className: "h-[calc(100svh-theme(spacing.4))] lg:h-[calc(80svh-theme(spacing.8))]",
    };

    return {
        heroSectionProps,
        seatSelectorProps,
        submitSectionProps,
        backgroundContainerProps,
    };
}
