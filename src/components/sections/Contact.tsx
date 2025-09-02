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
            <span className="gradient-text">Contacto</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cuéntame tu idea y te ayudo a convertirla en un producto sólido y
            seguro.
          </p>
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
