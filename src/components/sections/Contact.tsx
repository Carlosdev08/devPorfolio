import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { QuickContactForm } from "@/components/contact/QuickContactForm";
import { Button } from "@/components/ui/enhanced-button";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
const FORM_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;
const PROJECTS_ROUTE = "/proyectos-en-mente";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">¿Hablamos?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Usa el formulario rápido para cualquier consulta general. Si ya
            tienes un proyecto que quieres poner en marcha, visita la página de
            proyectos en mente para compartir los detalles.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Respuesta en 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span>Contacto directo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <span>Sin compromiso</span>
            </div>
          </div>
          <Button
            asChild
            variant="hero"
            size="lg"
            className="inline-flex items-center gap-2"
          >
            <Link to={PROJECTS_ROUTE}>
              <Briefcase className="h-5 w-5" />
              ¿Tienes un proyecto en mente?
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <ContactInfo />
            <div>
              <h4 className="font-heading font-semibold mb-4 text-foreground">
                Sígueme en redes
              </h4>
              <SocialLinks />
            </div>
          </div>

          <QuickContactForm endpoint={FORM_ENDPOINT} />
        </div>
      </div>
    </section>
  );
}
