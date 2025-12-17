import dayjs from "dayjs";
import { create } from "zustand";
import type { JSX } from "react";
import About from "../components/About";
import HelpMessage from "../components/HelpMessage";
import { fileSystem, type FileSystemItem } from "../assets/fileSystem";
import DirectoryContent from "../components/DirectoryContent";

interface Command {
  command: string;
  timeStamp: string;
  path: string[];
  output?: string | JSX.Element;
}

interface Window {
  id: number;
  name: string;
  path: string[];
  commandHistory: Command[];
}

interface WindowStore {
  windows: Window[];
  activeWindowId: number;
  setActiveWindow: (id: number) => void;
  getActiveWindow: () => Window;
  addCommand: (id: number, command: string) => void;
  clearWindow: (id: number) => void;
}

const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [
    {
      id: 1,
      name: "about-me",
      path: ["~"],
      commandHistory: [
        {
          command: "about",
          timeStamp: dayjs().format("HH:mm"),
          path: ["~"],
          output: (
            <>
              <About />
              <div className="text-ctp-overlay0">
                Welcome to my terminal - Type `
                <span className="text-ctp-subtext1">help</span>` for a list of
                commands
              </div>
            </>
          ),
        },
      ],
    },
    {
      id: 2,
      name: "projects",
      path: ["~", "projects"],
      commandHistory: [
        {
          command: "cd projects",
          timeStamp: dayjs().format("HH:mm"),
          path: ["~"],
        },
        {
          command: "ls",
          timeStamp: dayjs().format("HH:mm"),
          path: ["~", "projects"],
          output: (
            <>
              <DirectoryContent
                contents={listDirectoryContents(["~", "projects"])}
              />
              <div className="text-ctp-overlay0">
                Try displaying the contents of a file with `
                <span className="text-ctp-subtext1 inline-block">
                  cat [filename]
                </span>
                `, e.g. `
                <span className="text-ctp-subtext1 inline-block">
                  cat reckord.txt
                </span>
                `
                <br />
                You can visit the git repos by clicking underlined file names.
              </div>
            </>
          ),
        },
      ],
    },
  ],
  activeWindowId: 1,

  setActiveWindow: (id: number) => set({ activeWindowId: id }),

  getActiveWindow: () => {
    const { windows, activeWindowId } = get();
    const window = windows.find((window) => window.id === activeWindowId);
    if (!window) {
      throw new Error("Active window not found");
    }
    return window;
  },

  addCommand: (id, command) => {
    if (command === "clear") {
      get().clearWindow(id);
      return;
    }

    const windows = get().windows.map((window) => {
      if (window.id === id) {
        let newPath = [...window.path];
        let output: string | JSX.Element | undefined;

        if (command.startsWith("cd")) {
          const parts = command.split(" ");
          const dir = parts[1];
          if (!dir) {
            newPath = ["~"];
            output = "";
          } else if (dir === "..") {
            if (newPath.length > 1) {
              newPath.pop();
            }
          } else if (dir.startsWith("/")) {
            output = "cd: absolute paths not supported";
            // newPath = dir === "/" ? ["~"] : dir.split("/");
          } else {
            if (directoryExists(newPath, dir)) {
              newPath.push(dir);
              output = "";
            } else {
              output = `cd: no such directory: ${dir}`;
            }
          }
        } else {
          output = getCommandOutput(command, window.path);
        }
        return {
          ...window,
          path: newPath,
          commandHistory: [
            ...window.commandHistory,
            {
              command,
              timeStamp: dayjs().format("HH:mm"),
              path: window.path,
              output: output,
            },
          ],
        };
      }
      return window;
    });
    set({ windows: windows });
  },

  clearWindow: (id: number) => {
    const windows = get().windows.map((window) => {
      if (window.id === id) {
        return {
          ...window,
          commandHistory: [],
        };
      }
      return window;
    });
    set({ windows });
    console.log("Cleared command history for window", id);
    console.log(windows);
  },
}));

export default useWindowStore;

const getCommandOutput = (command: string, path: string[]) => {
  switch (command) {
    case "help":
      return <HelpMessage />;
    case "":
      return "";
    case "about":
      return <About />;
    case "mefetch":
      return <About />;
    case "ls":
      return <DirectoryContent contents={listDirectoryContents(path)} />;
    case "pwd":
      return path.join("/").replace("~", "/home/guest/");
    default:
      if (command.startsWith("cat")) {
        const filename = command.split(" ")[1];
        if (!filename) {
          return "cat: missing file input";
        }
        const fileContent = getFileContent(path, filename);
        if (!fileContent) {
          return `cat: ${filename}: No such file or directory`;
        }
        return fileContent;
      }

      return `Command not found: ${command}`;
  }
};

function listDirectoryContents(path: string[]): FileSystemItem[] | null {
  console.log("Listing contents of path:", path);
  let current = fileSystem["~"];
  for (let i = 1; i < path.length; i++) {
    if (!current.contents) {
      return null;
    }
    current = current.contents[path[i]];
  }
  console.log("Directory contents:", current.contents);
  console.log(Object.values(current.contents || {}));
  return Object.values(current.contents || {});
}

function getFileContent(path: string[], filename: string): string | null {
  let current = fileSystem["~"];
  for (let i = 1; i < path.length; i++) {
    if (!current.contents) {
      return null;
    }
    current = current.contents[path[i]];
  }
  if (
    !current.contents ||
    (!current.contents[filename] && !current.contents[filename + ".txt"])
  ) {
    return null;
  }
  const file =
    current.contents[filename] || current.contents[filename + ".txt"];
  if (file.type !== "file") {
    return `cat: ${filename}: Is a directory`;
  }
  return file.content || `\`${filename}\` is empty.`;
}

// change later
function directoryExists(currentPath: string[], dir: string): boolean {
  let current = fileSystem["~"];
  for (let i = 1; i < currentPath.length; i++) {
    if (!current.contents) {
      return false;
    }
    current = current.contents[currentPath[i]];
  }
  if (!current.contents) {
    return false;
  }
  return dir in current.contents && current.contents[dir].type === "directory";
}
