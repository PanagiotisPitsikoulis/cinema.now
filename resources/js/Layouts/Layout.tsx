import React from "react";
import PageContainer from "@/Components/lib/ui/layout/PageContainer";
import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import ApplicationLogo from "@/Components/laravel-defaults/ApplicationLogo";
import {Footer, FooterProps} from "@/Components/lib/ui/layout/footer";
import {Link, usePage} from "@inertiajs/react";
import {UserDropdown} from "@/Components/lib/ui/user-dropdown";


export default function Layout({children}: { children: React.ReactNode }) {
    const footerProps: FooterProps = {
        text: {
            brandName: "CinemaNow",
            copyrightText: "All rights reserved",
            createdByText: "Created by",
            creatorName: "Panagiotis Pitsikoulis"
        },
        creatorExternalLink: "https://www.panagiotispitsikoulis.gr"
    }

    const user = usePage().props.auth.user;


    return <>
        {/*Navbar*/}
        <Navbar shouldHideOnScroll>
            <Link href="/">
                <NavbarBrand>
                    <ApplicationLogo/>
                    <p className="font-bold text-inherit">CINEMA.NOW</p>
                </NavbarBrand>
            </Link>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
            </NavbarContent>
            <NavbarContent justify="end">
                <>
                    {user ? (<>
                        <UserDropdown user={user} text={{
                            logIn: "Log In",
                            logOut: "Log out",
                            dashboard: "Dashboard",
                            signedInAs: "Signed in As"
                        }} logout={() => {
                        }}/>
                    </>) : (<>
                        <NavbarItem className="hidden lg:flex">
                            <Link href="/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/register" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>)}
                </>
            </NavbarContent>
        </Navbar>
        <main className={"bg-background space-y-10 lg:px-14 pb-14 px-4 py-5 pt-5"}>
            <PageContainer>
                {children}
            </PageContainer>
        </main>
        {/*Footer*/}
        <Footer {...footerProps}/>
    </>
}
