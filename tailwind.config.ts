import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                // linen: '#F5EBE0',
                // 'linen-dark': '#F0E1D1',
                // 'linen-light': '#FAF5F0',
                // jet: '#292929',
                // raisin: '#272727',
                // 'raisin-dark': '#1F1F1F',
                // // 'raisin-light': '#333333',
                // 'raisin-light': '#3D3D3D',
                moonstone: '#559CAD',
                'moonstone-dark': '#498897',
                'moonstone-light': '#68A6B6',
                // keppel: '#55AA99',
                // 'keppel-dark': '#52A393',
                // 'keppel-light': '#6AB4A5',
                crayola: '#E57A44',
                'crayola-dark': '#E4723A',
                'crayola-light': '#E98C5D',

                alter: '#191A1A',
                'alter-mid': '#141515',
                'alter-dark': '#0A0A0A',
                'alter-mid-light': '#282A2A',
                'alter-light': '#323434',

                eggshell: '#F3EFE0',
                // 'eggshell-dark': '#EEE8D3',
                // 'eggshell-light': '#F9F7F0',
                coral: '#EF6F6C',
                'coral-dark': '#ED5C5A',
                'coral-light': '#F1807E',
                'coral-text': '#680200',
                // dun: '#CBC0AD',
                // 'dun-dark': '#BFB39B',
                // 'dun-light': '#D7CFC1',
                main: '#E8DFD0',
                'main-mid': '#DED4C3',
                
                // 'main-mid': '#C7CABA',
                'main-dark': '#CCC1AE',
                'main-mid-light': '#EDE5D8',
                'main-light': '#F2EBE0',
                // EBECE7

                ochre: '#DB7C26',
                'ochre-dark': '#C16E1F',
                'ochre-light': '#E08C3E',
                'ochre-text': '#683200',
                'ochre-light-text': '#2F1700',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
