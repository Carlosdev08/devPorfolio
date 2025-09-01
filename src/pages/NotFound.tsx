import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/enhanced-button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="text-8xl font-heading font-bold gradient-text animate-pulse">
            404
          </div>
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl animate-pulse" />
        </div>

        <h1 className="text-2xl font-heading font-bold mb-4 text-foreground">
          Página no encontrada
        </h1>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          La página que buscas no existe o ha sido movida. Volvamos al inicio y 
          encontremos lo que necesitas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="hero"
            onClick={() => window.location.href = "/"}
            className="focus-ring"
          >
            <Home className="h-4 w-4" />
            Volver al inicio
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="focus-ring"
          >
            <ArrowLeft className="h-4 w-4" />
            Página anterior
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
