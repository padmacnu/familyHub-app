/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hpe: {
          // BRAND & ACCENTS (The Glowing Elements)
          brand: '#01a982',        // hpe.color.decorative.brand
          turq: '#62e5f6',         // hpe.color.decorative.cyan
          green: '#05cc93',        // hpe.color.decorative.green
          
          // SURFACE & BACKGROUNDS (The Command Center)
          back: '#121212',         // Deepest background (Base layer)
          card: '#1A1A1A',         // Surface elevation (Cards)
          front: '#292d3a',        // hpe.color.background.neutral.xstrong (Accent cards)
          
          // BORDERS & TEXT
          border: '#3e4550',       // hpe.color.border.strong
          text: '#d4d8db',         // hpe.color.text.weak (Readable body)
          heading: '#ffffff',      // Pure white for titles
          
          // STATUS
          critical: '#cc1f1a',     // hpe.color.text.critical
          alert: '#d36d00',        // hpe.color.icon.warning
        }
      },
      // Adding the official typeface stack for that UI Architect feel
      fontFamily: {
        sans: ['Metric', 'HPE-Metric', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'hpe-wide': '0.3em',
        'hpe-tight': '-0.02em',
      }
    }
  },
  plugins: [],
}