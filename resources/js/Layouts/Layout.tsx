import React from "react";
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
} from "@nextui-org/react";
import ApplicationLogo from "@/Components/app/ApplicationLogo";
import { Footer } from "@/Components/lib/ui/footer";
import { Link, usePage } from "@inertiajs/react";
import { UserDropdown } from "@/Components/lib/ui/user-dropdown";
import { cn } from "@/Components/utils";
import PageContainer from "@/Components/lib/ui/landing/PageContainer";
import { ThemeSwitch } from "@/Components/lib/ui/theme-switch";
import { handleLogout } from "@/Components/lib/api/auth";
import { layoutConfig } from "@/Components/lib/config/LayoutConfig";

/**
 *  Layout component for the application.
 *  This is the primary layout wrapper for all pages, including the Navbar, Footer, and main content area.
 * @param children - The children of the layout, i.e., the specific page content.
 * @param className - Additional class to apply custom styling to the layout.
 * @param classNames - Classnames for styling specific parts of the layout, such as the Navbar or main content.
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
                        <ApplicationLogo />
                        <p className="font-bold text-inherit">
                            {layoutConfig.footerProps.text.brandName}
                        </p>
                    </NavbarBrand>
                </Link>
                <NavbarContent className="flex gap-4" justify="center">
                    <NavbarItem className={layoutConfig.navbarThemeSwitchClass}>
                        <ThemeSwitch />
                    </NavbarItem>
                    {layoutConfig.navbarLinks.map((link) => (
                        <NavbarItem className="hidden sm:flex" key={link.href}>
                            <Link color="foreground" href={link.href}>
                                {link.label}
                            </Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>
                <NavbarContent justify="end">
                    {user ? (
                        <UserDropdown
                            user={user}
                            text={layoutConfig.userDropdownText}
                            logout={async () => {
                                await handleLogout();
                            }}
                        />
                    ) : (
                        <>
                            <NavbarItem className="hidden lg:flex">
                                <Link href="/login">Login</Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Button
                                    as={Link}
                                    color="primary"
                                    href="/register"
                                    variant="flat"
                                >
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </>
                    )}
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
            <Footer {...layoutConfig.footerProps} />
        </>
    );
}
