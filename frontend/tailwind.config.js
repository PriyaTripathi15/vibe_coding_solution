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
      },
      backgroundImage: {
        'dashboard-radial': 'radial-gradient(circle at top left, rgba(59,130,246,0.22), transparent 32%), radial-gradient(circle at top right, rgba(37,99,235,0.16), transparent 28%), linear-gradient(180deg, #06101d 0%, #0b1528 55%, #09101d 100%)',
      },
    },
  },
  plugins: [],
};