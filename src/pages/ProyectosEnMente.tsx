import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { SocialLinks } from "@/components/contact/SocialLinks";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
const FORM_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;

export default function ProyectosEnMente() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16 bg-muted/30">
        <section className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              Nueva página
            </span>
            <h1 className="mt-6 font-heading text-3xl lg:text-5xl font-bold text-card-foreground">
              Proyectos en mente
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Completa este formulario para contarme todos los detalles de tu
              proyecto. Con la información correcta puedo prepararte una
              propuesta personalizada, fechas estimadas y la tecnología más
              adecuada.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-card rounded-xl border border-border/60 p-6 shadow-sm">
                <h2 className="font-heading text-2xl font-semibold text-card-foreground mb-2">
                  Cuéntame sobre tu proyecto
                </h2>
                <p className="text-sm text-muted-foreground">
                  Mientras más detalles compartas (alcance, público objetivo,
                  fecha límite, funcionalidades deseadas), mejor podré ayudarte.
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border/60 p-6 shadow-sm space-y-6">
                <h3 className="font-heading font-semibold text-card-foreground">
                  ¿Qué obtienes al enviarlo?
                </h3>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2 text-left">
                  <li>Respuesta personalizada en menos de 24 horas.</li>
                  <li>
                    Propuesta técnica con fases del proyecto y tecnologías
                    sugeridas.
                  </li>
                  <li>Estimación de presupuesto y tiempos orientativos.</li>
                  <li>
                    Opción a sesión de discovery gratuita si el proyecto lo
                    requiere.
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-xl border border-border/60 p-6 shadow-sm space-y-4">
                <h3 className="font-heading font-semibold text-card-foreground">
                  ¿Prefieres hablar primero?
                </h3>
                <p className="text-sm text-muted-foreground">
                  También puedes escribirme un mensaje rápido o encontrarme en
                  redes.
                </p>
                <ContactInfo />
                <SocialLinks />
              </div>
            </div>

            <ContactForm endpoint={FORM_ENDPOINT} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
