interface CommandLineProps {
  path: string[];
}

function CommandLine({ path }: CommandLineProps) {
  return (
    <div className="flex whitespace-nowrap">
      <span className="text-ctp-green">guest</span>@
      <span className="text-ctp-blue">ozzly.net</span>:
      <span className="text-ctp-mauve font-bold">{path.join("/")}</span>
      <span className="font-bold">&gt;</span>
    </div>
  );
}

export default CommandLine;
