import { ChevronDown, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";

export function Hero() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Primary blob */}
        <div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-primary opacity-20 blob"
          style={{ filter: "blur(40px)" }}
        />
        {/* Secondary blob */}
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-accent opacity-15 blob blob-delay"
          style={{ filter: "blur(50px)" }}
        />
        {/* Accent blob */}
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent opacity-10 blob"
          style={{ filter: "blur(30px)", animationDelay: "-5s" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text">Full Stack Developer</span>
            <br />
            <span className="text-foreground">& Pentester Web</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up">
            Construyo soluciones web modernas y seguras: desarrollo + seguridad
            en un mismo perfil.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-scale-in">
            <Button
              variant="hero"
              size="xl"
              onClick={scrollToContact}
              className="focus-ring"
            >
              <Mail className="h-5 w-5" />
              Contactar
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => window.open("/cv-carlos-jose.pdf", "_blank")}
              className="focus-ring"
            >
              <Download className="h-5 w-5" />
              Descargar CV
            </Button>
          </div>

          {/* Credibility badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm animate-fade-in">
            <div className="flex items-center gap-2 px-4 py-2 bg-card/80 rounded-full border border-border/50 backdrop-blur">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-card-foreground font-medium">
                +15 años de experiencia profesional
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/80 rounded-full border border-border/50 backdrop-blur">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-card-foreground font-medium">
                React · Next.js · Laravel · PHP
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/80 rounded-full border border-border/50 backdrop-blur">
              <div className="w-2 h-2 bg-primary-dark rounded-full animate-pulse" />
              <span className="text-card-foreground font-medium">
                Pentesting Web
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={scrollToAbout}
            className="p-2 rounded-full bg-card/50 backdrop-blur border border-border/50 hover:bg-card/80 transition-all duration-300 focus-ring"
            aria-label="Desplazar hacia abajo"
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
}
