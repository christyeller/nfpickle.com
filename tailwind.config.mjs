/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - "Natural Pickleball" palette (from logo)
        lime: {
          DEFAULT: '#E49B0B',
          50: '#F5F7F3',
          100: '#E8EDE3',
          200: '#D4DCC9',
          300: '#B8C5A8',
          400: '#8FA07A',
          500: '#E49B0B',
          600: '#364228',
          700: '#2D3721',
          800: '#232B1A',
          900: '#1A1F13',
        },
        court: {
          DEFAULT: '#275A6D',
          light: '#3A7A92',
          dark: '#1A3D4A',
        },
        coral: {
          DEFAULT: '#207349',
          light: '#8FAF93',
          dark: '#4A6B4E',
        },
        // Secondary Colors
        teal: {
          DEFAULT: '#275A6D',
          light: '#4A8BA3',
          dark: '#1A3D4A',
        },
        sunset: {
          DEFAULT: '#207349',
          light: '#8FAF93',
          dark: '#4A6B4E',
        },
        purple: {
          DEFAULT: '#5A7A8C',
          light: '#7A9AAC',
          dark: '#3A5A6C',
        },
        // Neutrals - Cream/Natural Tones
        charcoal: {
          DEFAULT: '#2C2C2C',
          light: '#3D3D3D',
          dark: '#1A1A1A',
        },
        cream: {
          DEFAULT: '#FCF9F0',
          light: '#FDFAF1',
          dark: '#F9F5EC',
        },
        // Legacy colors (for gradual migration)
        primary: {
          DEFAULT: '#275A6D',
          light: '#4A8BA3',
          dark: '#1A3D4A',
        },
        secondary: '#207349',
        accent: '#E49B0B',
        dark: {
          DEFAULT: '#1A1A1A',
          blue: '#0E4A60',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 7s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.8s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.8s ease-out forwards',
        'gradient': 'gradient-shift 8s ease infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'blob': 'blob 7s infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'magnetic': 'magnetic 0.3s ease-out',
        'wave': 'wave 2.5s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'text-reveal': 'text-reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'border-flow': 'border-flow 3s linear infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, -30px) scale(1.1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '75%': { transform: 'translate(30px, 10px) scale(1.05)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(228, 155, 11, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(228, 155, 11, 0.5)' },
        },
        magnetic: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(var(--x), var(--y))' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-5px) rotate(2deg)' },
          '75%': { transform: 'translateY(5px) rotate(-2deg)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #275A6D 0%, #E49B0B 50%, #207349 100%)',
        'cta-gradient': 'linear-gradient(90deg, #E49B0B 0%, #275A6D 100%)',
        'accent-gradient': 'linear-gradient(180deg, #207349 0%, #E49B0B 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1A1A1A 0%, #275A6D 100%)',
        'mesh-gradient': `
          radial-gradient(at 40% 20%, rgba(90, 122, 140, 0.2) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(107, 142, 111, 0.2) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(39, 90, 109, 0.25) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(228, 155, 11, 0.15) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(39, 90, 109, 0.3) 0px, transparent 50%)
        `,
      },
      boxShadow: {
        'glow-lime': '0 0 30px rgba(228, 155, 11, 0.3)',
        'glow-coral': '0 0 30px rgba(107, 142, 111, 0.3)',
        'glow-teal': '0 0 30px rgba(39, 90, 109, 0.3)',
        'glow-purple': '0 0 30px rgba(90, 122, 140, 0.3)',
        'inner-glow': 'inset 0 0 30px rgba(228, 155, 11, 0.15)',
        'elevation-1': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'elevation-3': '0 8px 32px rgba(0, 0, 0, 0.16)',
        'elevation-4': '0 16px 48px rgba(0, 0, 0, 0.2)',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}
