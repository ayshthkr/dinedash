"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import { themeStore } from "@/store";
import { useEffect, useState } from "react";
import { applyThemePreference } from "@/lib/applyTheme";

export default function ThemeSwitcher() {
  const { theme, switchTheme } = themeStore();
  const [hasHydrated, setHasHydrated] = useState(false);

  // Rehydrate the store on page load
  useEffect(() => {
    themeStore.persist.rehydrate();
    setHasHydrated(true);
    applyThemePreference(theme);
  }, [theme]);

  if (!hasHydrated) return null;

  return (
    <Button
      variant={"outline"}
      className="w-full p-2 mr-2"
      onClick={() => switchTheme()}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
