/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'gta-green': '#4CAF50',
        'gta-purple': '#9C27B0',
        'gta-blue': '#2196F3',
        'gta-orange': '#FF9800',
        'gta-red': '#F44336',
        'gta-gray': '#212121',
        'gta-dark': '#121212',
        'gta-light': '#EEEEEE'
      },
      fontFamily: {
        'pricedown': ['Pricedown', 'Impact', 'sans-serif'],
        'body': ['Roboto', 'Arial', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.pexels.com/photos/5961962/pexels-photo-5961962.jpeg')",
        'texture': "url('https://images.pexels.com/photos/5086489/pexels-photo-5086489.jpeg')"
      }
    }
  },
  plugins: []
}