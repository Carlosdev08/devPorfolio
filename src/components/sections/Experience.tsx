import { Building, Users, Code, GraduationCap } from "lucide-react";
import TechTag from "../TechTag";

const experiences = [
  {
    id: 1,
    role: "Máster Profesional en Desarrollo Full Stack & Pentesting Web",
    company: "Master.D",
    period: "2024 - 2026",
    type: "Formación",
    icon: GraduationCap,
    achievements: [
      "Programa profesional de 1250 horas en desarrollo y seguridad web",
      "Módulos principales: HTML/CSS, JavaScript avanzado, SQL, PHP, Frontend, Pentesting",
      "Trabajo final: Auditoría de Seguridad Web aplicada",
    ],
    tech: [
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Tailwind",
      "VMs & Servidores Web",
      "JavaScript",
      "PHP",
      "SQL",
      "Pentesting",
      "Security",
    ],
    current: true,
  },
  {
    id: 2,
    role: "Proyectos Personales en Desarrollo Web",
    company: "Autodidacta",
    period: "2024 - Presente",
    type: "Desarrollo",
    icon: Code,
    achievements: [
      "Desarrollo de aplicaciones web con React, Next.js y Laravel",
      "Prácticas en auditoría de seguridad y pentesting web",
      "Aplicación de buenas prácticas y entornos seguros en proyectos personales",
    ],
    tech: ["React", "Next.js", "Laravel", "PHP", "Security"],
    current: true,
  },
  {
    id: 3,
    role: "Bootcamp Full Stack Development",
    company: "Programa de Reconversión",
    period: "2023 - 2024",
    type: "Formación",
    icon: GraduationCap,
    achievements: [
      "Especialización en desarrollo web moderno y tecnologías actuales",
      "Aprendizaje de metodologías ágiles y mejores prácticas",
      "Desarrollo de proyectos prácticos con enfoque en calidad",
    ],
    tech: [
      "HTML5",
      "CSS3",
      "TypeScript",
      "JavaScript",
      "React",
      "Tailwind",
      "Next",
      "Node.js",
      "Git",
      "Agile",
    ],
    current: false,
  },
  {
    id: 4,
    role: "Team Leader",
    company: "Emergia Contact Center",
    period: "2007 - 2023",
    type: "Gestión",
    icon: Users,
    achievements: [
      "Liderazgo de equipos de hasta 25 personas en proyectos de telecomunicaciones",
      "Gestión de operaciones de contact center y optimización de procesos",
      "Implementación de sistemas de calidad y métricas de rendimiento",
    ],
    tech: ["Asterisk", "Jira CC", "Management", "Quality Systems", "Avaya"],
    current: false,
  },
  {
    id: 5,
    role: "Experiencia Laboral Diversa",
    company: "Múltiples sectores",
    period: "15+ años",
    type: "Profesional",
    icon: Building,
    achievements: [
      "Más de 15 años de experiencia en diferentes industrias y roles",
      "Desarrollo de habilidades de liderazgo, comunicación y resolución de problemas",
      "Adaptabilidad y capacidad de aprendizaje en entornos cambiantes",
    ],
    tech: ["Leadership", "Communication", "Problem Solving"],
    current: false,
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
              Mi <span className="gradient-text">Trayectoria</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un recorrido profesional que combina experiencia en gestión,
              formación técnica y pasión por el desarrollo
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary-dark" />

            {/* Experience items */}
            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const Icon = exp.icon;

                return (
                  <div key={exp.id} className="relative flex gap-6">
                    {/* Timeline marker */}
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-background ${
                          exp.current
                            ? "bg-gradient-primary shadow-primary"
                            : "bg-card shadow-soft"
                        }`}
                      >
                        <Icon
                          className={`h-6 w-6 ${
                            exp.current ? "text-white" : "text-muted-foreground"
                          }`}
                        />
                      </div>

                      {/* Pulse animation for current */}
                      {exp.current && (
                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="bg-card rounded-xl p-6 border border-border/50 hover:shadow-medium transition-all duration-300">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                          <div>
                            <h3 className="font-heading text-xl font-semibold text-card-foreground mb-1">
                              {exp.role}
                            </h3>
                            <p className="text-muted-foreground font-medium">
                              {exp.company}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                exp.type === "Desarrollo"
                                  ? "bg-primary/10 text-primary"
                                  : exp.type === "Formación"
                                  ? "bg-accent/10 text-accent"
                                  : exp.type === "Gestión"
                                  ? "bg-primary-dark/10 text-primary-dark"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {exp.type}
                            </span>

                            <span className="text-sm font-medium text-muted-foreground">
                              {exp.period}
                            </span>

                            {exp.current && (
                              <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded animate-pulse">
                                Actual
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Achievements */}
                        <ul className="space-y-2 mb-4">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li
                              key={achIndex}
                              className="flex items-start gap-3"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground leading-relaxed">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((tech) => (
                            <TechTag key={tech} label={tech} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary/5 backdrop-blur rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                De la gestión de equipos al desarrollo full stack: evolución
                continua
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
