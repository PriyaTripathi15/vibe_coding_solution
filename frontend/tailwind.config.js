/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 24px 60px rgba(15,23,42,0.35)',
      },
      colors: {
        ink: {
          950: '#07111f',
          900: '#0b1528',
          800: '#132238',
        },
        amberSignal: '#f59e0b',
      },
      backgroundImage: {
        'dashboard-radial': 'radial-gradient(circle at top left, rgba(45,212,191,0.18), transparent 32%), radial-gradient(circle at top right, rgba(251,191,36,0.14), transparent 28%), linear-gradient(180deg, #07111f 0%, #0b1528 55%, #09101d 100%)',
      },
    },
  },
  plugins: [],
};