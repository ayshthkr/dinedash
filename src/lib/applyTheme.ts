import { Theme } from "@/store";

export const applyThemePreference = (theme: Theme) => {
  const root = window.document.documentElement;
  const isDark = theme === "dark";
  root.classList.remove(isDark ? "light" : "dark");
  root.classList.add(theme);
};
