export interface FileSystemItem {
  name: string;
  type: "file" | "directory";
  contents?: Record<string, FileSystemItem>;
  content?: string;
  link?: string;
}

const tmux_about = `tmux-about is an interactive terminal portfolio website that mimics the look and feel of a tmux session.
It is built using React and TypeScript, styled using Tailwind CSS and themed after Catppuccin Mocha.
I appreciate the terminal aesthetic, but I understand that navigating a website purely through commands can be unintuitive for some users.
Therefore, I modelled the site after tmux to provide different "windows" that users can switch between using clickable buttons.
These windows include predefined content, making it easier to explore my portfolio at a glance, while still retaining the terminal experience.`;

const catmarks = `Catmarks is a lightweight bookmark manager that uses rofi as its interface.
Bookmarks are organised in a hierarchical file structure, allowing users to create directories to categorise their bookmarks effectively.
Bookmarks are stored in plain text files, making it easy to migrate data without relying on databases.
It will automatically attempt to download thumbnails for supported websites, using the Internet Archive's Wayback Machine as a fallback to bypass restrictions.
It's fully coded in bash, making it highly portable across different systems.`;

const reckord = `Reckord is a client-side web app for tracking media consumption, inspired by services like GoodReads, iMDb, and AniList.
It allows users to maintain a record of books, movies, shows, anime, and manga they have consumed or plan to.
Data is stored locally in the browser, ensuring user privacy and eliminating the need for server-side storage.
It is built using React and TypeScript, styled with Tailwind CSS, and uses Zustand for state management.`;

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
          "reckord.txt": {
            type: "file",
            name: "reckord.txt",
            content: reckord,
            link: "https://github.com/ozzly/reckord",
          },
          "catmarks.txt": {
            type: "file",
            name: "catmarks.txt",
            content: catmarks,
            link: "https://github.com/ozzly/catmarks",
          },
          "tmux-about.txt": {
            type: "file",
            name: "tmux-about.txt",
            content: tmux_about,
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
