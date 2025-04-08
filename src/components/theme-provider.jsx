"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { selectTheme } from "@/redux/features/themeSlice";
import ToastManager from "./ToastManager";

export default function ThemeProvider({ children }) {
  const themeMode = useSelector(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeMode === "dark");
  }, [themeMode]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={themeMode}
      enableSystem={false}
    >
      {children}
      <ToastManager />
    </NextThemesProvider>
  );
}
