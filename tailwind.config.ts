
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
          DEFAULT: "#9b87f5",
          hover: "#8875e9",
          light: "#b4a4f7",
          glow: "#c4b8fa",
        },
        secondary: {
          DEFAULT: "#7E69AB",
          hover: "#6d5a96",
          light: "#9a89bf",
          glow: "#b1a3d2",
        },
        accent: {
          DEFAULT: "#D946EF",
          hover: "#c235d8",
          light: "#e16ef3",
          glow: "#f0a0f9",
        },
        success: {
          DEFAULT: "#10B981",
          hover: "#059669",
          light: "#34D399",
          glow: "#6ee7b7",
        },
        warning: {
          DEFAULT: "#F59E0B",
          hover: "#D97706",
          light: "#FBBF24",
          glow: "#fcd34d",
        },
        danger: {
          DEFAULT: "#EF4444",
          hover: "#DC2626",
          light: "#F87171",
          glow: "#fca5a5",
        },
        // Enhanced dashboard colors for more vibrant dark mode
        dashboard: {
          background: "#0f1729",
          card: "#151b2b",
          cardAlt: "#1a2035",
          cardHover: "#1c2642",
          border: "#2d3748",
          borderGlow: "rgba(99, 102, 241, 0.3)",
          hover: "#1f2937",
          highlight: "#6d28d9",
          highlightGlow: "#7c3aed",
          receivables: "#10b981",
          payables: "#ef4444",
          result: "#3b82f6",
          neon: {
            purple: "#8B5CF6",
            pink: "#D946EF",
            blue: "#3B82F6",
            green: "#10B981",
            red: "#EF4444",
            yellow: "#F59E0B",
          },
          overdue: {
            receivables: "#581c87",
            payables: "#7c2d12",
          },
          dueToday: {
            receivables: "#065f46",
            payables: "#9f1239",
            balance: "#1e3a8a",
          },
          account: "#1e293b",
          gradients: {
            purple: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
            blue: "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
            green: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
            red: "linear-gradient(135deg, #DC2626 0%, #EF4444 100%)",
            dark: "linear-gradient(135deg, #111827 0%, #1F2937 100%)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pulse-glow": "pulse-glow 2s infinite ease-in-out",
        "float": "float 3s infinite ease-in-out",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-down": "fadeInDown 0.6s ease-in-out",
        "fade-in-up": "fadeInUp 0.7s ease-in-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        neon: "0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)",
        "neon-hover": "0 0 15px rgba(139, 92, 246, 0.6), 0 0 30px rgba(139, 92, 246, 0.4)",
        "card-glow": "0 0 15px rgba(59, 130, 246, 0.2)",
        "success-glow": "0 0 15px rgba(16, 185, 129, 0.3)",
        "danger-glow": "0 0 15px rgba(239, 68, 68, 0.3)",
        "warning-glow": "0 0 15px rgba(245, 158, 11, 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
