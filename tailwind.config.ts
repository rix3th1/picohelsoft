import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        fuchsia: {
          50: '#fbf3ff',
          100: '#f7e7ff',
          200: '#eeceff',
          300: '#e5a7ff',
          400: '#cf58ff',
          500: '#c23ef7',
          600: '#a91edb',
          700: '#8f15b6',
          800: '#771395',
          900: '#651679',
          950: '#410151'
        }
      }
    }
  }
}
