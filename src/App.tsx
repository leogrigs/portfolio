import "./App.css";
import { AppNavigationMenu } from "./components/AppNavigationMenu";
import AppResumeButton from "./components/AppResumeButton";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemeProvider } from "./providers/theme-provider";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Welcome from "./sections/Welcome";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="bg-background">
        <div className="flex items-center gap-4 fixed top-0 right-0 z-10 p-6">
          <AppResumeButton />
          <ThemeToggle />
        </div>
        <AppNavigationMenu />
        <Welcome />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </ThemeProvider>
  );
}

export default App;
