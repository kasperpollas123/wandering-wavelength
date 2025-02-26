/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f2942',    // Darker blue
        'primary-dark': '#081b2f',
        secondary: '#1e4d82',  // Darker secondary blue
        'secondary-dark': '#0e3563',
        accent: '#3a7abd',     // Slightly darker accent
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: '700',
              marginBottom: '2rem',
            },
            h2: {
              fontWeight: '700',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            p: {
              marginBottom: '1.5rem',
            },
            ul: {
              marginBottom: '1.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
