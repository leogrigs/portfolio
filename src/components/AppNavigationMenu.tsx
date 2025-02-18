import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import AppLanguageSelector from "./AppLanguageSelector";
import AppResumeButton from "./AppResumeButton";
import { ThemeToggle } from "./ThemeToggle";

export function AppNavigationMenu() {
  const menuItems = useSelector(
    (state: RootState) => state.contentV2.data.navbar.menu
  );

  return (
    <>
      <nav className="hidden md:flex fixed top-0 left-0 z-10 w-full bg-background/80 backdrop-blur-md">
        <ul className="flex justify-end items-center space-x-6 p-6 text-sm text-neutral-1">
          {menuItems.map((item) => (
            <li key={item.id} className="flex items-center">
              <a
                href={`#${item.id}`}
                className="ml-2 hover:text-primaryColor no-underline relative after-line"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-start justify-end w-full md:w-auto gap-4 fixed top-0 right-0 z-20 p-4 md:p-4 rounded-lg bg-background/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-0">
        <AppLanguageSelector />
        <AppResumeButton />
        <ThemeToggle />
      </div>
    </>
  );
}
