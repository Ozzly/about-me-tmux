interface WindowButtonProps {
  id: number | "?";
  name: string;
  isActive: boolean;
  onClick: () => void;
}

function WindowButton({ id, name, isActive, onClick }: WindowButtonProps) {
  return (
    <button
      className="flex hover:brightness-120 transition-all duration-200 cursor-pointer"
      onClick={onClick}
      type="button"
    >
      <div
        className={`w-fit px-3 text-center text-ctp-base rounded-l-md ${
          isActive ? "bg-ctp-mauve" : "bg-ctp-overlay1"
        }`}
      >
        {id}
      </div>
      <div
        className={` w-fit px-3 text-center rounded-r-md text-nowrap ${
          isActive ? "bg-ctp-surface1" : "bg-ctp-surface0"
        }`}
      >
        {name}
      </div>
    </button>
  );
}

export default WindowButton;
