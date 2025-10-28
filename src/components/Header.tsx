import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { ThemeToggle } from "./ThemeToggle";
import { SolicitarCVButton } from "./ui/openGmail";

type NavigationItem = {
  name: string;
  href: string;
  type: "anchor" | "route";
};

const navigation: NavigationItem[] = [
  { name: "Inicio", href: "#inicio", type: "anchor" },
  { name: "Sobre mí", href: "#about", type: "anchor" },
  { name: "Habilidades", href: "#skills", type: "anchor" },
  { name: "Proyectos", href: "#projects", type: "anchor" },
  { name: "Proyectos en mente", href: "/proyectos-en-mente", type: "route" },
  { name: "Experiencia", href: "#experience", type: "anchor" },
  { name: "Contacto", href: "#contact", type: "anchor" },
];

const anchorNavigation = navigation.filter((item) => item.type === "anchor");

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleSectionObserver = () => {
      const sections = anchorNavigation.map((nav) => nav.href.substring(1));
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

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const hash = location.hash.startsWith("#")
        ? location.hash
        : `#${location.hash}`;
      const element = document.querySelector(hash);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  const scrollToSection = (href: string) => {
    if (!href.startsWith("#")) return;
    if (location.pathname !== "/") {
      navigate({ pathname: "/", hash: href });
      setIsMobileMenuOpen(false);
      return;
    }

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
            <Link
              to={{ pathname: "/", hash: "#inicio" }}
              className="font-heading text-xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
              onClick={() => scrollToSection("#inicio")}
            >
              Carlos Del Jesus
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 md:space-x-8">
            {navigation.map((item) =>
              item.type === "anchor" ? (
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
                  aria-current={
                    activeSection === item.href.substring(1)
                      ? "true"
                      : undefined
                  }
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-link text-sm font-medium ${
                    location.pathname === item.href
                      ? "active text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  aria-current={
                    location.pathname === item.href ? "page" : undefined
                  }
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {/* Ver CV en Drive */}

            {/* Solicitar CV por email */}

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
              {navigation.map((item) =>
                item.type === "anchor" ? (
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
                    aria-current={
                      activeSection === item.href.substring(1)
                        ? "true"
                        : undefined
                    }
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                      location.pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-muted"
                    }`}
                    aria-current={
                      location.pathname === item.href ? "page" : undefined
                    }
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
