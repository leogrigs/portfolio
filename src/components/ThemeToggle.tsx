import { useContent } from "@/i18n/context";
import { useTheme } from "@/providers/theme-provider";
import { Moon, Sun } from "lucide-react";

function resolveDark(theme: string) {
  if (theme === "system") {
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
  }
  return theme === "dark";
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { nav } = useContent();
  const isDark = resolveDark(theme);
  const label = isDark ? nav.theme.toLight : nav.theme.toDark;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full border border-line bg-background/60 backdrop-blur transition-colors hover:bg-foreground hover:text-background"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
