import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import AppLanguageSelector from "./AppLanguageSelector";
import AppResumeButton from "./AppResumeButton";
import { ThemeToggle } from "./ThemeToggle";

export function AppNavigationMenu() {
  const links = useSelector(
    (state: RootState) => state.content.data?.others.links
  );

  return (
    <>
      {/* Navigation Menu (Desktop Only) */}
      <nav className="hidden md:flex fixed top-0 left-0 z-10 w-full bg-background/80 backdrop-blur-md">
        <ul className="flex justify-end items-center space-x-6 p-6 text-sm md:text-base">
          {links?.map((link, index) => (
            <li key={link.href} className="flex items-center">
              {/* Index Number */}
              <span className="text-fontColor text-xs md:text-sm">{`0${
                index + 1
              }.`}</span>
              {/* Link */}
              <a
                href={link.href}
                className="ml-2 hover:text-fontColor no-underline relative after-line"
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Utility Buttons (Visible on all devices) */}
      <div className="flex items-start justify-end w-full md:w-auto gap-4 fixed top-0 right-0 z-20 p-4 md:p-4 rounded-lg bg-background/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-0">
        <AppLanguageSelector />
        <AppResumeButton />
        <ThemeToggle />
      </div>
    </>
  );
}
