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
        // Primary Colors - "Electric Pickleball" palette
        lime: {
          DEFAULT: '#BFFF00',
          50: '#F4FFD6',
          100: '#EFFFBD',
          200: '#E5FF8A',
          300: '#DBFF57',
          400: '#D1FF24',
          500: '#BFFF00',
          600: '#99CC00',
          700: '#739900',
          800: '#4D6600',
          900: '#263300',
        },
        court: {
          DEFAULT: '#1A237E',
          light: '#3949AB',
          dark: '#0D1442',
        },
        coral: {
          DEFAULT: '#FF6B6B',
          light: '#FF9E9E',
          dark: '#E53935',
        },
        // Secondary Colors
        teal: {
          DEFAULT: '#00BFA5',
          light: '#64FFDA',
          dark: '#00897B',
        },
        sunset: {
          DEFAULT: '#FF8C42',
          light: '#FFB380',
          dark: '#E65100',
        },
        purple: {
          DEFAULT: '#7C4DFF',
          light: '#B47CFF',
          dark: '#651FFF',
        },
        // Neutrals
        charcoal: {
          DEFAULT: '#1E1E1E',
          light: '#2D2D2D',
          dark: '#0D0D0D',
        },
        // Legacy colors (for gradual migration)
        primary: {
          DEFAULT: '#1A237E',
          light: '#00BFA5',
          dark: '#0D1442',
        },
        secondary: '#FF8C42',
        accent: '#7C4DFF',
        dark: {
          DEFAULT: '#0D0D0D',
          blue: '#0D1442',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(191, 255, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(191, 255, 0, 0.6)' },
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
        'hero-gradient': 'linear-gradient(135deg, #1A237E 0%, #7C4DFF 50%, #FF6B6B 100%)',
        'cta-gradient': 'linear-gradient(90deg, #BFFF00 0%, #00BFA5 100%)',
        'accent-gradient': 'linear-gradient(180deg, #FF8C42 0%, #FF6B6B 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0D0D0D 0%, #1A237E 100%)',
        'mesh-gradient': `
          radial-gradient(at 40% 20%, rgba(124, 77, 255, 0.3) 0px, transparent 50%),
          radial-gradient(at 80% 0%, rgba(255, 107, 107, 0.3) 0px, transparent 50%),
          radial-gradient(at 0% 50%, rgba(0, 191, 165, 0.3) 0px, transparent 50%),
          radial-gradient(at 80% 50%, rgba(191, 255, 0, 0.2) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(26, 35, 126, 0.4) 0px, transparent 50%)
        `,
      },
      boxShadow: {
        'glow-lime': '0 0 30px rgba(191, 255, 0, 0.4)',
        'glow-coral': '0 0 30px rgba(255, 107, 107, 0.4)',
        'glow-teal': '0 0 30px rgba(0, 191, 165, 0.4)',
        'glow-purple': '0 0 30px rgba(124, 77, 255, 0.4)',
        'inner-glow': 'inset 0 0 30px rgba(191, 255, 0, 0.1)',
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
