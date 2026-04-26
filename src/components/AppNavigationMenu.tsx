import { useActiveSection } from "@/hooks/useActiveSection";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import AppLanguageSelector from "./AppLanguageSelector";
import AppResumeButton from "./AppResumeButton";
import { ThemeToggle } from "./ThemeToggle";

export function AppNavigationMenu() {
  const menuItems = useSelector(
    (state: RootState) => state.contentV2.data.navbar.menu
  );

  const ids = useMemo(() => menuItems.map((m) => m.id), [menuItems]);
  const active = useActiveSection(ids);

  return (
    <>
      <nav className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-30">
        <ul className="flex items-center gap-1 p-1.5 rounded-full border border-border bg-background/70 backdrop-blur-xl shadow-lg shadow-black/5">
          {menuItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  className={`relative z-10 inline-flex items-center px-3.5 py-1.5 text-sm rounded-full transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-surface-2 border border-border"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center justify-end w-full md:w-auto gap-2 fixed top-0 right-0 z-20 p-4 md:top-4 md:right-4 md:p-2 md:rounded-full md:border md:border-border md:bg-background/70 md:backdrop-blur-xl md:shadow-lg md:shadow-black/5 bg-background/80 backdrop-blur-md md:bg-background/70">
        <AppLanguageSelector />
        <AppResumeButton />
        <ThemeToggle />
      </div>
    </>
  );
}
