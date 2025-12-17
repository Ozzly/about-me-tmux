import React, { useEffect, useRef } from "react";
import CommandLine from "./CommandLine";
import useWindowStore from "../stores/windowStore";

function Window() {
  const window = useWindowStore((state) => state.getActiveWindow());
  const addCommand = useWindowStore((state) => state.addCommand);
  const [localInput, setLocalInput] = React.useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addCommand(window.id, localInput);
      setLocalInput("");
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      inputRef.current?.focus();
    }
  });

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto"
      tabIndex={0}
      onKeyDown={(e) => {
        if (
          (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) ||
          e.key === "Backspace" ||
          e.key === "Delete" ||
          e.key === "Enter"
        ) {
          inputRef.current?.focus();
        }
      }}
    >
      {/* Command history */}
      {window?.commandHistory.map((command, index) => (
        <>
          <div className="flex gap-2 w-full">
            <CommandLine key={index} path={command.path} />
            <div className="flex w-full">
              {command.command}
              <span className="text-ctp-overlay1 ml-auto mr-4">
                {command.timeStamp}
              </span>
            </div>
          </div>
          <div>
            {command.output && (
              <pre className="whitespace-pre-wrap">{command.output}</pre>
            )}
          </div>
        </>
      ))}

      {/* Command line */}
      <div className="flex gap-2">
        <CommandLine path={window.path} />
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent outline-none w-full"
          autoFocus
          value={localInput}
          onChange={(e) => setLocalInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default Window;
