"use client";

import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleTheme, selectTheme } from "@/redux/features/themeSlice";

export function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
