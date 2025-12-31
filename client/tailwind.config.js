/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                spotify: {
                    black: '#121212',
                    dark: '#181818',
                    light: '#282828',
                    green: '#1DB954',
                    gray: '#B3B3B3',
                },
                primary: {
                    50: '#f0fdf4',
                    500: '#22c55e',
                    600: '#16a34a',
                },
            },
            backgroundImage: {
                'gradient-spotify': 'linear-gradient(rgba(0,0,0,0) 0, #121212 100%)',
            },
        },
    },
    plugins: [],
}
