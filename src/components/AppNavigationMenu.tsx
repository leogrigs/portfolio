import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export function AppNavigationMenu() {
  const links = useSelector(
    (state: RootState) => state.content.data?.others.links
  );

  return (
    <nav className="hidden md:fixed top-0 left-0 z-10 border-r border-border md:flex flex-col p-8 bg-transparent h-screen">
      <ul className="space-y-8 text-right fade-in">
        {links?.map((link, index) => (
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
    </nav>
  );
}
