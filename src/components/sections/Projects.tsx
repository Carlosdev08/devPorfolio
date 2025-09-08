import { ExternalLink, Github, Shield, ShoppingBag, Code } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { keyFor, techIcons } from "../ui/techIcons";
import { useNavigate } from "react-router-dom";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  icon: React.ComponentType<any>;
  status: "En construcción" | "Finalizado";
  gradient: string;
  image: string;
  caseRoute?: string;
  imageAlt?: string;
  link?: string;
  repo: "https://github.com/Carlosdev08/devPorfolio";
};
import portfolioImg from "/images/porfolioCarlos.png";
const projects: Project[] = [
  {
    id: 3,
    title: "Portfolio Interactivo",
    description:
      "Portfolio personal con animaciones, modo oscuro y optimizaciones de rendimiento.",
    tech: ["React", "Tailwind", "Framer Motion", "TypeScript"],
    category: "Frontend",
    icon: Code,
    status: "Finalizado",
    gradient: "from-primary-dark to-accent bg-transparent",
    link: "https://carlosjose.dev",
    repo: "https://github.com/Carlosdev08/devPorfolio",
    image: portfolioImg,
    imageAlt: "Portada del portfolio de Carlos José",
  },
  {
    id: 2,
    title: "Security Audit Platform",
    description:
      "Plataforma de auditoría de seguridad web con generación automática de reportes y recomendaciones de hardening para aplicaciones web.",
    tech: ["PHP", "Laravel", "MySQL", "Security Tools", "TypeScript"],
    category: "Pentesting",
    icon: Shield,
    image: portfolioImg,
    status: "En construcción",
    gradient: "from-accent to-primary",
    caseRoute: "/proyectos/security-audit",
    repo: "https://github.com/Carlosdev08/devPorfolio",
  },

  {
    id: 3,
    title: "Portfolio Interactivo",
    description:
      "Portfolio personal con animaciones avanzadas, modo oscuro y optimizaciones de rendimiento. Incluye sistema de contacto integrado.",
    tech: ["React", "Tailwind", "Framer Motion", "TypeScript"],
    category: "Frontend",
    icon: Code,
    image: portfolioImg,
    status: "Finalizado",
    gradient: "from-primary-dark to-accent bg-transparent",
    link: "https://carlosjose.dev",
    repo: "https://github.com/Carlosdev08/devPorfolio",
    caseRoute: "/proyectos/portfolio", // si tienes página interna
  },
  {
    id: 4,
    title: "API REST Segura",
    description:
      "API REST con autenticación JWT, rate limiting, validación de datos y documentación automática. Preparada para entornos de producción.",
    tech: ["Laravel", "PHP", "JWT", "MySQL", "Swagger", "TypeScript"],
    category: "Backend",
    icon: Code,
    image: portfolioImg,
    status: "En construcción",
    gradient: "from-accent to-primary-dark",
    caseRoute: "/proyectos/api-rest-segura",
    repo: "https://github.com/Carlosdev08/devPorfolio",
  },
];

export function Projects() {
  const navigate = useNavigate();

  const openExternal = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleViewCase = (p: Project) => {
    if (p.caseRoute) {
      navigate(p.caseRoute);
    } else if (p.link) {
      openExternal(p.link);
    }
    // si no hay nada, no hacemos nada (o podrías mostrar un toast)
  };

  const handleGithub = (p: Project) => openExternal(p.repo);

  return (
    <section id="projects" className="py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
              Mis <span className="gradient-text">Proyectos</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Una selección de proyectos que demuestran mi enfoque en desarrollo
              seguro y soluciones escalables
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => {
              const Icon = project.icon;
              const caseEnabled = Boolean(project.caseRoute || project.link);
              const repoEnabled = Boolean(project.repo);

              return (
                <div
                  key={project.id}
                  className="group bg-card rounded-xl border border-border/50 overflow-hidden hover:shadow-medium hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Project header with gradient */}
                  <div
                    className={`relative h-48 bg-gradient-to-br ${project.gradient} p-6 flex items-center justify-center bg-transparent`}
                  >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white/30 rounded" />
                      <div className="absolute top-8 right-8 w-4 h-4 border border-white/30 rounded-full" />
                      <div className="absolute bottom-6 left-8 w-6 h-6 border border-white/30 rounded" />
                      <div className="absolute bottom-4 right-4 w-3 h-3 bg-white/30 rounded-full" />
                    </div>

                    {/* Project icon */}
                    <div className="relative z-10 bg-white/20 backdrop-blur p-4 rounded-2xl">
                      <Icon className="h-12 w-12" />
                    </div>

                    {/* Status badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur rounded-full border border-white/30">
                      <span className="text-blue text-xs font-medium">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Project content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-heading text-xl font-semibold text-card-foreground">
                          {project.title}
                        </h3>
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                          {project.category}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-purple-500 px-2 py-1 rounded"
                        >
                          {techIcons[keyFor(tech)] ?? null}
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 focus-ring"
                        onClick={() => handleViewCase(project)}
                        disabled={!caseEnabled}
                        aria-label={`Ver caso de ${project.title}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                        <a
                          href="http://carlosjose.dev"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver caso
                        </a>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="focus-ring"
                        onClick={() => handleGithub(project)}
                        disabled={!repoEnabled}
                        aria-label={`Abrir GitHub de ${project.title}`}
                        title={
                          repoEnabled
                            ? "Ver código en GitHub"
                            : "Sin repositorio"
                        }
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-primary/5 rounded-2xl border border-primary/20">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  ¿Tienes una idea en mente?
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Cuéntame tu proyecto y trabajemos juntos para hacerlo realidad
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="focus-ring"
                >
                  Hablemos del proyecto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
