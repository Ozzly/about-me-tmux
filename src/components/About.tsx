import type { JSX } from "react";
import { ozO, ozZ } from "../assets/asciiart";

function About() {
  return (
    <div className="flex gap-x-20 justify-center md:flex-row flex-col items-center ">
      <div className="relative whitespace-pre tracking-tighter leading-[1.1]">
        <span className="">{ozO}</span>
        <span className="text-ctp-mauve absolute top-0 left-[13ch]">{ozZ}</span>
      </div>
      <div className="text-center md:text-start">
        --- About ---
        <AboutItem title="Name" content="Oscar Denntt" />
        <AboutItem
          title="GitHub"
          content="Ozzly"
          link="https://github.com/ozzly"
        />
        <AboutItem title="CV" content="Available upon request" />
        <br />
        --- Contact ---
        <AboutItem
          title="Email"
          content="oscar@ozzly.net"
          link="mailto:oscar@ozzly.net"
        />
        <AboutItem
          title="LinkedIn"
          content="Oscar Dennett"
          link="https://uk.linkedin.com/in/oscar-dennett-27379b385"
        />
        <br />
        --- Education ---
        <AboutItem
          title="Degree"
          content={
            <div className="flex flex-col">
              <span>First Class Bsc Computer Science,</span>
              <span>Loughborough University</span>
            </div>
          }
        />
        <AboutItem
          title="A-Levels"
          content={
            <div className="flex flex-col">
              <span title="Maths, Further Maths, Physics, Chemistry">
                A*, A*, A, A
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default About;

function AboutItem({
  title,
  content,
  link,
}: {
  title: string;
  content: JSX.Element | string;
  link?: string;
}) {
  return (
    <div>
      <span className="font-bold text-ctp-mauve">{title}</span>
      <span className="font-bold">:</span>
      {link ? (
        <a href={link} className="ml-2 underline" target="_blank">
          {content}
        </a>
      ) : (
        <span className="ml-2 inline-block">{content}</span>
      )}
    </div>
  );
}
