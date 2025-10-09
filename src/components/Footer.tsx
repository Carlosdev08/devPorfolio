import { Github, Linkedin, Video, ExternalLink } from "lucide-react";

// Tipos para mayor seguridad
type FooterLink = {
  name: string;
  href: string;
  external?: boolean;
};

type FooterLinks = {
  navegacion: FooterLink[];
  recursosUtiles: FooterLink[];
  contacto: FooterLink[];
};

// Enlaces organizados por categoría
const footerLinks: FooterLinks = {
  navegacion: [
    { name: "Inicio", href: "#inicio" },
    { name: "Sobre mí", href: "#about" },
    { name: "Habilidades", href: "#skills" },
    { name: "Proyectos", href: "#projects" },
  ],
  recursosUtiles: [
    { name: "Documentación", href: "https://react.dev/", external: true },
    { name: "Herramientas", href: "https://vitejs.dev/", external: true },
    { name: "Templates", href: "https://ui.shadcn.com/", external: true },
    { name: "Cheat Sheets", href: "https://devhints.io/", external: true },
    { name: "TDD Guide", href: "https://martinfowler.com/bliki/TestDrivenDevelopment.html", external: true },
    { name: "Testing Tools", href: "https://vitest.dev/", external: true },
  ],
  contacto: [
    { name: "Experiencia", href: "#experience" },
    { name: "Contactar", href: "#contact" },
  ],
};

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/carlosdev08",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/carlosdeljesus",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-muted/50 border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h3 className="font-heading text-2xl font-bold gradient-text mb-2">
                  CarlosDev
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  Desarrollador Full Stack & Pentester Web especializado en
                  crear soluciones modernas y seguras. Si puedes imaginarlo,
                  entonces puedes codearlo!
                </p>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">
                  Sígueme:
                </span>
                <div className="flex gap-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-card rounded-lg border border-border/50 hover:bg-primary hover:text-white hover:shadow-primary transition-all duration-300 focus-ring"
                        aria-label={`Seguir en ${social.name}`}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation links */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">
                Navegación
              </h4>
              <ul className="space-y-2">
                {footerLinks.navegacion.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resource links */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">
                Recursos Útiles
              </h4>
              <ul className="space-y-2">
                {footerLinks.recursosUtiles.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      onClick={!link.external ? (e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      } : undefined}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1"
                    >
                      {link.name}
                      {link.external && <ExternalLink className="h-3 w-3" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact links */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">
                Contacto
              </h4>
              <ul className="space-y-2">
                {footerLinks.contacto.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                © {currentYear} Carlos José. Todos los derechos reservados
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <a
                href="https://github.com/carlosdev08/devPorfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 focus-ring rounded p-1"
              >
                <Github className="h-4 w-4" />
                Ver código
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
