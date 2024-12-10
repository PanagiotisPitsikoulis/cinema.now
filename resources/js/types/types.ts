export type Movie = {
    id: number;
    name: string;
    description: string;
    image_link: string;
    category: string;
    label: string;
    created_at: string;
    updated_at: string;
}

export type DisplayTime = {
    id: number;
    movie_id: number;
    time_start: string;
    time_end: string;
    created_at: string;
    updated_at: string;
}

export type ExtendedDisplayTime = DisplayTime & {
    reservations: Reservation[];
};

export type ExtendedReservation = Reservation & {
    display_time: DisplayTime & {
        movie: Movie;
    };
};

export type Reservation = {
    id: number;
    display_time_id: number;
    status: string;
    room_order: string;
    user_id: number;
    movie_id: number;
    created_at: string;
    updated_at: string;
};
