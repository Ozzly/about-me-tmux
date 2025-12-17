import type { FileSystemItem } from "../assets/fileSystem";
import { FaRegFolder } from "react-icons/fa6";
import { FaRegFile } from "react-icons/fa6";

function DirectoryContent({ contents }: { contents: FileSystemItem[] | null }) {
  console.log("Rendering directory contents:", contents);
  return (
    <ul>
      {contents?.map((item) => {
        return (
          <li
            key={item.name}
            className={`ml-4 flex gap-2 text-center items-center ${
              item.type === "directory" ? " font-bold" : "text-ctp-subtext0"
            } ${item.link ? "cursor-pointer underline" : ""}`}
            onClick={() => {
              if (item.link) {
                window.open(item.link, "_blank");
              }
            }}
          >
            {item.type === "directory" ? <FaRegFolder /> : <FaRegFile />}
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

export default DirectoryContent;
