import { Github, Linkedin, Video } from "lucide-react";

type Item = { name: string; icon: any; url: string; label: string };
const DEFAULT: Item[] = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/carlosdev08",
    label: "Ver repositorios",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/carlosdeljesus",
    label: "Conectar en LinkedIn",
  },
];

export function SocialLinks({ items = DEFAULT }: { items?: Item[] }) {
  return (
    <div className="flex gap-4">
      {items.map(({ name, icon: Icon, url, label }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 p-4 bg-card rounded-lg border border-border/50 hover:shadow-medium hover:scale-105 transition-all duration-300 focus-ring"
          aria-label={label}
        >
          <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">
            {name}
          </span>
        </a>
      ))}
    </div>
  );
}
