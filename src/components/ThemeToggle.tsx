import { useTheme } from "@/providers/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      title="Toggle theme"
      aria-label="Toggle theme"
      variant="ghost"
      className="rounded-full p-4"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
