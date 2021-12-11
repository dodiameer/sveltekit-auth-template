import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';
import forms from 'windicss/plugin/forms';

export default defineConfig({
  attributify: false,
  extract: {
    include: ['./**/*.{svelte,ts,js,html}'],
    exclude: ['./node_modules/**'],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          // @ts-ignore You can spread colors but TS complains about it
          ...colors.blue,
          DEFAULT: colors.blue[500],
          text: colors.white,
        },
      },
      fontFamily: {
        // Customize font family
        sans: ['sans-serif'],
        body: ['sans-serif'],
      },
    },
    container: {
      // Auto-center and add horizontal padding to match Bootstrap-style containers
      center: true,
      padding: '1.5rem',
    },
  },
  plugins: [forms],
});
