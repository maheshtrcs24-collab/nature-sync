/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#00ff88', // Green
                secondary: '#9d00ff', // Purple
                dark: '#0a0a0a',
                glass: 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                sans: ['Figtree', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
