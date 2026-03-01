/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'elevenlabs': {
          dark: '#0f0f0f',
          card: '#1a1a1a',
          border: '#2a2a2a',
          muted: '#737373',
          accent: '#6366f1',
          green: '#22c55e',
        }
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
