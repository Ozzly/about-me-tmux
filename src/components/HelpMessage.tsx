const commands = [
  { name: "help", description: "Show this help message" },
  { name: "about", description: "Show information about me" },
  { name: "mefetch", description: "Show information about me" },
  { name: "clear", description: "Clear the terminal" },
  { name: "ls", description: "List directory contents" },
  { name: "pwd", description: "Print working directory" },
  { name: "cd [dir]", description: "Change directory to [dir]" },
  { name: "cat [file]", description: "Display contents of [file]" },
];

function HelpMessage() {
  return (
    <div className="text-ctp-subtext1">
      <h2 className="text-ctp-mauve font-bold my-1">Available Commands:</h2>
      <ul className="list-disc list-inside">
        {commands.map((cmd) => (
          <li key={cmd.name}>
            <span className="text-ctp-blue font-bold">{cmd.name}</span>:{" "}
            {cmd.description}
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
}

export default HelpMessage;
