"use client";

import { createContext, useContext } from "react";

const ThemeContext = createContext<{ theme: string; setTheme: (t: string) => void } | null>(
  null
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Simplified provider for Bitpanda Pro design
  const theme = "light";
  const setTheme = () => {}; // No-op since we're not implementing theme switching

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
