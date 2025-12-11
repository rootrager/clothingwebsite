import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "vintage-cream": "#EAE8DC",
                "almost-black": "#1A1A1A",
                "vintage-red": "#8C2F2F", // Refined from jersey
                "denim-blue": "#6B7C8E",
                "ivory": "#FFFFF0",
                "secondary-box": "#EAE8DC",
            },
            fontFamily: {
                heading: ["Clash Display", "sans-serif"],
                serif: ["Playfair Display", "serif"],
                gravitas: ["var(--font-gravitas)", "serif"],
                body: ["Geist Mono", "monospace"], // Using existing Geist Mono or fallback
            },
        },
    },
    plugins: [],
};
export default config;
