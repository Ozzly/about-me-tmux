import { HiOutlineExternalLink } from "react-icons/hi";

type Links = {
  src: string;
  description: string;
};

interface FileProps {
  name: string;
  description: string;
  imageSrc: string;
  fileName: string;
  fileInfo: string;
  links: Links[];
}

function File({
  name,
  description,
  imageSrc,
  fileName,
  fileInfo,
  links,
}: FileProps) {
  return (
    <div className="my-2 border-b border-ctp-overlay1">
      {/* Filename */}
      <div className="grid grid-cols-[40px_1fr] border-y border-ctp-overlay1">
        <div className="border-r border-ctp-overlay0 p-2"></div>
        <div className="p-2 text-ctp-blue">
          File: <span className="font-bold">{fileName}</span>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-[40px_1fr]">
        <div className="border-r border-ctp-overlay1 text-ctp-overlay0 text-right pr-2 pt-2">
          1
        </div>
        <h1 className="font-bold m-2">
          <span className="text-ctp-green">#</span> {name}
        </h1>

        <div className="border-r border-ctp-overlay1 text-ctp-overlay0 text-right pr-2">
          2
        </div>
        <p className="max-w-200 px-2">{description}</p>

        <div className="border-r border-ctp-overlay1 text-ctp-overlay0 text-right pr-2">
          3
        </div>
        <div></div>

        <div className="border-r border-ctp-overlay1 text-ctp-overlay0 text-right pr-2">
          4
        </div>
        <img
          src={imageSrc}
          className="max-w-200 h-fit border-2 border-ctp-mauve p-1 m-2 rounded-xl"
        />

        <div className="border-r border-ctp-overlay1 text-ctp-overlay0 text-right pr-2">
          5
        </div>
        <div></div>

        <div className="border-r border-ctp-overlay1 text-ctp-overlay0 text-right pr-2">
          6
        </div>
        <div className="flex gap-2">
          {links.map((link, index) => (
            <Link href={link.src} key={index}>
              {link.description}
            </Link>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[40px_1fr] border-y border-ctp-overlay1">
        <div className="border-r border-ctp-overlay0 p-2"></div>
        <div className="p-2 text-ctp-blue">Built with: {fileInfo}</div>
      </div>
    </div>
  );
}

export default File;

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-2 mb-2 underline text-ctp-rosewater hover:text-ctp-flamingo transition-colors duration-200 inline-flex items-center gap-1 w-fit"
    >
      {children}
      <HiOutlineExternalLink />
    </a>
  );
}
