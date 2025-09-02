import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/enhanced-button";
import { Send } from "lucide-react";
import { useContactForm } from "@/hooks/use-contact-form";
import { useToast } from "@/hooks/use-toast";

export function ContactForm({ endpoint }: { endpoint: string }) {
  const { toast } = useToast();
  const { data, handleChange, valid, submitting, submit } = useContactForm({
    endpoint,
    onSuccess: () =>
      toast({
        title: "Mensaje enviado",
        description: "Te responderé en menos de 24h.",
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
    submit();
  };

  return (
    <div className="bg-card rounded-xl p-8 border border-border/50 shadow-soft">
      <form onSubmit={onSubmit} className="space-y-6" noValidate>
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

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-card-foreground mb-2"
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
              className="focus-ring"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-card-foreground mb-2"
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
              className="focus-ring"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-card-foreground mb-2"
          >
            Mensaje *
          </label>
          <Textarea
            id="message"
            name="message"
            value={data.message}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Cuéntame sobre tu proyecto, qué necesitas y cuándo lo necesitas..."
            className="focus-ring resize-none"
          />
        </div>

        {/* Consentimiento RGPD */}
        <div className="flex items-start gap-2">
          <input
            id="privacy"
            name="privacyAccepted"
            type="checkbox"
            checked={data.privacyAccepted}
            onChange={handleChange}
            required
            className="mt-1 h-4 w-4 accent-primary focus-ring"
            aria-describedby="privacy-help"
          />
          <label htmlFor="privacy" className="text-sm text-muted-foreground">
            He leído y acepto la{" "}
            <a
              href="/politica-privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Política de Privacidad
            </a>
          </label>
        </div>
        <p id="privacy-help" className="sr-only">
          Debes aceptar la política de privacidad para enviar el formulario.
        </p>

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full focus-ring"
          disabled={!valid || submitting}
        >
          {submitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
              Enviando…
            </div>
          ) : (
            <>
              <Send className="h-5 w-5" /> Enviar mensaje
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Al enviar aceptas que te contacte en relación con tu consulta. No
          comparto tus datos con terceros.
        </p>
      </form>
    </div>
  );
}
