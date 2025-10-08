import { SocialLinks } from "@/components/contact/SocialLinks";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "../contact/ContactForm";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
const FORM_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
            <span className="gradient-text">¿Listo para tu próximo proyecto?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Cuéntame tu idea y te ayudo a convertirla en un producto sólido y
            seguro. Completa el formulario con los detalles de tu proyecto y te enviaré un presupuesto personalizado.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Respuesta en 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Presupuesto gratuito</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Sin compromiso</span>
            </div>
          </div>
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

          <ContactForm endpoint={FORM_ENDPOINT} />
        </div>
      </div>
    </section>
  );
}
