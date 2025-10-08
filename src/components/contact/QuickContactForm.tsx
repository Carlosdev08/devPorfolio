import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/enhanced-button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuickContactForm } from "@/hooks/use-quick-contact-form";

interface QuickContactFormProps {
  endpoint: string;
}

export function QuickContactForm({ endpoint }: QuickContactFormProps) {
  const { toast } = useToast();
  const { data, handleChange, valid, submitting, submit } = useQuickContactForm(
    {
      endpoint,
      onSuccess: () =>
        toast({
          title: "¡Mensaje enviado!",
          description: "Te responderé en menos de 24 horas.",
          duration: 5000,
        }),
      onError: (reason) =>
        toast({
          title: "No se pudo enviar",
          description: reason ?? "Inténtalo de nuevo en unos minutos.",
          variant: "destructive",
          duration: 6000,
        }),
    },
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit();
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
      <div className="mb-6 space-y-2">
        <h3 className="font-heading text-lg font-semibold text-foreground">
          Envíame un mensaje rápido
        </h3>
        <p className="text-sm text-muted-foreground">
          ¿Una duda, una idea o quieres saludar? Completa este formulario y me
          pondré en contacto contigo.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="botField"
          value={data.botField}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="space-y-4">
          <div>
            <label
              htmlFor="quick-name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Tu nombre *
            </label>
            <Input
              id="quick-name"
              name="name"
              autoComplete="name"
              placeholder="¿Cómo te llamas?"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="quick-email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Tu correo *
            </label>
            <Input
              id="quick-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="quick-message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Tu mensaje *
            </label>
            <Textarea
              id="quick-message"
              name="message"
              rows={4}
              placeholder="Cuéntame brevemente en qué puedo ayudarte."
              value={data.message}
              onChange={handleChange}
              className="resize-none"
              required
            />
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm text-muted-foreground bg-muted/20 border border-border/50 rounded-lg p-4">
          <input
            id="quick-privacy"
            name="privacyAccepted"
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-primary"
            checked={data.privacyAccepted}
            onChange={handleChange}
            required
          />
          <label htmlFor="quick-privacy" className="leading-relaxed">
            Acepto la{" "}
            <a
              href="/politica-privacidad"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Política de Privacidad
            </a>{" "}
            y autorizo el contacto.
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
              <Send className="h-5 w-5 mr-2" /> Enviar mensaje
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
