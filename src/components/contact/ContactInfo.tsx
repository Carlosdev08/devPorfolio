import { Mail, MapPin, CheckCircle } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <h3 className="font-heading text-xl font-semibold mb-6 text-foreground">
        ¿Tienes un proyecto en mente?
      </h3>

      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Email</p>
            <a
              href="mailto:contacto@carlosjose.dev"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              contacto@carlosjose.dev
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2 bg-accent/10 rounded-lg">
            <MapPin className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="font-medium text-foreground">Ubicación</p>
            <p className="text-muted-foreground">España (Remoto disponible)</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-primary/5 rounded-xl border border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              Respuesta garantizada en 24h
            </h4>
            <p className="text-sm text-muted-foreground">
              Te responderé personalmente para discutir tu proyecto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
