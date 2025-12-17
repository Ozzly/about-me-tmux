import useWindowStore from "../stores/windowStore";

interface WindowButtonProps {
  number: number;
  name: string;
}

function WindowButton({ number, name }: WindowButtonProps) {
  const setActiveWindow = useWindowStore((state) => state.setActiveWindow);
  const activeWindowId = useWindowStore((state) => state.activeWindowId);
  const isActive = activeWindowId === number;
  return (
    <div
      className="flex hover:brightness-120 transition-all duration-200"
      onClick={() => setActiveWindow(number)}
    >
      <div
        className={`w-fit px-3 text-center text-ctp-base rounded-l-md ${
          isActive ? "bg-ctp-mauve" : "bg-ctp-overlay1"
        }`}
      >
        {number}
      </div>
      <div
        className={` w-fit px-3 text-center rounded-r-md text-nowrap ${
          isActive ? "bg-ctp-surface1" : "bg-ctp-surface0"
        }`}
      >
        {name}
      </div>
    </div>
  );
}

export default WindowButton;
