"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-12 h-6 -full bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 transition-colors"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Toggle thumb */}
      <div className={cn(
        "absolute top-0.5 w-5 h-5 -full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex items-center justify-center",
        theme === "dark" ? "left-6" : "left-0.5"
      )}>
        {theme === "dark" ? (
          <Moon size={12} className="text-gray-700" />
        ) : (
          <Sun size={12} className="text-amber-500" />
        )}
      </div>
      
      {/* Icons in background */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun size={12} className={cn(
          "transition-opacity",
          theme === "light" ? "text-amber-500" : "text-gray-400"
        )} />
        <Moon size={12} className={cn(
          "transition-opacity",
          theme === "dark" ? "text-blue-400" : "text-gray-400"
        )} />
      </div>
    </button>
  );
}