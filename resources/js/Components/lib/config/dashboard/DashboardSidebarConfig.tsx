import {DropdownItem, Link} from "@nextui-org/react";
import {BracketsIcon, ChevronLeftIcon, Clock3Icon, Home, PlayIcon, TagIcon, UsersIcon} from "lucide-react";
import React from "react";
import {User} from "@/types";

const items = [
    {
        title: "Home",
        url: "/dashboard",
        icon: <Home/>,
    },
    {
        title: "Movies",
        url: "/dashboard/movies",
        icon: <PlayIcon/>,
    },
    {
        title: "Display Times",
        url: "/dashboard/display-times",
        icon: <Clock3Icon/>,
    },
    {
        title: "Reservations",
        url: "/dashboard/reservations",
        icon: <TagIcon/>,
    },
    {
        title: "Users",
        url: "/dashboard/users",
        icon: <UsersIcon/>,
    },
    {
        title: "API",
        url: "/dashboard/api",
        icon: <BracketsIcon/>,
    },
    {
        title: "Back to Website",
        url: "/",
        icon: <ChevronLeftIcon/>,
    }
]

export type DashboardSidebarConfig = {
    activeItem: string;
    sidebarFooterContent: React.ReactNode;
    user: User;
    items: { title: string; url: string; icon: React.ReactNode }[];
    dropdownMenuItems: React.ReactNode;
    text: {
        signedInAs: string;
        searchPlaceholder: string;
        searchResultsText: string;
        toggleSidebar: string;
    };
}

/**
 * Generates props for the SidebarComposed component.
 * @param user - The authenticated user object.
 * @param activeItem - The currently active item in the sidebar.
 * @returns Props for SidebarComposed.
 */
export function generateSidebarConfig(user: User, activeItem: typeof items[number]["title"]): DashboardSidebarConfig {
    // Define the active item in the sidebar.

    // Define the sidebar footer content.
    const sidebarFooterContent = (
        <p className="text-xs flex flex-col text-default-400">
            Created by{" "}
            <Link
                color="foreground"
                size="sm"
                showAnchorIcon
                isExternal
                href="https://www.panagiotispitsikoulis.gr"
            >
                Pitsikoulis Panagiotis
            </Link>
        </p>
    );

    // Define the dropdown menu items for the user.
    const dropdownMenuItems = (
        <>
            <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
            </DropdownItem>
            <DropdownItem key="home" href="/">
                Home
            </DropdownItem>
            <DropdownItem
                key="logout"
                color="danger"
                onPress={() => {
                }}
            >
                Log Out
            </DropdownItem>
        </>
    );

    // Define the text configuration for the sidebar.
    const text = {
        signedInAs: "Signed in as",
        searchPlaceholder: "Search",
        searchResultsText: "Search Results",
        toggleSidebar: "Toggle Sidebar",
    };

    // Return all the props as a single object.
    return {
        activeItem,
        sidebarFooterContent,
        user,
        items,
        dropdownMenuItems,
        text,
    };
}
