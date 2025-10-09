import { Monitor, Server, Database, Shield, Lock } from "lucide-react";
import { keyFor, techIcons } from "../ui/techIcons";

// Evita clases dinámicas en Tailwind
const colorVariants = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  accent: { bg: "bg-accent/10", text: "text-accent" },
  "primary-dark": { bg: "bg-primary-dark/10", text: "text-primary-dark" },
} as const;

type Skill = { name: string; level: number };
type Category = {
  title: string;
  icon: any;
  skills: Skill[];
  color: keyof typeof colorVariants;
  badge?: string; // opcional (p.ej. "en formación")
};

const skillCategories: Category[] = [
  {
    title: "Frontend",
    icon: Monitor,
    color: "primary",
    skills: [
      { name: "React", level: 70 },
      { name: "Next.js", level: 75 },
      { name: "TypeScript", level: 70 },
      { name: "JavaScript", level: 70 },
      { name: "Tailwind", level: 75 },
      { name: "Bootstrap", level: 75 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "accent",
    skills: [
      { name: "PHP", level: 75 },
      { name: "Laravel", level: 75 },
      { name: "Node.js", level: 60 },
      { name: "REST APIs", level: 75 },
    ],
  },
  {
    title: "Bases de datos",
    icon: Database,
    color: "primary-dark",
    skills: [
      { name: "MySQL", level: 75 },
      { name: "SQL", level: 70 },
      { name: "Supabase", level: 70 },
    ],
  },
  {
    title: "DevOps",
    icon: Shield,
    color: "accent",
    skills: [
      { name: "Git", level: 80 },
      { name: "Vite", level: 75 },
    ],
  },
  {
    title: "Seguridad (en formación)",
    icon: Lock,
    color: "primary",
    badge: "en progreso",
    skills: [
      { name: "Validación/Sanitización", level: 70 },
      { name: "Hash de contraseñas", level: 70 },
      { name: "Control de acceso básico", level: 60 },
      { name: "OWASP Top 10 (intro)", level: 40 },
      { name: "Pentesting Web (intro)", level: 35 },
    ],
  },
];

// Etiqueta textual según nivel (opcional, ayuda a interpretar la barra)
const levelLabel = (n: number) =>
  n >= 85 ? "Avanzado" : n >= 70 ? "Intermedio" : n >= 50 ? "Básico" : "Intro";

export function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Mis <span className="gradient-text">Habilidades</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Tecnologías y herramientas que uso para crear soluciones web
              robustas, manteniendo un aprendizaje activo en seguridad
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              const colors = colorVariants[category.color];

              return (
                <div
                  key={category.title}
                  className="relative group bg-card rounded-xl p-4 sm:p-6 border border-border/50 hover:shadow-medium hover:scale-105 transition-all duration-300"
                >
                  {/* Category header */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className={`p-1.5 sm:p-2 rounded-lg ${colors.bg}`}>
                      <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${colors.text}`} />
                    </div>
                    <h3 className="font-heading font-semibold text-sm sm:text-base text-card-foreground">
                      {category.title}
                    </h3>
                    {category.badge && (
                      <span className="ml-auto px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] rounded-full bg-accent/15 text-accent">
                        {category.badge}
                      </span>
                    )}
                  </div>

                  {/* Skills list */}
                  <div className="space-y-2 sm:space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={`${category.title}-${skill.name}`}
                        className="space-y-1 sm:space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                              {techIcons[keyFor(skill.name)] ?? null}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-card-foreground">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">
                            <span className="hidden sm:inline">{levelLabel(skill.level)} · </span>{skill.level}%
                          </span>
                        </div>

                        {/* Progress bar */}
                        <div className="w-full bg-muted rounded-full h-1 sm:h-1.5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-primary transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              animationDelay: `${
                                categoryIndex * 200 + skillIndex * 100
                              }ms`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hover effect decoration */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Additional info */}
          <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-card/80 backdrop-blur rounded-full border border-border/50 mx-2">
              <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-accent flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-card-foreground">
                <span className="hidden sm:inline">Formación activa en seguridad: aplicando OWASP Top 10 básico, hash y control de acceso</span>
                <span className="sm:hidden">Formación activa en seguridad web</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
