import '../css/app.css';
import './bootstrap';

import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {createRoot} from 'react-dom/client';
import Providers from "@/Components/app/Providers";

const appName = import.meta.env.VITE_APP_NAME || 'CINEMA.NOW';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({el, App, props}) {
        const root = createRoot(el);

        root.render(<Providers><App {...props} /></Providers>);
    },
    progress: {
        color: '#4B5563',
    },
});
