import React, { useEffect } from "react";
import usePopupStore from "../stores/popupStore";

function Popup() {
  const toggleHelpPopup = usePopupStore((state) => state.toggleHelpPopup);
  const popupRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleExit = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        e.preventDefault();
      }
      console.log("key pressed", e.key);
      if (e.key === "q" || e.key === "Escape") {
        console.log("closing popup");
        toggleHelpPopup();
      }
      popupRef.current?.focus();
    };
    window.addEventListener("keydown", handleExit);
    return () => window.removeEventListener("keydown", handleExit);
  }, []);
  return (
    <div
      ref={popupRef}
      className="absolute justify-center items-center flex w-full h-full bg-ctp-base/50"
      onKeyDown={() => console.log("gasigasdi")}
      onClick={() => console.log("ghi")}
    >
      <div className="bg-ctp-mantle w-lg h-128 border-ctp-mauve border-3 rounded-lg shadow-lg p-3"></div>
    </div>
  );
}

export default Popup;
