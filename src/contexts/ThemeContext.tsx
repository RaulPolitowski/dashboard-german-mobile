import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        // Verifica se existe um tema salvo no localStorage
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme") as Theme;
            return savedTheme || "dark";
        }
        return "dark";
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        // Atualiza o localStorage
        localStorage.setItem("theme", theme);

        // Atualiza as classes do documento
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);

        // Atualiza a meta tag theme-color para dispositivos móveis
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute(
                "content",
                theme === "dark" ? "#1f2937" : "#ffffff"
            );
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
} 