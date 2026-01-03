import { useEffect, useState } from "react";
import WindowButton from "./WindowButton";
import dayjs from "dayjs";
import useWindowStore from "../stores/windowStore";

function BottomBar() {
  const windows = useWindowStore((state) => state.windows);

  const [currentTime, setCurrentTime] = useState(
    dayjs().format("HH:mm DD-MMM-YY")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("HH:mm DD-MMM-YY"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeWindowId = useWindowStore((state) => state.activeWindowId);
  const setActiveWindow = useWindowStore((state) => state.setActiveWindow);

  return (
    <div className="bg-ctp-mantle h-6 w-full px-2 justify-between flex ">
      <div className="flex gap-2">
        {windows.map((window) => (
          <WindowButton
            id={window.id}
            name={window.name}
            key={window.id}
            isActive={window.id === activeWindowId}
            onClick={() => setActiveWindow(window.id)}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <h1>"guest"</h1>
        {currentTime}
      </div>
    </div>
  );
}

export default BottomBar;
