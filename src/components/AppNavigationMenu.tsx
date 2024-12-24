import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#welcome", text: "Welcome" },
  { href: "#about", text: "About" },
  { href: "#experience", text: "Experience" },
  { href: "#projects", text: "Projects" },
  { href: "#contact", text: "Contact" },
];

export function AppNavigationMenu() {
  return (
    <header className="fixed top-0 z-10 flex justify-end px-12 items-center w-full bg-slate-900">
      <NavigationMenu>
        <NavigationMenuList className="space-x-6 px-12 py-4">
          {links.map((link) => (
            <NavigationMenuItem>
              <NavigationMenuLink
                href={link.href}
                className="text-slate-300 no-underline after-line transition-colors duration-300 text-sm md:text-base"
              >
                {link.text}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <ThemeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
