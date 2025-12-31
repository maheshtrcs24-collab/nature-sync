/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9f1',
                    100: '#dcf1df',
                    200: '#bbe3c2',
                    300: '#8ecc98',
                    400: '#5bab69',
                    500: '#3a8d4a',
                    600: '#2a7139',
                    700: '#235a30',
                    800: '#1f4829',
                    900: '#1a3c24',
                },
            },
        },
    },
    plugins: [],
}
