/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
        },
        background: '#F8FAFC',
        card: '#FFFFFF',
        border: '#E2E8F0',
        heading: '#0F172A',
        body: '#475569',
        muted: '#64748B',
        hit: '#22C55E',
        miss: '#EF4444',
        irrelevant: '#7C3AED',
      },
      borderRadius: {
        'card': '14px',
        'card-lg': '18px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'container': '1280px',
      },
    },
  },
  plugins: [],
}
