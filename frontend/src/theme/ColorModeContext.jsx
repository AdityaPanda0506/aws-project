import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import getTheme from "./theme";

const STORAGE_KEY = "cloudguard-theme-mode";

const ColorModeContext = createContext({
  mode: "light",
  toggleColorMode: () => {}
});

export function useColorMode() {
  return useContext(ColorModeContext);
}

export function ColorModeProvider({ children }) {

  const [mode, setMode] = useState(() => {

    const stored = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);

    if (stored === "light" || stored === "dark") return stored;

    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";

  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );

}