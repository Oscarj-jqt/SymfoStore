/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Chemin pour inclure tous les fichiers de ton projet
  ],
  theme: {
    extend: {
      colors: {
        // Bleu foncé 
        primary: 'rgb(0, 64, 102)',
        // Bleu clair 
        secondary: 'rgb(3, 156, 255)',
        // Orange foncé 
        accent: 'rgb(205, 105, 83)',
        // Orange clair 
        highlight: 'rgb(236, 112, 77)',
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        roboto: ['Roboto', 'Arial', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif']
      },
    },
  },
};

