import { useState, useEffect } from "react";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { ThemeToggle } from "./ThemeToggle";
import { SolicitarCVButton } from "./ui/openGmail";

const navigation = [
  { name: "Inicio", href: "#inicio" },
  { name: "Sobre mí", href: "#about" },
  { name: "Habilidades", href: "#skills" },
  { name: "Proyectos", href: "#projects" },
  { name: "Experiencia", href: "#experience" },
  { name: "Contacto", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleSectionObserver = () => {
      const sections = navigation.map((nav) => nav.href.substring(1));
      let currentSection = "inicio";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleSectionObserver);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionObserver);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-medium" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#inicio"
              className="font-heading text-xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#inicio");
              }}
            >
              Carlos Del Jesus
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`nav-link text-sm font-medium ${
                  activeSection === item.href.substring(1)
                    ? "active text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Ver CV en Drive */}
            <Button
              variant="outline"
              size="sm"
              className="focus-ring"
              onClick={() =>
                window.open("https://drive.google.com/tu-link-aqui", "_blank")
              }
            >
              <Download className="h-4 w-4" />
              Ver CV
            </Button>

            {/* Solicitar CV por email */}
            <Button
              variant="outline"
              size="sm"
              className="focus-ring"
              onClick={() =>
                (window.location.href =
                  "mailto:contacto@carlosjose.dev?subject=Solicitud%20CV&body=Hola%20Carlos,%20me%20gustaría%20recibir%20tu%20currículum%20completo.")
              }
            >
              Solicitar CV
            </Button>
            <SolicitarCVButton />
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/20 glass">
            <div className="space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-4 pt-2">
                <Button
                  variant="outline"
                  className="w-full focus-ring"
                  onClick={() => {
                    window.open("/cv-carlos-jose.pdf", "_blank");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Download className="h-4 w-4" />
                  Descargar CV
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
