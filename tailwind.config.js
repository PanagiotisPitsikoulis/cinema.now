import defaultTheme from 'tailwindcss/defaultTheme';

const { nextui } = require("@nextui-org/react");
const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        }
    },
    darkMode: "class",
    plugins: [
        require('@tailwindcss/typography'),
        animate,
        nextui()
    ],
};
