import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Video,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/CarlosDev",
    label: "Ver repositorios",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/carlosdev",
    label: "Conectar en LinkedIn",
  },
  {
    name: "TikTok",
    icon: Video,
    url: "https://tiktok.com/@carlosdev",
    label: "Seguir en TikTok",
  },
];

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mensaje enviado",
        description: "Gracias por tu mensaje. Te responderé pronto.",
        duration: 5000,
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const isFormValid =
    formData.name.trim() && formData.email.trim() && formData.message.trim();

  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
              <span className="gradient-text">Contacto</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cuéntame tu idea y te ayudo a convertirla en un producto sólido y
              seguro.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact info */}
            <div className="space-y-8">
              <div>
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
                      <p className="text-muted-foreground">
                        España (Remoto disponible)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <h4 className="font-heading font-semibold mb-4 text-foreground">
                  Sígueme en redes
                </h4>

                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-4 bg-card rounded-lg border border-border/50 hover:shadow-medium hover:scale-105 transition-all duration-300 focus-ring"
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">
                          {social.name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* CTA box */}
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
                      Te responderé personalmente para discutir tu proyecto y
                      cómo puedo ayudarte.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-card rounded-xl p-8 border border-border/50 shadow-soft">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                      required
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
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                      required
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
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Cuéntame sobre tu proyecto, qué necesitas y cuándo lo necesitas..."
                    rows={6}
                    required
                    className="focus-ring resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full focus-ring"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </div>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
