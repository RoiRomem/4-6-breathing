import "./App.css";
import Breathing from "./components/breathing/breathing";
import background from "../public/background.svg"

function App() {
  const year = new Date().getFullYear();

  return (
    <>
      <nav id="navbar">
        <span id="logo" className="neon-sign">
          Mindfulness
        </span>
      </nav>
      <main id="breath">
        <Breathing />
      </main>
      <img src={background} className="lowZ"/>
      <footer>© {year} Roi Romem</footer>
    </>
  );
}

export default App;
