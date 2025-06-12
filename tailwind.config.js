/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#084734",
        highlight: "#CEF17B",
        secondary: "#CEEDB2",
        dark: "#000000",
        light: "#FFFFFF",
        gray: {
          100: "#EAEEED",
          200: "#D9D9D9",
        },
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "bounce-slow": "bounce 3s infinite",
        "fade-in-down": "fadeInDown 0.5s ease-out",
        "fade-in-left": "fadeInLeft 0.5s ease-out",
        "fade-in-right": "fadeInRight 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "progress-width": "progressWidth 1s ease-out forwards",
        "slide-right": "slideRight 0.5s ease-out",
        "progress-grow": "progressGrow 1s ease-out forwards",
        "slide-in-bottom": "slideInBottom 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeInDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeInLeft: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeInRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        progressWidth: {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
        slideRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        progressGrow: {
          "0%": { height: "0%" },
          "100%": { height: "var(--target-height)" },
        },
        slideInBottom: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      transitionDelay: {
        100: "100ms",
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
      },
      backgroundImage: {
        "dots-white":
          "radial-gradient(circle at center, white 2px, transparent 2px)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
