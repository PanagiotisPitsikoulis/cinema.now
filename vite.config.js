import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import markdown from 'vite-plugin-md';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        markdown({
            markdownItOptions: {
                html: true, // Enable HTML rendering in Markdown
            },
        }),
    ],
    // Make sure .md files are included as assets
    assetsInclude: ["/*.md", "/*.mdx"],
});
