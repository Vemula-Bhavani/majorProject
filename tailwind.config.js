/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      
      /* 🌸 Custom Colors (Peach Theme) */
      colors: {
        primary: "#F97316",       // Main orange
        secondary: "#FDBA74",     // Light orange
        background: "#FFF3EC",    // Peach background
      },

      /* ✨ Premium Font */
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      /* 🪄 Smooth Shadow */
      boxShadow: {
        soft: "0 10px 25px rgba(0, 0, 0, 0.05)",
      },

      /* 🔥 Rounded App Style */
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },

    },
  },
  plugins: [],
};