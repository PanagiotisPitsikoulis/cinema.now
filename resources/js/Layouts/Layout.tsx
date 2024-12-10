import React from "react";
import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import ApplicationLogo from "@/Components/laravel-defaults/ApplicationLogo";
import {Footer, FooterProps} from "@/Components/lib/ui/footer";
import {Link, usePage} from "@inertiajs/react";
import {UserDropdown} from "@/Components/lib/ui/user-dropdown";
import {cn} from "@/Components/utils";
import PageContainer from "@/Components/lib/ui/landing/PageContainer";
import {ThemeSwitch} from "@/Components/lib/ui/theme-switch";

/**
 * Layout component for the application.
 * @param children - The children of the layout.
 * @param className - Additional class for the layout.
 * @param classNames - Classnames for specific parts of the layout.
 * @returns JSX.Element
 */
export default function Layout({
                                   children,
                                   className,
                                   classNames = {},
                               }: {
    children: React.ReactNode;
    className?: string;
    classNames?: {
        navbar?: string;
        main?: string;
    };
}) {
    const footerProps: FooterProps = {
        text: {
            brandName: "CinemaNow",
            copyrightText: "All rights reserved",
            createdByText: "Created by",
            creatorName: "Panagiotis Pitsikoulis",
        },
        creatorExternalLink: "https://www.panagiotispitsikoulis.gr",
    };

    const user = usePage().props.auth.user;

    return (
        <>
            {/* Navbar */}
            <Navbar
                isBordered={true}
                shouldHideOnScroll
                className={cn(classNames.navbar)}
            >
                <Link href="/">
                    <NavbarBrand>
                        <ApplicationLogo/>
                        <p className="font-bold text-inherit">CINEMA.NOW</p>
                    </NavbarBrand>
                </Link>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem className={"-mx-2"}>
                        <ThemeSwitch/>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/">
                            Home
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/movies" color="foreground" aria-current="page">
                            Movies
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/dashboard">
                            Dashboard
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="/reservations">
                            Reservations
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <>
                        {user ? (
                            <UserDropdown
                                user={user}
                                text={{
                                    logIn: "Log In",
                                    logOut: "Log out",
                                    dashboard: "Dashboard",
                                    signedInAs: "Signed in As",
                                }}
                                logout={() => {
                                }}
                            />
                        ) : (
                            <>
                                <NavbarItem className="hidden lg:flex">
                                    <Link href="/login">Login</Link>
                                </NavbarItem>
                                <NavbarItem>
                                    <Button as={Link} color="primary" href="/register" variant="flat">
                                        Sign Up
                                    </Button>
                                </NavbarItem>
                            </>
                        )}
                    </>
                </NavbarContent>
            </Navbar>
            {/* Main Content */}
            <main
                className={cn(
                    "bg-background space-y-10 lg:px-14 pb-14 px-4 py-5 pt-14",
                    className,
                    classNames.main
                )}
            >
                <PageContainer>{children}</PageContainer>
            </main>
            {/* Footer */}
            <Footer  {...footerProps} />
        </>
    );
}
