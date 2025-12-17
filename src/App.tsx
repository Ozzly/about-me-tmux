import "./App.css";
import BottomBar from "./components/BottomBar";
import Window from "./components/Window";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <div className="p-2 flex-1 overflow-hidden">
        <Window />
      </div>
      <div className="mb-2">
        <BottomBar />
      </div>
    </div>
  );
}

export default App;
