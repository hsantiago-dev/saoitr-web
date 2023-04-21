/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme'

export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
  './src/app/**/*.{js,ts,jsx,tsx}',
]
export const theme = {
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    colors: {
      white: '#FFFFFF',
      grey: {
        900: '#181E24',
        800: '#1D252C',
        700: '#232B33',
      },
      green: '#60D394',
      blue: '#90E0EF',
      purple: '#A594F9',
      yellow: '#FFD97D',
      redLight: '#FF9B85',
      red: '#EE6055',
    }
  },
  fontFamily: {
    sans: ['var(--font-sans)', ...fontFamily.sans],
    mono: ['var(--font-mono)', ...fontFamily.mono],
  },
}
export const plugins = []
