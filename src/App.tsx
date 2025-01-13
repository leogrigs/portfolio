import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchData } from "./store/slices/contentSlice";
import { AppDispatch, RootState } from "./store/store";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    if (!data) {
      dispatch(fetchData());
    }
  }, [dispatch, data]);

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
