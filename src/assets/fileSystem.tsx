import dayjs from "dayjs";
import About from "../components/About";
import DirectoryContent from "../components/DirectoryContent";
import type { JSX } from "react";
import File from "../components/File";

export interface FileSystemItem {
  name: string;
  type: "file" | "directory";
  contents?: Record<string, FileSystemItem>;
  content?: string | JSX.Element;
  link?: string;
}

const reading = `I enjoy reading mostly fiction books, particularly (high) fantasy and science fiction.
Some of my favourite book series are The Stormlight Archive by Brandon Sanderson, The Red Rising Saga by Pierce Brown, and the Hierarchy series by James Islington.
I'm currently finishing The Strength of the Few by James Islington, why can't Diago catch a break? 
`;
const geography = `I love learning about geography, different countries, the regions within them, and their cultures.
One of the ways I partake in this interest is through GeoGuessr, where I'm currently grinding both duels and trying to learn more niche metas.`;

export const fileSystem: Record<string, FileSystemItem> = {
  "~": {
    type: "directory",
    name: "~",
    contents: {
      projects: {
        type: "directory",
        name: "projects",
        contents: {
          "reckord.md": {
            type: "file",
            name: "reckord.md",
            content: (
              <File
                name="Reckord"
                description="Reckord is a client-side web app for tracking media consumption, inspired by services like GoodReads, iMDb, and AniList. It intends to be a complete solution for tracking all media with a focus on simplicity and user privacy. I've recently started to port the project from React to Svelte."
                imageSrc=""
                fileName="reckord.md"
                fileInfo="React -> Svelte, ReactRouter -> SvelteKit, Typescript, TailwindCSS, Zustand -> X"
                lastEdited="March 28th 2026"
                links={[
                  {
                    src: "https://github.com/ozzly/reckord-svelte",
                    description: "View on GitHub",
                  },
                  {
                    src: "https://reckord.net",
                    description: "Visit Website",
                  },
                ]}
              />
            ),
          },
          "catmarks.md": {
            type: "file",
            name: "catmarks.md",
            content: (
              <File
                name="Catmarks"
                description="A command line bookmark manager built in bash, using a hierarchical file structure to organise bookmarks into categories. Output is piped into Rofi for easy navigation. It automatically downloads thumbnails from supported websites, using the Internet Archive's Wayback Machine as a fallback to bypass restrictions."
                imageSrc=""
                fileName="catmarks.md"
                fileInfo="Bash"
                lastEdited="November 8th 2025"
                links={[
                  {
                    src: "https://github.com/Ozzly/catmarks",
                    description: "View on GitHub",
                  },
                ]}
              />
            ),
          },
          "tmux-about.md": {
            type: "file",
            name: "tmux-about.md",
            content: (
              <File
                name="Portfolio"
                description="My portfolio website, modelled after a tmux session. It includes multiple windows with predefined content to make navigation easier, while still retaining the terminal experience. It includes a basic shell implementation, supporting commands like `ls`, `cd`, and `cat` to navigate the site and view content."
                imageSrc=""
                fileName="tmux-about.md"
                fileInfo="React, Typescript, TailwindCSS, Zustand"
                lastEdited="March 28th 2026"
                links={[
                  {
                    src: "https://github.com/Ozzly/about-me-tmux",
                    description: "View on GitHub",
                  },
                  {
                    src: "https://ozzly.net",
                    description: "Visit Website",
                  },
                ]}
              />
            ),
          },
          "deadstart.md": {
            type: "file",
            name: "deadstart.md",
            content: (
              <File
                name="Deadstart"
                description="A simple & minimalistic start page for your browser, inspired by a terminal experience. It includes custom bang(command) support, bang suggestions, bang autocomplete & validation."
                imageSrc="/deadstart-full-converted.gif"
                fileName="deadstart.md"
                fileInfo="HTML, JavaScript"
                lastEdited="March 24th 2026"
                links={[
                  {
                    src: "https://github.com/Ozzly/deadstart",
                    description: "View on GitHub",
                  },
                  {
                    src: "https://deadstart.ozzly.net",
                    description: "View Live Demo",
                  },
                ]}
              />
            ),
          },

          "eink-watch.md": {
            type: "file",
            name: "eink-watch.md",
            content: (
              <File
                name="DIY eink watch"
                description="I'm attempting to build my own eink watch, currently using an ESP32 development board for controlling the components. This project is still in early days, and I'm currently experimenting on a spare LCD screen whilst waiting for the e-ink screen to arrive."
                imageSrc="/early-screen-demo.gif"
                fileName="eink-watch.md"
                fileInfo="C++"
                lastEdited="March 17th 2026"
                links={[
                  {
                    src: "https://github.com/Ozzly/watch",
                    description: "View on GitHub",
                  },
                ]}
              />
            ),
          },
        },
      },
      interests: {
        type: "directory",
        name: "interests",
        contents: {
          "reading.txt": {
            type: "file",
            name: "reading.txt",
            content: reading,
          },
          "geography.txt": {
            type: "file",
            name: "geography.txt",
            content: geography,
          },
        },
      },
    },
  },
};

export const initCommandHistoryWindow1 = [
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
];

export const initCommandHistoryWindow2 = [
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
        <DirectoryContent contents={listDirectoryContents(["~", "projects"])} />
        <div className="text-ctp-overlay0">
          Try displaying the contents of a file with `
          <span className="text-ctp-subtext1 inline-block">cat [filename]</span>
          `, e.g. `
          <span className="text-ctp-subtext1 inline-block">
            cat reckord.txt
          </span>
          `
        </div>
      </>
    ),
  },
];

export function listDirectoryContents(path: string[]): FileSystemItem[] | null {
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
