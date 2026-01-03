import React, { useEffect } from "react";
import usePopupStore from "../stores/popupStore";

function Popup() {
  const toggleHelpPopup = usePopupStore((state) => state.toggleHelpPopup);

  useEffect(() => {
    const handleExit = (e: KeyboardEvent) => {
      if (e.key.length === 1) {
        e.preventDefault();
      }
      if (e.key === "q" || e.key === "Escape") {
        toggleHelpPopup();
      }
    };
    window.addEventListener("keydown", handleExit);
    return () => window.removeEventListener("keydown", handleExit);
  }, []);
  return (
    <div className="absolute justify-center items-center flex w-full h-full bg-ctp-base/50">
      <div className="bg-ctp-mantle w-lg h-128 border-ctp-mauve border-3 rounded-lg shadow-lg p-3 flex">
        <div className="text-ctp-overlay0 mt-auto text-center mx-auto">
          Press `<span className="text-ctp-text">q</span>` or `
          <span className="text-ctp-text">Escape</span>` to close this popup
        </div>
      </div>
    </div>
  );
}

export default Popup;
