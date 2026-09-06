import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useSite } from "@/lib/site-context";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useSite();
  const [mounted, setMounted] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative grid size-11 place-items-center rounded-full text-fg",
        "transition-[background-color,transform] duration-200 ease-[var(--ease-out)]",
        "hover:bg-bg-muted active:scale-[0.96]",
        className,
      )}
    >
      <span className="relative size-4">
        <Sun
          className={cn(
            "theme-icon absolute inset-0 size-4",
            mounted && isDark
              ? "scale-[0.25] opacity-0 blur-[4px]"
              : "scale-100 opacity-100 blur-0",
          )}
          strokeWidth={1.6}
        />
        <Moon
          className={cn(
            "theme-icon absolute inset-0 size-4",
            mounted && isDark
              ? "scale-100 opacity-100 blur-0"
              : "scale-[0.25] opacity-0 blur-[4px]",
          )}
          strokeWidth={1.6}
        />
      </span>
    </button>
  );
}
