export default function PoliticaPrivacidad() {
  return (
    <div className="container mx-auto py-20 px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      <p className="mb-4">
        De acuerdo con el Reglamento General de Protección de Datos (RGPD), te
        informo que los datos personales enviados a través de este formulario se
        utilizarán únicamente para responder a tu solicitud y no serán
        compartidos con terceros.
      </p>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación y supresión
        contactando en{" "}
        <a
          href="mailto:contacto@carlosjose.dev"
          className="text-primary hover:underline"
        >
          contacto@carlosjose.dev
        </a>
        .
      </p>
    </div>
  );
}
