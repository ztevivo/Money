// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary (Sakura Pink)
        primary: '#7a5365',
        'on-primary': '#ffffff',
        'primary-container': '#ffcce1',
        'on-primary-container': '#7b5365',
        'primary-fixed': '#ffd8e7',
        'primary-fixed-dim': '#eab9ce',
        'on-primary-fixed': '#2f1121',
        'on-primary-fixed-variant': '#603c4d',
        'inverse-primary': '#eab9ce',

        // Secondary (Mint Dew)
        secondary: '#486366',
        'on-secondary': '#ffffff',
        'secondary-container': '#cbe8eb',
        'on-secondary-container': '#4e696c',
        'secondary-fixed': '#cbe8eb',
        'secondary-fixed-dim': '#afcccf',
        'on-secondary-fixed': '#031f22',
        'on-secondary-fixed-variant': '#314b4e',

        // Tertiary (Lavender Mist)
        tertiary: '#635a75',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#e1d5f5',
        'on-tertiary-container': '#645b76',
        'tertiary-fixed': '#e9ddfd',
        'tertiary-fixed-dim': '#cdc1e1',
        'on-tertiary-fixed': '#1f182f',
        'on-tertiary-fixed-variant': '#4b435c',

        // Neutral (Cloud Cream)
        surface: '#fbf9f7',
        'surface-dim': '#dbdad8',
        'surface-bright': '#fbf9f7',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f3f1',
        'surface-container': '#efedec',
        'surface-container-high': '#eae8e6',
        'surface-container-highest': '#e4e2e0',
        'on-surface': '#1b1c1b',
        'on-surface-variant': '#4f4448',
        'surface-tint': '#7a5365',
        'surface-variant': '#e4e2e0',

        // Inverse
        'inverse-surface': '#30302f',
        'inverse-on-surface': '#f2f0ee',

        // Error
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',

        // Outline
        outline: '#817478',
        'outline-variant': '#d2c2c7',

        // Background
        background: '#fbf9f7',
        'on-background': '#1b1c1b',
      },
      borderRadius: {
        DEFAULT: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },
      spacing: {
        'container-padding': '32px',
        'unit': '8px',
        'gutter': '24px',
        'element-gap': '16px',
      },
      fontFamily: {
        'headline': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Quicksand', 'sans-serif'],
      },
      fontSize: {
        'headline-lg': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg-mobile': ['28px', { lineHeight: '34px', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '700' }],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
