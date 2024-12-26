import "./App.css";
import { AppNavigationMenu } from "./components/AppNavigationMenu";
import { ThemeProvider } from "./providers/theme-provider";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Welcome from "./sections/Welcome";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="bg-slate-950">
        <AppNavigationMenu />
        <Welcome />
        <About />
        <Experience />
        <Projects />
      </main>
    </ThemeProvider>
  );
}

export default App;
