import {
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaPhp,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiMysql,
  SiLaravel,
  SiNextdotjs,
} from "react-icons/si";
import { GiShield } from "react-icons/gi";
import { IoLogoGithub } from "react-icons/io5";
import { GrMysql } from "react-icons/gr";

const techIcons: Record<string, JSX.Element> = {
  HTML5: <FaHtml5 className="text-orange-500" />,
  CSS3: <FaCss3Alt className="text-blue-500" />,
  Bootstrap: <FaBootstrap className="text-purple-600" />,
  Tailwind: <SiTailwindcss className="text-sky-400" />,
  JavaScript: <SiJavascript className="text-yellow-400" />,
  TypeScript: <SiTypescript className="text-blue-400" />,
  PHP: <FaPhp className="text-indigo-500" />,
  SQL: <SiMysql className="text-blue-600" />,
  React: <FaReact className="text-cyan-400" />,
  "Next.js": <SiNextdotjs className="text-gray-200" />,
  Laravel: <SiLaravel className="text-red-500 bg bg-transparent" />,
  "Node.js": <FaNodeJs className="text-green-500" />,
  Pentesting: <GiShield className="text-red-600" />,
  Security: <GiShield className="text-green-600" />,
  Git: <IoLogoGithub className="text-green-600" />,
  MySQL: <GrMysql className="text-slate-300" />,
};

type TechTagProps = {
  label: string;
  title?: string;
};

export default function TechTag({ label, title }: TechTagProps) {
  return (
    <button
      type="button"
      title={title ?? label}
      aria-label={label}
      className="
        inline-flex items-center gap-2
        px-3 py-1 text-xs font-medium rounded-lg
        bg-muted text-muted-foreground
        transition duration-200
        cursor-pointer
        hover:bg-primary/20 hover:text-primary
        hover:-translate-y-0.5 hover:shadow-md
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-primary/60
        focus-visible:ring-offset-2 focus-visible:ring-offset-card
        active:scale-95
      "
    >
      {techIcons[label] ?? null}
      <span>{label}</span>
    </button>
  );
}
