import "./App.css";
import { AppNavigationMenu } from "./components/AppNavigationMenu";
import Experience from "./sections/Experience";
import Summary from "./sections/Summary";

function App() {
  return (
    <main className="bg-slate-900">
      <AppNavigationMenu />
      <Summary />
      <Experience />
    </main>
  );
}

export default App;
