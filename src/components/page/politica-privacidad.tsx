export default function PoliticaPrivacidad() {
  return (
    <div className="container mx-auto py-20 px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Política de Privacidad</h1>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mb-2">
            1. Responsable del tratamiento
          </h2>
          <p>
            <strong>Carlos Del Jesús</strong> <br />
            Email:{" "}
            <a
              href="mailto:contacto@carlosjose.dev"
              className="text-primary hover:underline"
            >
              contacto@carlosjose.dev
            </a>{" "}
            <br />
            Dominio:{" "}
            <a
              href="https://carlosjose.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              carlosjose.dev
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            2. Finalidad del tratamiento
          </h2>
          <p>
            Los datos personales enviados mediante este sitio web se usarán
            únicamente para:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Responder a consultas enviadas a través del formulario.</li>
            <li>Enviar mi currículum si lo solicitas.</li>
            <li>Establecer una comunicación profesional contigo.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Base legal</h2>
          <p>
            La base legal para el tratamiento de tus datos es tu consentimiento,
            otorgado al aceptar esta política antes de enviar cualquier
            formulario.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Datos recopilados</h2>
          <p>Puedo solicitarte:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Nombre completo</li>
            <li>Dirección de correo electrónico</li>
            <li>El mensaje que desees enviarme</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            5. Conservación de datos
          </h2>
          <p>
            Los datos se conservarán solo el tiempo necesario para atender tu
            solicitud. Una vez atendida, serán eliminados salvo obligación legal
            de conservación.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Destinatarios</h2>
          <p>
            No comparto ni vendo tus datos a terceros. El servicio de
            formularios está gestionado mediante{" "}
            <a
              href="https://formspree.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Formspree
            </a>
            , que cumple con las garantías de protección de datos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Derechos</h2>
          <p>Puedes ejercer tus derechos de:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Acceso, rectificación y supresión de datos</li>
            <li>Limitación u oposición a su tratamiento</li>
            <li>Portabilidad de datos</li>
            <li>Retirada del consentimiento</li>
          </ul>
          <p className="mt-2">
            Para ejercerlos, envía un correo a{" "}
            <a
              href="mailto:contacto@carlosjose.dev"
              className="text-primary hover:underline"
            >
              contacto@carlosjose.dev
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Seguridad</h2>
          <p>
            Aplico medidas técnicas y organizativas para proteger tus datos,
            aunque debes tener en cuenta que ninguna transmisión en Internet es
            100% segura.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Menores de edad</h2>
          <p>
            Los formularios no están dirigidos a menores de 14 años. Si eres
            menor, no envíes información personal sin el consentimiento de tus
            tutores.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            10. Cambios en la política
          </h2>
          <p>
            Podré modificar esta Política de Privacidad para adaptarla a
            novedades legales o mejoras del sitio. Los cambios se publicarán en
            esta misma página.
          </p>
        </section>
      </div>
    </div>
  );
}
