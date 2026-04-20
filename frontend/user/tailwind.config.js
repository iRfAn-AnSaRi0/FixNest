/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D6A4F",
        secondary: "#40916C",
        accent: "#FF7A00",

        background: "#F8F9FA",
        surface: "#FFFFFF",

        text: "#1F2933",
        border: "#E5E7EB",

        success: "#16A34A",
        warning: "#FF7A00",
        danger: "#DC2626",
        info: "#2563EB",
        muted: "#6B7280"
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],  
        heading: ["Poppins", "sans-serif"]
      },

      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px"
      },

      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },

      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "80px"
      },

      container: {
        center: true,
        padding: "16px",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1200px"
        }
      },

      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px"
      },

      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.08)",
        modal: "0 10px 30px rgba(0,0,0,0.15)"
      },

      height: {
        btn: "44px",
        "btn-lg": "52px",
        input: "44px"
      },

      minHeight: {
        hero: "70vh"
      },

      maxWidth: {
        form: "420px",
        modal: "600px",
        page: "1200px"
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms"
      },
      zIndex: {
        navbar: "100",
        dropdown: "200",
        modal: "500"
      },
      gridTemplateColumns: {
        services: "repeat(auto-fit, minmax(240px, 1fr))"
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },

      animation: {
        fade: "fadeIn 0.3s ease-in-out"
      },

      scale: {
        102: "1.02"
      },

      backdropBlur: {
        xs: "2px"
      },

    },
  },
  plugins: [],
}