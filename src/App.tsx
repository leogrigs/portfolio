import "./App.css";
import { AppNavigationMenu } from "./components/AppNavigationMenu";
import Summary from "./sections/Summary";

function App() {
  return (
    <main>
      <AppNavigationMenu />
      <Summary />
    </main>
  );
}

export default App;
