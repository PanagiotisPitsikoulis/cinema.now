// Import the application's CSS file for styling
import "../css/app.css";

// Import the bootstrap file for initializing dependencies and configurations
import "./bootstrap";

// Import necessary packages for Inertia.js and React integration
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

// Import custom Providers component for wrapping the application with global contexts
import Providers from "@/Components/app/Providers";

// Set the application name from environment variables, defaulting to "CINEMA.NOW" if not set
const appName = import.meta.env.VITE_APP_NAME || "CINEMA.NOW";

// Create the Inertia application
createInertiaApp({
    // Define how the document title will be generated
    // Each page title will be suffixed with the application name
    title: (title) => `${title} - ${appName}`,

    // Resolve the Inertia page components dynamically
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`, // Specify the path to the page
            import.meta.glob("./Pages/**/*.tsx") // Use Vite's glob import to load all page components
        ),

    // Setup the application rendering
    setup({ el, App, props }) {
        const root = createRoot(el); // Create a React root for rendering

        // Render the application wrapped in the custom Providers component
        root.render(
            <Providers>
                <App {...props} />
            </Providers>
        );
    },

    // Configure the progress bar for page navigation
    progress: {
        color: "#4B5563", // Set the color of the progress bar
    },
});
