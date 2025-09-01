import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";

export function About() {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Avatar + efectos */}
            <div className="relative">
              <div className="relative mx-auto lg:mx-0 w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                {/* halo/gradiente detrás */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-gradient-primary opacity-30 blur-2xl"
                />
                {/* anillo sutil */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full ring-1 ring-white/10 dark:ring-white/15"
                />
                {/* imagen */}
                <img
                  src="images/porgolio.png" // coloca tu archivo en /public/images/
                  alt="Retrato profesional de Carlos José"
                  className="rounded-full object-cover shadow-xl shadow-black/20 w-full h-full"
                />

                {/* badges flotantes */}
                <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs sm:text-sm font-medium shadow-accent">
                  🔐 Pentesting (en formación)
                </div>
                <div
                  className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-medium shadow-primary"
                  style={{ animationDelay: "0.35s" }}
                >
                  💻 Full Stack
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                  Sobre <span className="gradient-text">mí</span>
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Soy Carlos José, desarrollador full stack con enfoque en
                  React, Next.js, Laravel y PHP. Actualmente estoy{" "}
                  <strong className="text-foreground">
                    formándome en seguridad web y pentesting
                  </strong>{" "}
                  (máster 2024–2026) e incorporo prácticas básicas de seguridad
                  en mis proyectos. Tras más de 15 años de experiencia laboral,
                  me reinventé en el desarrollo para unir creatividad y lógica
                  en productos sólidos.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">
                        Experiencia híbrida:
                      </strong>{" "}
                      desarrollo web moderno con base en ciberseguridad en
                      progreso (estudios y práctica guiada).
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">
                        Seguridad en progreso:
                      </strong>{" "}
                      aplico validación/sanitización de entradas, hash de
                      contraseñas y control de acceso sencillo; ampliando
                      conocimientos con OWASP Top 10.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-dark rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">
                        Evolución continua:
                      </strong>{" "}
                      aprendizaje activo de tecnologías y metodologías para
                      entregar soluciones cuidadas y mantenibles.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => window.open("/cv-carlos-jose.pdf", "_blank")}
                className="focus-ring hover:shadow-primary"
              >
                <ExternalLink className="h-4 w-4" />
                Ver CV completo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
