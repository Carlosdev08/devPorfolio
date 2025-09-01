// techIcons.ts
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
import { DiMysql } from "react-icons/di";
import { DiJira } from "react-icons/di";

export const techIcons: Record<string, JSX.Element> = {
  html5: <FaHtml5 className="w-4 h-4" />,
  css3: <FaCss3Alt className="w-4 h-4" />,
  bootstrap: <FaBootstrap className="w-4 h-4" />,
  tailwind: <SiTailwindcss className="w-4 h-4" />,
  javascript: <SiJavascript className="w-4 h-4" />,
  typescript: <SiTypescript className="w-4 h-4" />,
  php: <FaPhp className="w-4 h-4" />,
  sql: <SiMysql className="w-4 h-4" />,
  react: <FaReact className="w-4 h-4" />,
  "next.js": <SiNextdotjs className="w-4 h-4" />,
  next: <SiNextdotjs className="w-4 h-4" />, // alias
  laravel: <SiLaravel className="w-4 h-4" />,
  pentesting: <GiShield className="w-4 h-4" />,
  security: <GiShield className="w-4 h-4" />,
  Git: <IoLogoGithub className="w-4 h-4" />,
  MYSQL: <DiMysql />,
  Jira: <DiJira />,
  "vms & servidores web": <FaNodeJs className="w-4 h-4" />, // placeholder si no tienes icono
};

// normaliza claves
export const keyFor = (label: string) => label.toLowerCase().trim();
