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
    <nav className="fixed top-0 left-0 z-10 border-r border-border flex flex-col p-8 bg-transparent h-full">
      <ul className="space-y-8 text-right">
        {links.map((link, index) => (
          <li key={link.href} className="flex">
            <span className="text-fontColor text-sm md:text-base w-8">{`0${
              index + 1
            }.`}</span>
            <a
              href={link.href}
              className="hover:text-fontColor no-underline after-line transition-colors duration-300 text-sm md:text-base pl-2"
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-auto pr-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}
