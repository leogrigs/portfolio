import "./App.css";
import { AppNavigationMenu } from "./components/AppNavigationMenu";
import { ThemeProvider } from "./providers/theme-provider";
import Experience from "./sections/Experience";
import Welcome from "./sections/Welcome";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="bg-slate-900">
        <AppNavigationMenu />
        <Welcome />
        <Experience />
      </main>
    </ThemeProvider>
  );
}

export default App;
