const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      yekanBakh: "Yekan Bakh FaNum",
      Nastaliq: "IranNastaliq",
    },
    extend: {
      scale: {
        105: '1.05',
        25: '.25'
      },
      colors: {
        primary: "#8A1538",
        change: "#8A1538",
        'light-primary': "var(--color-light-primary)",
        secondary: 'var(--color-secondary)',
        dark: 'var(--color-dark)',
        sonicSilver: "#707070",
        romanSilver: "#81858B",
        gainsboro: "#E0E0E2",
        divider: '#0000000D',
        success: 'var(--color-success)',
        info: 'var(--color-info)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        default: 'var(--color-default)',
        cubes: '#FF004C',
        box: {
          main: '#F3F4F5',
          input: '#D9D9D9'
        },
        worldcup1:"#020F2A",
        worldcup2:"",
        worldcup3:"",
        worldcup4:"",
        worldcup5:"",
        worldcup6:"",
        worldcup7:"",
      },
      animation: {
        bounce100: "bounce 1s infinite 150ms",
        bounce200: "bounce 1s infinite 300ms",
        bounce400: "bounce 1s infinite 600ms",
      },
      backgroundImage: {
        "purple-back": "url('../public/images/music/purple-bg.png')",
        "gradient-bg": "radial-gradient(#D97528, #C12810)",
      },
    },
    screens: {
      'xs': '475px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
    require('@tailwindcss/forms'),
    function ({ addVariant }) {
      addVariant('child', '& > *')
    }
  ],
  // important: true,
};
