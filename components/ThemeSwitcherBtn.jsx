"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcherBtn() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button className=" text-black dark:text-slate-200" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "light" ? <Moon /> : <Sun/>}
    </button>
  );
}
