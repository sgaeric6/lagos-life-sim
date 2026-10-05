import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#08111f',
        lagoon: '#0f9d8d',
        gold: '#f7c35a',
        sunset: '#ff7a59',
      },
      boxShadow: {
        glow: '0 0 30px rgba(15, 157, 141, 0.5)',
      },
      backgroundImage: {
        'city-glow': 'radial-gradient(circle at top, rgba(37,99,235,0.28), transparent 40%), radial-gradient(circle at bottom, rgba(15,157,141,0.22), transparent 35%)',
      },
    },
  },
  plugins: [],
};

export default config;
