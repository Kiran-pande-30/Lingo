/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        surface: "#F7F5F0",
        'surface-elevated': "#EFEBE3",
        primary: "#FF6B35",
        secondary: "#733BFD",
        tertiary: "#7FB746",
        'text-primary': "#1A1714",
        'text-secondary': "#6B6057",
        'text-tertiary': "#9E9488",
        'error-wrong': "#D94F3D",
        'border-subtle': "rgba(26,23,20,0.06)",
        'border-strong': "rgba(26,23,20,0.15)",
        'overlay-primary': "rgba(215,167,83,0.08)",
        'overlay-secondary': "rgba(157,137,202,0.08)",
        'overlay-tertiary': "rgba(127,183,70,0.08)",
      },
      fontFamily: {
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(26,23,20,0.06)',
        elevated: '0 4px 20px rgba(26,23,20,0.10)',
      },
      borderRadius: {
        'card': '16px',
        'btn': '12px',
      }
    },
  },
  plugins: [],
}
