import logo from "./logo.svg";
import "./App.css";
import DisplayNumber from "./displayNumber";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span className="App-link">
          <DisplayNumber></DisplayNumber>
        </span>
      </header>
    </div>
  );
}

export default App;
