import { useEffect } from "react";
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
  }, [toggleHelpPopup]);
  return (
    <div className="absolute justify-center items-center flex w-full h-full bg-ctp-base/50">
      <div className="bg-ctp-mantle w-lg h-128 border-ctp-mauve border-3 rounded-lg shadow-lg p-3 flex flex-col">
        <div className="flex flex-col gap-1">
          <div>
            My porfolio website is inspired by my tmux/shell setup. You can
            interact with it like a terminal.
          </div>
          <h2 className="text-lg font-bold">Navigation</h2>
          <ul className="">
            You can navigate the site using the commands:
            <CommandDescription
              command="ls"
              description="to list the contents of the current directory"
            />
            <CommandDescription
              command="cd [directory]"
              description="to navigate to a directory"
            />
            <CommandDescription
              command="cd .."
              description="to go to the parent directory"
            />
            <CommandDescription
              command="cd"
              description="to go to the home directory"
            />
            <CommandDescription
              command="cat [filename]"
              description="to display the contents of a file"
            />
          </ul>
          <h2 className="text-lg font-bold">Windows (Tabs)</h2>
          <div>
            Being modelled after tmux, you can have multiple windows. Some
            windows are loaded by default, simplifying navigation. Switch
            between them by clicking the buttons in the bottom bar. Tmux-like
            chord keybinds are planned but not yet implemented.
          </div>
        </div>
        <div className="text-ctp-overlay0 mt-auto text-center mx-auto">
          Press `<span className="text-ctp-text">q</span>` or `
          <span className="text-ctp-text">Escape</span>` to close this popup
        </div>
      </div>
    </div>
  );
}

export default Popup;

interface CommandDescriptionProps {
  command: string;
  description: string;
}

function CommandDescription({ command, description }: CommandDescriptionProps) {
  return (
    <li className="text-ctp-overlay1">
      `<span className="font-bold text-ctp-text">{command}</span>` {description}
    </li>
  );
}
