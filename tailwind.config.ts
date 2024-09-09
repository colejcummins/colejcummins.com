import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      animation: {
        blink: 'blink 1.25s cubic-bezier(1, 0.1, 0.1, 1) infinite'
      },
      keyframes: {
        blink: {
          '0%, 100%': {
            opacity: '1'
          },
          '20%, 80%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0'
          }
        }
      }
    }
  },
  plugins: []
};
export default config;
