import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { RootState } from "@/store/store";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import AppLanguageSelector from "./AppLanguageSelector";
import AppResumeButton from "./AppResumeButton";
import { ThemeToggle } from "./ThemeToggle";

interface NavMenuItem {
  id: string;
  label: string;
}

function NavSectionLinks({
  menuItems,
  active,
  onNavigate,
  className,
}: {
  menuItems: NavMenuItem[];
  active: string | null;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {menuItems.map((item) => {
        const isActive = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center rounded-lg px-4 py-3 text-base transition-colors",
                isActive
                  ? "bg-surface-2 border border-border text-foreground"
                  : "text-muted-foreground hover:bg-surface-2/50 hover:text-foreground"
              )}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function AppNavigationMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuItems = useSelector(
    (state: RootState) => state.contentV2.data.navbar.menu
  );

  const ids = useMemo(() => menuItems.map((m) => m.id), [menuItems]);
  const active = useActiveSection(ids);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-2 p-4 pt-[max(1rem,env(safe-area-inset-top))] md:top-4 md:left-4 md:right-4 md:p-0 md:pointer-events-none">
      <div className="pointer-events-auto md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border bg-background/80 backdrop-blur-md shadow-lg shadow-black/5"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(100%,20rem)]">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <NavSectionLinks
              menuItems={menuItems}
              active={active}
              onNavigate={closeMobile}
              className="mt-6"
            />
          </SheetContent>
        </Sheet>
      </div>

      <nav
        aria-label="Main"
        className="hidden md:flex pointer-events-auto absolute left-1/2 top-0 -translate-x-1/2"
      >
        <ul className="flex items-center gap-1 p-1.5 rounded-full border border-border bg-background/70 backdrop-blur-xl shadow-lg shadow-black/5">
          {menuItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative z-10 inline-flex items-center px-3.5 py-1.5 text-sm rounded-full transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
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

      <div className="pointer-events-auto flex items-center gap-2 md:ml-auto md:rounded-full md:border md:border-border md:bg-background/70 md:backdrop-blur-xl md:shadow-lg md:shadow-black/5 md:p-2">
        <AppLanguageSelector />
        <AppResumeButton />
        <ThemeToggle />
      </div>
    </header>
  );
}
