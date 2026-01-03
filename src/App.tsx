import "./App.css";
import BottomBar from "./components/BottomBar";
import Popup from "./components/Popup";
import Window from "./components/Window";
import usePopupStore from "./stores/popupStore";

function App() {
  const helpPopupVisible = usePopupStore((state) => state.helpPopupVisible);
  return (
    <div className="h-screen flex flex-col">
      <div className="p-2 flex-1 overflow-hidden">
        <Window />
      </div>
      <div className="mb-2">
        <BottomBar />
      </div>
      {helpPopupVisible && <Popup />}
    </div>
  );
}

export default App;
