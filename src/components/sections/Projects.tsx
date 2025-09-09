import { ExternalLink, Github, Shield, ShoppingBag, Code } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { keyFor, techIcons } from "../ui/techIcons";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "E-commerce Modular",
    description:
      "Aplicación de comercio electrónico con panel de administración, sistema de pagos y gestión de inventario. Enfoque en experiencia de usuario y seguridad.",
    tech: ["React", "Next.js", "TypeScript", "Stripe", "Laravel"],
    category: "Full Stack",
    icon: ShoppingBag,
    status: "En construcción",
    gradient: "from-primary to-primary-dark",
  },
  {
    id: 2,
    title: "Security Audit Platform",
    description:
      "Plataforma de auditoría de seguridad web con generación automática de reportes y recomendaciones de hardening para aplicaciones web.",
    tech: ["PHP", "Laravel", "MySQL", "Security Tools"],
    category: "Pentesting",
    icon: Shield,
    status: "En construcción",
    gradient: "from-accent to-primary",
  },
  {
    id: 3,
    title: "Portfolio Interactivo",
    description:
      "Portfolio personal con animaciones avanzadas, modo oscuro y optimizaciones de rendimiento. Incluye sistema de contacto integrado.",
    tech: ["React", "Tailwind", "Framer Motion", "TypeScript"],
    category: "Frontend",
    icon: Code,
    status: "Finalizado",
    gradient: "from-primary-dark to-accent",
  },
  {
    id: 4,
    title: "API REST Segura",
    description:
      "API REST con autenticación JWT, rate limiting, validación de datos y documentación automática. Preparada para entornos de producción.",
    tech: ["Laravel", "PHP", "JWT", "MySQL", "Swagger"],
    category: "Backend",
    icon: Code,
    status: "En construcción",
    gradient: "from-accent to-primary-dark",
  },
];

export function Projects() {
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
            {projects.map((project, index) => {
              const Icon = project.icon;

              return (
                <div
                  key={project.id}
                  className="group bg-card rounded-xl border border-border/50 overflow-hidden hover:shadow-medium hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Project header with gradient */}
                  <div
                    className={`relative h-48 bg-gradient-to-br ${project.gradient} p-6 flex items-center justify-center`}
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
                      <Icon className="h-12 w-12 text-white" />
                    </div>

                    {/* Status badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur rounded-full border border-white/30">
                      <span className="text-white text-xs font-medium">
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

                    <div className="flex flex-wrap gap-2 cursor-pointer">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded"
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
                        onClick={() => {
                          // Placeholder for navigation to project detail
                          console.log(`Ver caso: ${project.title}`);
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        <a href="https://carlosjose.dev">Ver caso</a>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="focus-ring"
                        onClick={() => {
                          // Placeholder for GitHub link
                          console.log(`GitHub: ${project.title}`);
                        }}
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
