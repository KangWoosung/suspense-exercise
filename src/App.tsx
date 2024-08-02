import viteLogo from "/vite.svg";
import "./App.css";
import Version1 from "./versions/Version1";

function App() {
  return (
    <div className="flex flex-col w-full bg-background">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank"></a>
      </div>
      <div>
        <Version1 />
      </div>
    </div>
  );
}

export default App;
