import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/enhanced-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Briefcase, DollarSign, Clock, FileText, X } from "lucide-react";
import { useContactForm } from "@/hooks/use-contact-form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Configuración de opciones del formulario
const SERVICE_TYPES = [
  { value: "landing-page", label: "Landing Page" },
  { value: "web-app", label: "Aplicación Web" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "portfolio", label: "Portfolio/CV" },
  { value: "blog", label: "Blog/CMS" },
  { value: "dashboard", label: "Dashboard/Admin" },
  { value: "consultoria", label: "Consultoría" },
  { value: "maintenance", label: "Mantenimiento" },
  { value: "other", label: "Otro" },
];

const BUDGET_RANGES = [
  { value: "500-1500", label: "€500 - €1,500" },
  { value: "1500-3000", label: "€1,500 - €3,000" },
  { value: "3000-5000", label: "€3,000 - €5,000" },
  { value: "5000-10000", label: "€5,000 - €10,000" },
  { value: "10000+", label: "€10,000+" },
  { value: "discuss", label: "A discutir" },
];

const TIMELINE_OPTIONS = [
  { value: "urgent", label: "Urgente (1-2 semanas)" },
  { value: "1month", label: "1 mes" },
  { value: "2-3months", label: "2-3 meses" },
  { value: "3-6months", label: "3-6 meses" },
  { value: "6months+", label: "Más de 6 meses" },
  { value: "flexible", label: "Flexible" },
];

const TECH_OPTIONS = [
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Python",
  "TypeScript",
  "Next.js",
  "WordPress",
  "Shopify",
  "Firebase",
  "PostgreSQL",
  "MongoDB",
];

export function ContactForm({ endpoint }: { endpoint: string }) {
  const { toast } = useToast();
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [otherTech, setOtherTech] = useState("");
  
  const { data, handleChange, valid, submitting, submit, setTechnologies } = useContactForm({
    endpoint,
    onSuccess: () =>
      toast({
        title: "¡Proyecto recibido!",
        description: "Te contactaré en las próximas 24h para discutir los detalles.",
        duration: 5000,
      }),
    onError: (r) =>
      toast({
        title: "No se pudo enviar",
        description: r ?? "Inténtalo de nuevo.",
        duration: 6000,
      }),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTechs = [...selectedTechs, otherTech].filter(Boolean);
    setTechnologies(allTechs);
    submit();
  };
  
  const toggleTech = (tech: string) => {
    setSelectedTechs(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const handleSelectChange = (name: string) => (value: string) => {
    const event = {
      target: {
        name,
        value,
        type: "select",
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    handleChange(event as any);
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="mb-6">
        <h3 className="font-heading text-lg font-semibold mb-2 text-foreground">
          Cuéntame sobre tu proyecto
        </h3>
        <p className="text-sm text-muted-foreground">
          Rellena este formulario y te daré un presupuesto personalizado.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        {/* Honeypot */}
        <input
          type="text"
          name="botField"
          value={data.botField}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          placeholder="nu"
        />

        {/* Datos básicos */}
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Nombre *
              </label>
              <Input
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Empresa (opcional)
              </label>
              <Input
                id="company"
                name="company"
                value={data.company}
                onChange={handleChange}
                autoComplete="organization"
                placeholder="Tu empresa"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Teléfono (opcional)
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={data.phone}
                onChange={handleChange}
                autoComplete="tel"
                placeholder="+34 123 456 789"
              />
            </div>
          </div>
        </div>

        {/* Detalles del proyecto */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="serviceType"
              className="block text-sm font-medium text-foreground mb-2"
            >
              ¿Qué necesitas? *
            </label>
            <Select value={data.serviceType} onValueChange={handleSelectChange("serviceType")}>
              <SelectTrigger className="bg-background border-input">
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-lg">
                {SERVICE_TYPES.map((service) => (
                  <SelectItem key={service.value} value={service.value} className="hover:bg-muted">
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="budget"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Presupuesto *
              </label>
              <Select value={data.budget} onValueChange={handleSelectChange("budget")}>
                <SelectTrigger className="bg-background border-input">
                  <SelectValue placeholder="Tu presupuesto" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg">
                  {BUDGET_RANGES.map((budget) => (
                    <SelectItem key={budget.value} value={budget.value} className="hover:bg-muted">
                      {budget.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="timeline"
                className="block text-sm font-medium text-foreground mb-2"
              >
                ¿Cuándo? *
              </label>
              <Select value={data.timeline} onValueChange={handleSelectChange("timeline")}>
                <SelectTrigger className="bg-background border-input">
                  <SelectValue placeholder="Timeline" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg">
                  {TIMELINE_OPTIONS.map((timeline) => (
                    <SelectItem key={timeline.value} value={timeline.value} className="hover:bg-muted">
                      {timeline.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label
              htmlFor="projectDescription"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Descripción del proyecto *
            </label>
            <Textarea
              id="projectDescription"
              name="projectDescription"
              value={data.projectDescription}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Explica qué necesitas, funcionalidades, diseño, referencias..."
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {data.projectDescription.length >= 20 ? '✓' : `Mínimo 20 caracteres (${data.projectDescription.length}/20)`}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tecnologías preferidas (opcional)
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {TECH_OPTIONS.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => toggleTech(tech)}
                  className={
                    selectedTechs.includes(tech)
                      ? "px-3 py-1.5 text-sm rounded-full border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      : "px-3 py-1.5 text-sm rounded-full border-2 border-border bg-background text-foreground hover:border-primary/50 transition-colors"
                  }
                >
                  {tech}
                </button>
              ))}
            </div>
            <Input
              placeholder="Otras tecnologías (separadas por coma)"
              value={otherTech}
              onChange={(e) => setOtherTech(e.target.value)}
              className="mt-2"
            />
            {selectedTechs.length > 0 && (
              <div className="mt-2 text-xs text-muted-foreground">
                Seleccionadas: {selectedTechs.join(", ")}
              </div>
            )}
          </div>
        </div>

        {/* Consentimiento */}
        <div className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg border border-border/50">
          <input
            id="privacy"
            name="privacyAccepted"
            type="checkbox"
            checked={data.privacyAccepted}
            onChange={handleChange}
            required
            className="mt-0.5 h-4 w-4 accent-primary"
          />
          <label htmlFor="privacy" className="text-sm text-foreground">
            Acepto la{" "}
            <a
              href="/politica-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Política de Privacidad
            </a>{" "}
            y autorizo el contacto para este proyecto.
          </label>
        </div>

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={!valid || submitting}
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" /> Enviar proyecto
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          ✅ Te responderé en menos de 24h con un presupuesto detallado
        </p>
      </form>
    </div>
  );
}
