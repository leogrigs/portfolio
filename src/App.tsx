import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppFooter from "./components/AppFooter";
import AppLoader from "./components/AppLoader";
import { AppNavigationMenu } from "./components/AppNavigationMenu";
import { ThemeProvider } from "./providers/theme-provider";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Welcome from "./sections/Welcome";
import { fetchData } from "./store/slices/contentSlice";
import { fetchDataV2 } from "./store/slices/contentSlice-v2";
import { AppDispatch, RootState } from "./store/store";

const LOADER_MIN_MS = 400;

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading: contentLoading } = useSelector(
    (state: RootState) => state.content
  );
  const { loading: contentV2Loading } = useSelector(
    (state: RootState) => state.contentV2
  );
  const { currentLocale } = useSelector((state: RootState) => state.locale);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  useEffect(() => {
    setIsLoaderVisible(true);
    dispatch(fetchData(currentLocale));
    dispatch(fetchDataV2(currentLocale));
  }, [dispatch, currentLocale]);

  useEffect(() => {
    const isReady = Boolean(data) && !contentLoading && !contentV2Loading;
    if (!isReady) return;

    const timer = setTimeout(() => setIsLoaderVisible(false), LOADER_MIN_MS);
    return () => clearTimeout(timer);
  }, [data, contentLoading, contentV2Loading]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      {isLoaderVisible ? (
        <AppLoader />
      ) : (
        <main className="bg-background">
          <AppNavigationMenu />
          <div className="fade-in">
            <Welcome />
            <About />
            <Experience />
            <Projects />
            <Contact />
          </div>
          <AppFooter />
        </main>
      )}
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
