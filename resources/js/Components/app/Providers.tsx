import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@/Components/app/ThemeProvider";
import { Toaster } from "sonner";

/**
 * The root provider for the application.
 * It wraps the NextUIProvider and ThemeProvider components.
 * It also includes the Toaster component for displaying toast messages.
 * @param children - The children of the provider.
 * @returns JSX.Element
 */
function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <NextUIProvider>
                    <div className={"dark:border-content2 border-content4"}>
                        {children}
                    </div>
                    <Toaster closeButton={true} richColors={true} />
                </NextUIProvider>
            </ThemeProvider>
        </>
    );
}

export default Providers;
