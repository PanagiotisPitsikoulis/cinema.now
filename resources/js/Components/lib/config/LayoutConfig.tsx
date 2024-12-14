import { FooterProps } from "@/Components/lib/ui/footer";

/**
 * Configuration for the Layout component.
 */
export const layoutConfig = {
    footerProps: {
        text: {
            brandName: "CinemaNow",
            copyrightText: "All rights reserved",
            createdByText: "Created by",
            creatorName: "Panagiotis Pitsikoulis",
        },
        creatorExternalLink: "https://www.panagiotispitsikoulis.gr",
    } as FooterProps,

    navbarLinks: [
        { href: "/", label: "Home" },
        { href: "/movies", label: "Movies" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/reservations", label: "Reservations" },
    ],

    userDropdownText: {
        logIn: "Log In",
        logOut: "Log out",
        dashboard: "Dashboard",
        signedInAs: "Signed in As",
    },

    navbarThemeSwitchClass: "-mx-2",

    progressConfig: {
        color: "#4B5563",
    },
};
