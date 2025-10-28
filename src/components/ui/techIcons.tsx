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
  SiSupabase,
  SiVite,
  SiGit,
  SiFlutter,
} from "react-icons/si";
import { GiShield } from "react-icons/gi";
import { IoLogoGithub } from "react-icons/io5";
import { DiMysql } from "react-icons/di";
import { DiJira } from "react-icons/di";
import { TbApiApp } from "react-icons/tb";

export const techIcons: Record<string, JSX.Element> = {
  html5: <FaHtml5 className="h-5 w-5 text-orange-500" />,
  css3: <FaCss3Alt className="h-5 w-5 text-blue-500" />,
  bootstrap: <FaBootstrap className="h-5 w-5 text-purple-600" />,
  tailwind: <SiTailwindcss className="h-5 w-5 text-sky-400" />,
  javascript: <SiJavascript className="h-5 w-5 text-yellow-400" />,
  typescript: <SiTypescript className="h-5 w-5 text-blue-400" />,
  php: <FaPhp className="h-5 w-5 text-indigo-500" />,
  sql: <SiMysql className="h-5 w-5 text-blue-600" />,
  "rest apis": <TbApiApp className="h-5 w-5 text-emerald-400" />,
  react: <FaReact className="h-5 w-5 text-cyan-400" />,
  "next.js": <SiNextdotjs className="h-5 w-5 text-gray-200" />,
  next: <SiNextdotjs className="h-5 w-5 text-gray-200" />, // alias
  laravel: <SiLaravel className="h-5 w-5 text-red-500" />,
  pentesting: <GiShield className="h-5 w-5 text-rose-500" />,
  security: <GiShield className="h-5 w-5 text-green-500" />,
  git: <SiGit className="h-5 w-5 text-orange-500" />,
  github: <IoLogoGithub className="h-5 w-5 text-gray-200" />,
  mysql: <DiMysql className="h-5 w-5 text-blue-500" />,
  jira: <DiJira className="h-5 w-5 text-blue-400" />,
  "node.js": <FaNodeJs className="h-5 w-5 text-green-500" />,
  vite: <SiVite className="h-5 w-5 text-purple-500" />,
  supabase: <SiSupabase className="h-5 w-5 text-emerald-500" />,
  flutter: <SiFlutter className="h-5 w-5 text-blue-400" />,
  "vms & servidores web": <FaNodeJs className="h-5 w-5 text-lime-500" />,
};

// normaliza claves
export const keyFor = (label: string) => label.toLowerCase().trim();
