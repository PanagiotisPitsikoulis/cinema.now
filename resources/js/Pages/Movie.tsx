import Layout from "@/Layouts/Layout";
import React from "react";
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import type {Movie} from "@/types/types";
import Text from "@/Components/lib/ui/Text";
import {FeaturedCarousel} from "@/Components/lib/ui/FeaturedCarousel";
import SeatSelector from "@/Components/app/SeatSelector";
import {Spacer} from "@nextui-org/react";
import {AnimatedWrapper} from "@/Components/lib/ui/AnimatedWrapper";


export default function Movie() {
    const {movie, auth} = usePage<PageProps & { movie: Movie }>().props;
    const [activeShowtime, setActiveShowtime] = React.useState<string>("8");
    const [selectedSeat, setSelectedSeat] = React.useState<number | null>(null);

    const handleSeatSelection = (seatNumber: number) => {
        setSelectedSeat(seatNumber === selectedSeat ? null : seatNumber); // Deselect if clicked again
    };

    return (
        <Layout>
            {/* Movie Section */}
            <AnimatedWrapper left={40} duration={0.5}>
                <section>
                    <Text text={{
                        title: `Book a Seat for the Movie: ${movie.name}`,
                        subtitle: "Choose one of the available display times and pick your desired seat, then press Book Now to reserve your seat.",
                    }}/>
                    {movie &&
                        <FeaturedCarousel buttonProps={{children: "All Movies"}} link={{href: "/movies"}}
                                          items={[movie]}/>}
                </section>
            </AnimatedWrapper>
            <Spacer y={10}/>

            {/* Seat Selection */}
            <SeatSelector selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat}/>
        </Layout>
    );
}
