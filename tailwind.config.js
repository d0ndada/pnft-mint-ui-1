const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        header: {
          DEFAULT: "hsl(var(--header))",
          foreground: "hsl(var(--card-foreground))",
        },
        footer: {
          DEFAULT: "hsl(var(--footer))",
          foreground: "hsl(var(--card-foreground))",
        },
        main: {
          DEFAULT: "hsl(var(--main))",
          foreground: "hsl(var(--card-foreground))",
        },
        buttonHover: {
          DEFAULT: "hsl(var(--buttonHover))",
          foreground: "hsl(var(--card-foreground))",
        },
        textColor: {
          DEFAULT: "hsl(var(--textColor))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontSize: {
        custom: "2.125rem",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      height: {
        "screen-100": "100vh",
      },
      scrollSnapType: {
        x: "scroll-snap-type-x",
        y: "scroll-snap-type-y",
        mandatory: "scroll-snap-type-mandatory",
        proximity: "scroll-snap-type-proximity",
      },
      scrollSnapAlign: {
        start: "scroll-snap-align-start",
        end: "scroll-snap-align-end",
        center: "scroll-snap-align-center",
      },
      overflowY: {
        scroll: "scroll",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 1s ease-in-out",
        "fade-in-up": "fade-in-up 1s ease-in-out",
        "fade-in-right": "fade-in-right 1s ease-in-out",
        " pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities(
        {
          // Add utilities for scroll snap type
          ".scroll-snap-type-x": { scrollSnapType: "x mandatory" },
          ".scroll-snap-type-y": { scrollSnapType: "y mandatory" },
          ".scroll-snap-type-mandatory": { scrollSnapType: "mandatory" },
          ".scroll-snap-type-proximity": { scrollSnapType: "proximity" },

          // Add utilities for scroll snap align
          ".scroll-snap-align-start": { scrollSnapAlign: "start" },
          ".scroll-snap-align-end": { scrollSnapAlign: "end" },
          ".scroll-snap-align-center": { scrollSnapAlign: "center" },
        },
        ["responsive"]
      )
    },
  ],
}
