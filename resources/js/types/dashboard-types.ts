import type {ExtendedDisplayTime, ExtendedReservation, Movie} from "@/types/types";
import {User} from "@/types/index";
import {Dispatch, Key, SetStateAction} from "react";

export type ApiHeaders = {
    host: string[];
    connection: string[];
    "cache-control"?: string[];
    "sec-ch-ua"?: string[];
    "sec-ch-ua-mobile"?: string[];
    "sec-ch-ua-platform"?: string[];
    dnt?: string[];
    "upgrade-insecure-requests"?: string[];
    "user-agent"?: string[];
    accept?: string[];
    "sec-fetch-site"?: string[];
    "sec-fetch-mode"?: string[];
    "sec-fetch-user"?: string[];
    "sec-fetch-dest"?: string[];
    referer?: string[];
    "accept-encoding"?: string[];
    "accept-language"?: string[];
    cookie?: string[];
};

export type PaginatedData<T> = {
    data: T[];
    current_page: number;
    per_page: number;
    has_more: boolean;
};

export type DashboardHomeData = {
    movies: Movie[];
};

export type DashboardMoviesData = {
    movies: PaginatedData<Movie>;
};

export type DashboardDisplayTimesData = {
    display_times: PaginatedData<ExtendedDisplayTime>;
};

export type DashboardReservationsData = {
    reservations: PaginatedData<ExtendedReservation>;
};

export type DashboardUsersData = {
    users: PaginatedData<User>;
};

export type DashboardApiData = {
    api_headers: ApiHeaders;
    user: User;
};

export type DashboardPageProps<T> = {
    hasMore: boolean;
    selectedId: number | null;
    setSelectedId: Dispatch<SetStateAction<number | null>>;
    auth: {
        user: User;
    }
    activeItem: string;
    text: {
        createTitle: string;
        createSubtitle: string;
        editTitle?: string;
        editSubtitle?: string;
    };
    createForm: {
        schema: {
            fields: { label: string; name: keyof T; type: string; required?: boolean }[];
        };
        initialValues: Partial<T>;
        onSubmit: (values: Partial<T>) => Promise<void>;
    };
    editForm: {
        schema: {
            fields: { label: string; name: keyof T; type: string; required?: boolean }[];
        };
        onSubmit: (values: Partial<T>) => Promise<void>;
    };
    selectedItem: T | null;
    onDeleteItem: (item: T) => Promise<void>;
    table: {
        columns: { key: string; label: string }[];
        data: T[];
        renderCell: (item: T, columnKey: Key) => React.ReactNode;
    };
    pagination: {
        hasMore: boolean;
        loading: boolean;
        onLoadMore: () => Promise<void>;
    };
    tableProps: {
        selectedKeys: Set<unknown>;
        onSelectionChange: (keys: Set<unknown>) => void;
    };
};